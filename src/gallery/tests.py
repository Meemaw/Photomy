from identifier.models import ImageIdentityMatch, IdentityGroup
from identifier.serializers import IdentityGroupSerializer
from photomy.test_base import *
from .models import Image
from .views import _reject_identity_match, save_image

IMAGE_VIEW = reverse('images')
PEOPLE_VIEW = reverse('people')
FAVORITES_VIEW = reverse('favorites')
UPLOAD_FILE_VIEW = reverse('upload_file')
UPLOAD_URL_VIEW = reverse('upload_url')
OBAMA_IMAGE = f'{TEST_IMAGES_PATH}/obama.jpg'

TEST_IMAGES = [
    {"width": 200, "height": 500},
    {"width": 200, "height": 200, "favorite": True},
    {"width": 1000, "height": 1500, "face_encodings": [[1.0, 2.0]]},
    {"width": 1000, "height": 1500, "face_encodings": [[1.3, 2.0]]},
    {"width": 1000, "height": 1500, "face_encodings": [
        [1.3, 2.0]], "favorite": True},
    {"width": 1000, "height": 1500, "face_encodings": [[1.3, 2.0], [5.0, 5]]},
    {"width": 1000, "height": 1500, "face_encodings": [[1.2, 2.0]]}
]

TEST_IDENTITIES = [
    {"name": "Identity 1"},
    {"name": "Identity 2"},
    {"name": "Identity 3"},
    {"name": "Identity 4"},
    {"name": "Identity 5"},
    {"name": "Identity 6"}
]


class SaveImageTest(TestCase):

    def setUp(self):
        self.test_users = [User.objects.create(
            id=uuid.uuid4(), username=user.get('username'), email=user.get('email')) for user in TEST_USERS]

    def test_save_image(self):
        image = PIL.Image.open(OBAMA_IMAGE)
        save_image(image, self.test_users[0])

        credentials = auth_headers(self.test_users[0])
        response = client.get(
            IMAGE_VIEW,
            **credentials
        )
        self.assertTrue(len(results(response)), 1)

    def test_upload_image_file_is_protected(self):
        self.assertTrue(is_protected(UPLOAD_FILE_VIEW))

    def test_upload_image_url_is_protected(self):
        self.assertTrue(is_protected(UPLOAD_URL_VIEW))

    def test_upload_image_url(self):
        credentials = auth_headers(self.test_users[0])
        self.assertEqual(Image.objects.count(), 0)

        response = client.post(
            UPLOAD_URL_VIEW,
            data={'image_url': 'https://cdn.cnn.com/cnnnext/dam/assets/170622210800-barack-obama-file-full-169.jpg'},
            **credentials
        )

        result = response.data
        self.assertEqual(result.get('width'), 1600)
        self.assertEqual(result.get('height'), 900)
        self.assertEqual(result.get(
            'image_url'), f'{str(result.get("image_id"))}_{str(self.test_users[0].id)}.JPEG')

        self.assertEqual(Image.objects.count(), 1)

        response = client.post(
            UPLOAD_URL_VIEW,
            data={
                'image_url': 'https://assets.vogue.com/photos/59726f1974b72106b2ef2a5d/master/pass/00-lede-prince-george-4th-birthday-portrait.jpg'},
            **auth_headers(self.test_users[1])
        )

        result = response.data
        self.assertEqual(result.get('width'), 1394)
        self.assertEqual(result.get('height'), 2000)
        self.assertEqual(result.get(
            'image_url'), f'{str(result.get("image_id"))}_{str(self.test_users[1].id)}.JPEG')

        self.assertEqual(Image.objects.count(), 2)

    def test_upload_url_not_image(self):
        credentials = auth_headers(self.test_users[0])
        response = client.post(
            UPLOAD_URL_VIEW,
            data={'image_url': 'http://www.google.si/'},
            **credentials
        )
        self.assertEqual(response.status_code, 400)

        response = client.post(
            UPLOAD_URL_VIEW,
            data={'image_url': 'not_a_url'},
            **credentials
        )
        self.assertEqual(response.status_code, 400)

        response = client.post(
            UPLOAD_URL_VIEW,
            data={},
            **credentials
        )
        self.assertEqual(response.status_code, 400)


class IdentityMatchTest(TestCase):

    def setUp(self):
        self.test_users = [User.objects.create(
            id=uuid.uuid4(), username=user.get('username'), email=user.get('email')) for user in TEST_USERS]

        self.test_images = [Image.objects.create(user=user, width=image.get(
            'width'), height=image.get('height'), face_encodings=image.get('face_encodings')) for image in TEST_IMAGES
                            for user in self.test_users]

        self.identities = [IdentityGroup.objects.create(identity=identity.get(
            'name'), user=self.test_users[0]) for identity in TEST_IDENTITIES]

        self.match_merged1 = ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[1], image_id=self.test_images[0], face_index=0,
            confirmed=False)

        self.match_merged2 = ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[1], image_id=self.test_images[0], face_index=0,
            confirmed=False)

        self.im1 = ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[0], image_id=self.test_images[0], face_index=0,
            confirmed=False)

        self.im2 = ImageIdentityMatch.objects.create(
            user=self.test_users[1], identity_group_id=self.identities[0], image_id=self.test_images[0], face_index=0,
            confirmed=False)

    def test_view_is_protected(self):
        self.assertTrue(is_protected(
            reverse('identity_match', kwargs={'pk': self.im1.id})))

    def _get_update_payload(self, im):
        return {
            "face_index": im.face_index,
            "image_id": str(im.image_id.id),
            "identity_group_id": im.identity_group_id.id,
            "confirmed": True
        }

    def test_update_image_identity_match(self):
        credentials = auth_headers(self.test_users[0])
        identity_match_view = reverse(
            'identity_match', kwargs={'pk': self.im1.id})

        self.assertFalse(ImageIdentityMatch.objects.get(
            id=self.im1.id).confirmed)

        update_payload = self._get_update_payload(self.im1)

        client.patch(
            identity_match_view,
            data=json.dumps(update_payload),
            content_type="application/json",
            **credentials
        )

        self.assertTrue(ImageIdentityMatch.objects.get(
            id=self.im1.id).confirmed)

    def test_can_update_only_owned_match(self):
        credentials = auth_headers(self.test_users[0])
        identity_match_view = reverse(
            'identity_match', kwargs={'pk': self.im2.id})

        self.assertFalse(ImageIdentityMatch.objects.get(
            id=self.im2.id).confirmed)

        update_payload = self._get_update_payload(self.im2)

        response = client.put(
            identity_match_view,
            data=json.dumps(update_payload),
            content_type="application/json",
            **credentials
        )
        self.assertEqual(response.status_code, 404)

    def test_reject_identity_match(self):
        self.assertEqual(self.im2.rejected_identities, None)

        _reject_identity_match(self.im2)

        self.assertEqual(ImageIdentityMatch.objects.get(
            id=self.im2.id).rejected_identities, [self.im2.identity_group_id.id])

    def test_merge_identities(self):
        credentials = auth_headers(self.test_users[0])
        response = client.get(
            reverse('merge_identities', kwargs={
                "base_identity_id": self.identities[0].id, "join_identity_id": self.identities[1].id}),
            **credentials
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        for match in response.data:
            self.assertEqual(match.get('identity_group_id'),
                             self.identities[0].id)
        self.assertFalse(IdentityGroup.objects.filter(
            id=self.identities[1].id).exists())


class PersonTest(TestCase):

    def setUp(self):
        self.test_users = [User.objects.create(
            id=uuid.uuid4(), username=user.get('username'), email=user.get('email')) for user in TEST_USERS]

        self.test_images = [Image.objects.create(user=user, width=image.get(
            'width'), height=image.get('height'), face_encodings=image.get('face_encodings')) for image in TEST_IMAGES
                            for user in self.test_users]

        self.identities = [IdentityGroup.objects.create(identity=identity.get(
            'name'), user=self.test_users[0]) for identity in TEST_IDENTITIES]

        # Identity 1
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[0], image_id=self.test_images[0], face_index=0)

        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[0], image_id=self.test_images[1], face_index=0)

        # Identity 2
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[1], image_id=self.test_images[2], face_index=0)

    def test_view_is_protected(self):
        self.assertTrue(is_protected(
            reverse('person', kwargs={'identity_id': self.identities[0].id})))

    def test_get_person_images(self):
        credentials = auth_headers(self.test_users[0])
        self._test_person_count(credentials, self.identities[0].id, 2)
        self._test_person_count(credentials, self.identities[1].id, 1)

    def _test_person_count(self, credentials, identity_id, expected_length):
        person_view = reverse(
            'person', kwargs={'identity_id': identity_id})
        response = client.get(
            person_view,
            **credentials
        )
        self.assertEqual(len(results(response)), expected_length)


class ImageTest(TestCase):

    def setUp(self):
        self.test_users = [User.objects.create(
            id=uuid.uuid4(), username=user.get('username'), email=user.get('email')) for user in TEST_USERS]

        self.test_images = [Image.objects.create(user=user, width=image.get(
            'width'), height=image.get('height'), face_encodings=image.get('face_encodings')) for image in TEST_IMAGES
                            for user in self.test_users]

    def test_view_is_protected(self):
        self.assertTrue(is_protected(IMAGE_VIEW))

    def test_get_images(self):
        credentials = auth_headers(self.test_users[0])
        response = client.get(
            IMAGE_VIEW,
            **credentials
        )
        images = results(response)
        self.assertEqual(len(images), len(TEST_IMAGES))

    def test_get_images_ordering(self):
        credentials = auth_headers(self.test_users[0])
        self.assertEqual(
            results(client.get(
                f'{IMAGE_VIEW}?ordering=uploaded_at',
                **credentials)),
            list(reversed(results(client.get(
                f'{IMAGE_VIEW}?ordering=-uploaded_at', **credentials)))))

    def test_delete_image(self):
        # Can delete owned image
        credentials = auth_headers(self.test_users[0])
        image_id = self.test_images[0].id
        self.assertTrue(Image.objects.filter(id=image_id).exists())

        response = client.delete(
            reverse('image_detail', kwargs={'pk': image_id}),
            **credentials
        )
        self.assertFalse(Image.objects.filter(id=image_id).exists())

        # Can't delete image from someone else
        image_id = self.test_images[-1].id
        self.assertTrue(Image.objects.filter(id=image_id).exists())
        response = client.delete(
            reverse('image_detail', kwargs={'pk': image_id}),
            **credentials
        )
        self.assertEqual(response.status_code, 404)
        self.assertTrue(Image.objects.filter(id=image_id).exists())


class FavoriteTest(TestCase):

    def setUp(self):
        self.test_users = [User.objects.create(
            id=uuid.uuid4(), username=user.get('username'), email=user.get('email')) for user in TEST_USERS]

        self.test_images = [Image.objects.create(user=user, width=image.get(
            'width'), height=image.get('height'), favorite=image.get('favorite', False)) for image in TEST_IMAGES for
                            user in self.test_users]

    def test_view_is_protected(self):
        self.assertTrue(is_protected(FAVORITES_VIEW))

    def test_get_favorites(self):
        self._test_get_favorites(self.test_users[0], 2)

    def test_set_favorite(self):
        credentials = auth_headers(self.test_users[0])
        self.assertFalse(self.test_images[0].favorite)

        update_payload = {
            "image_id": str(self.test_images[0].id),
            "favorite": True
        }

        response = client.patch(
            reverse('image_detail', kwargs={'pk': self.test_images[0].id}),
            data=json.dumps(update_payload),
            content_type="application/json",
            **credentials
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(Image.objects.get(id=self.test_images[0].id).favorite)
        self._test_get_favorites(self.test_users[0], 3)

    def _test_get_favorites(self, user, expected_length):
        credentials = auth_headers(user)
        response = client.get(
            FAVORITES_VIEW,
            **credentials
        )
        self.assertEqual(len(results(response)), expected_length)


class IdentityTest(TestCase):

    def setUp(self):
        self.test_users = [User.objects.create(
            id=uuid.uuid4(), username=user.get('username'), email=user.get('email')) for user in TEST_USERS]

        self.identities = [IdentityGroup.objects.create(identity=identity.get(
            'name'), user=self.test_users[0]) for identity in TEST_IDENTITIES]

        self.identity_protected = IdentityGroup.objects.create(
            identity='Test', user=self.test_users[1])

    def test_is_protected(self):
        self.assertTrue(is_protected(reverse('identity_detail',
                                             kwargs={'pk': self.identities[0].id})))

    def test_get_identity_owned(self):
        identity_detail_view = reverse('identity_detail',
                                       kwargs={'pk': self.identities[0].id})
        credentials = auth_headers(self.test_users[0])
        response = client.get(
            identity_detail_view,
            **credentials
        )
        self.assertEqual(IdentityGroupSerializer(
            self.identities[0]).data, response.data)
        self.assertEqual(response.data.get('identity'),
                         TEST_IDENTITIES[0].get('name'))

    def test_get_identity_someone_else(self):
        identity_detail_view = reverse('identity_detail',
                                       kwargs={'pk': self.identity_protected.id})
        credentials = auth_headers(self.test_users[0])
        response = client.get(
            identity_detail_view,
            **credentials
        )
        self.assertEqual(response.status_code, 404)

    def test_update_identity(self):
        update_payload = {
            "user": str(self.test_users[0].id),
            "identity": "Updated identity!"
        }

        identity_detail_view = reverse('identity_detail',
                                       kwargs={'pk': self.identities[0].id})

        credentials = auth_headers(self.test_users[0])
        response = client.put(
            identity_detail_view,
            data=json.dumps(update_payload),
            content_type="application/json",
            **credentials
        )
        self.assertEqual(IdentityGroup.objects.get(
            id=self.identities[0].id).identity, "Updated identity!")


class TestNeighbours(TestCase):

    def setUp(self):
        self.test_user = User.objects.create(
            username="matej", email="ematej.snuderl@gmail.com")

        self.matej_image = Image.objects.create(
            width=300, height=300, user=self.test_user, face_encodings=[[1.0]])

        self.miha_image = Image.objects.create(
            width=300, height=300, user=self.test_user, face_encodings=[[1.0]])

        self.marko_image = Image.objects.create(
            width=300, height=300, user=self.test_user, face_encodings=[[1.0]])

        self.matej_and_miha_image = Image.objects.create(
            width=300, height=300, user=self.test_user, face_encodings=[[1.0], [1.0]])

        self.matej_and_marko_image = Image.objects.create(
            width=300, height=300, user=self.test_user, face_encodings=[[1.0], [1.0]])

        self.matej_and_marjana_image = Image.objects.create(
            width=300, height=300, user=self.test_user, face_encodings=[[1.0], [1.0]])

        self.marko_identity = IdentityGroup.objects.create(
            identity='Marko', user=self.test_user)
        marko_match = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.marko_image, identity_group_id=self.marko_identity, face_index=0,
            confirmed=True)

        self.miha_identity = IdentityGroup.objects.create(
            identity='Miha', user=self.test_user)
        miha_match = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.miha_image, identity_group_id=self.miha_identity, face_index=0,
            confirmed=True)

        self.matej_identity = IdentityGroup.objects.create(
            identity='Matej', user=self.test_user)
        matej_match = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.matej_image, identity_group_id=self.matej_identity, face_index=0,
            confirmed=True)
        matej_match_with_miha = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.matej_and_miha_image, identity_group_id=self.matej_identity,
            face_index=0, confirmed=True)
        miha_match_with_matej = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.matej_and_miha_image, identity_group_id=self.miha_identity, face_index=1,
            confirmed=True)

        matej_match_with_marko = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.matej_and_marko_image, identity_group_id=self.matej_identity,
            face_index=0, confirmed=True)
        marko_match_with_matej = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.matej_and_marko_image, identity_group_id=self.marko_identity,
            face_index=1, confirmed=True)

        self.marjana_identity = IdentityGroup.objects.create(
            identity='Marjana', user=self.test_user)
        marjana_match_with_matej = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.matej_and_marjana_image, identity_group_id=self.marjana_identity,
            face_index=0, confirmed=True)
        matej_match_with_marjana = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.matej_and_marjana_image, identity_group_id=self.matej_identity,
            face_index=1, confirmed=True)

    def test_is_protected(self):
        self.assertTrue(is_protected(reverse('identity_neighbours', kwargs={
            'identity_id': self.matej_identity.id})))

    def test_neighbours(self):
        credentials = auth_headers(self.test_user)

        self._test_neighbours(
            credentials, self.matej_identity, 2, ['Marko', 'Miha'])
        self._test_neighbours(credentials, self.marko_identity, 1, ['Matej'])
        self._test_neighbours(credentials, self.marjana_identity, 1, ['Matej'])

    def _test_neighbours(self, credentials, identity, expected_length, expected_identities):
        response = client.get(
            reverse('identity_neighbours', kwargs={
                'identity_id': identity.id}),
            **credentials
        )
        res = results(response)
        self.assertEqual(len(res), expected_length)

        identities = [identity.get('image_identity') for identity in res]

        for identity_name in expected_identities:
            self.assertTrue(identity_name in identities)


class PeopleTest(TestCase):

    def setUp(self):
        self.test_users = [User.objects.create(
            id=uuid.uuid4(), username=user.get('username'), email=user.get('email')) for user in TEST_USERS]

        self.test_images = [Image.objects.create(user=user, width=image.get(
            'width'), height=image.get('height'), face_encodings=image.get('face_encodings')) for image in TEST_IMAGES
                            for user in self.test_users]

        candidate_images = [image for image in self.test_images if image.face_encodings and len(
            image.face_encodings) == 1 and image.user == self.test_users[0]]

        self.identities = [IdentityGroup.objects.create(identity=identity.get(
            'name'), user=self.test_users[0]) for identity in TEST_IDENTITIES]

        # Identity 1
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[0], image_id=candidate_images[0], face_index=0)

        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[0], image_id=candidate_images[1], face_index=0)

        # Identity 2
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[1], image_id=candidate_images[1], face_index=0)
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[1], image_id=candidate_images[2], face_index=0)

        # Identity 3
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[2], image_id=candidate_images[1], face_index=0)
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[2], image_id=candidate_images[3], face_index=0)

        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[2], image_id=candidate_images[2], face_index=0,
            confirmed=False)

        # Identity 4
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[3], image_id=candidate_images[1], face_index=0,
            confirmed=False)
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[3], image_id=candidate_images[3], face_index=0)

        # Identity 5
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[4], image_id=candidate_images[3], face_index=0)

        # Identity 6
        ImageIdentityMatch.objects.create(
            user=self.test_users[0], identity_group_id=self.identities[5], image_id=candidate_images[3], face_index=0,
            confirmed=False)

    def test_is_protected(self):
        self.assertTrue(is_protected(PEOPLE_VIEW))

    def test_people_returns_only_confirmed_and_portrait_images(self):
        credentials = auth_headers(self.test_users[0])
        response = client.get(
            PEOPLE_VIEW,
            **credentials
        )
        res = results(response)
        self.assertEqual(len(res), 5)

        for match in res:
            self.assertTrue(match.get('confirmed'))
            self.assertEqual(len(Image.objects.get(
                id=match.get('image_id')).face_encodings), 1)
