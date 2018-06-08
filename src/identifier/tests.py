import face_recognition

from gallery.models import Image
from photomy.test_base import *
from .models import IdentityGroup, ImageIdentityMatch
from .tasks import _encode_image_faces, create_new_identity, match_face, STRICT_SIMILARITY_THRESHOLD, \
    REVIEW_SIMILARITY_THRESHOLD

OBAMA_IMAGE = f'{TEST_IMAGES_PATH}/obama.jpg'
OBAMA2_IMAGE = f'{TEST_IMAGES_PATH}/obama2.jpg'
OBAMA3_IMAGE = f'{TEST_IMAGES_PATH}/obama3.jpg'
HILLARY_IMAGE = f'{TEST_IMAGES_PATH}/hillary.jpg'
HILLARY2_IMAGE = f'{TEST_IMAGES_PATH}/hillary2.jpg'
OBAMA_HILLARY_IMAGE = f'{TEST_IMAGES_PATH}/obama_hillary.jpg'
OBAMA_HILLARY_TRUMP_IMAGE = f'{TEST_IMAGES_PATH}/obama_hillary_trump.jpg'


class EncodeFacesTest(TestCase):

    def setUp(self):
        self.test_user = User.objects.create(
            username="matej", email="ematej.snuderl@gmail.com")
        self.im1 = Image.objects.create(
            width=200, height=300, user=self.test_user)

    def test_encode_image_with_1_face(self):
        self._test_encoding(self.im1, OBAMA_IMAGE,
                            1, -0.08943535387516022)

    def test_encode_image_with_2_faces(self):
        self._test_encoding(self.im1, OBAMA_HILLARY_IMAGE,
                            2, -0.12712667882442474)

    def test_encode_image_with_3_faces(self):
        self._test_encoding(self.im1, OBAMA_HILLARY_TRUMP_IMAGE, 3)

    def _test_encoding(self, model_image, image_path, num_faces, first_value=None):
        raw_image = PIL.Image.open(image_path)
        self.assertTrue(model_image.face_encodings == None)
        self.assertTrue(model_image.face_locations == None)
        face_encodings = _encode_image_faces(model_image, raw_image)
        if first_value:
            self.assertEqual(face_encodings[0][0], first_value)
        self.assertEqual(len(face_encodings), num_faces)
        self.assertTrue(Image.objects.get(
            id=model_image.id).face_encodings != None)
        self.assertTrue(Image.objects.get(
            id=model_image.id).face_locations != None)


class NewIdentityTest(TestCase):

    def setUp(self):
        self.test_user = User.objects.create(
            username="matej", email="ematej.snuderl@gmail.com")
        self.im1 = Image.objects.create(
            width=200, height=300, user=self.test_user)

        self.identity_1 = IdentityGroup.objects.create(
            identity="Test", user=self.test_user)

    def test_create_identity_for_new_match(self):
        create_new_identity(self.im1, 2)

        self.assertTrue(ImageIdentityMatch.objects.filter(
            image_id=self.im1.id).exists())
        self.assertEqual(ImageIdentityMatch.objects.get(
            image_id=self.im1.id).face_index, 2)

        self.assertEqual(IdentityGroup.objects.count(), 2)

    def test_create_identity_for_existing_match(self):
        existing_match = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.im1, identity_group_id=self.identity_1, face_index=2, confirmed=False)
        self.assertEqual(existing_match.identity_group_id.id,
                         self.identity_1.id)
        self.assertFalse(existing_match.confirmed)

        create_new_identity(self.im1, 1, existing_match)
        self.assertNotEqual(
            existing_match.identity_group_id.id, self.identity_1.id)
        self.assertTrue(existing_match.confirmed)
        self.assertEqual(IdentityGroup.objects.count(), 2)
        self.assertEqual(existing_match.face_index, 2)


class MatchFaceTest(TestCase):

    def setUp(self):
        self.test_user = User.objects.create(
            username="matej", email="ematej.snuderl@gmail.com")

        obama_face_encoding = list(face_recognition.face_encodings(
            face_recognition.load_image_file(OBAMA_IMAGE))[0])

        self.obama_image = Image.objects.create(
            width=300, height=300, user=self.test_user, face_encodings=[obama_face_encoding])

        self.obama_identity = IdentityGroup.objects.create(
            identity='Obama', user=self.test_user)

        self.obama_match1 = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.obama_image, identity_group_id=self.obama_identity, face_index=0)

        hillary_face_encoding = list(face_recognition.face_encodings(
            face_recognition.load_image_file(HILLARY_IMAGE))[0])

        self.hillary_image = Image.objects.create(
            width=300, height=300, user=self.test_user, face_encodings=[hillary_face_encoding])

        self.hillary_identity = IdentityGroup.objects.create(
            identity='Hilary', user=self.test_user)

        self.hillary_match_1 = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.hillary_image, identity_group_id=self.hillary_identity, face_index=0)

    def test_existing_match(self):
        existing_match = ImageIdentityMatch.objects.create(
            user=self.test_user, image_id=self.obama_image, identity_group_id=self.obama_identity, face_index=0)

        encoding = face_recognition.face_encodings(
            face_recognition.load_image_file(OBAMA2_IMAGE))[0]
        new_image = Image.objects.create(
            width=300, height=300, user=self.test_user)

        self.assertEqual(ImageIdentityMatch.objects.filter(
            identity_group_id=self.obama_identity.id).count(), 2)

        identity, _, identity_match = match_face(0, encoding,
                                                 ImageIdentityMatch.objects.all(), new_image,
                                                 existing_match=existing_match)
        self.assertEqual(identity_match.id, existing_match.id)
        self.assertEqual(ImageIdentityMatch.objects.filter(
            identity_group_id=self.obama_identity.id).count(), 2)
        self.assertEqual(identity.id, self.obama_identity.id)

    def test_obama_similar_image(self):
        self._test_match_face(
            OBAMA2_IMAGE, self.obama_identity.id, self.confirmed_similarity_check, 2, True)

    def test_obama_to_review_image(self):
        self._test_match_face(
            OBAMA3_IMAGE, self.obama_identity.id, self.review_similarity_check, 2, False)

    def test_hillary_match_face(self):
        self._test_match_face(
            HILLARY2_IMAGE, self.hillary_identity.id, self.confirmed_similarity_check, 2, True)

    def review_similarity_check(self, similarity):
        return similarity > STRICT_SIMILARITY_THRESHOLD and similarity < REVIEW_SIMILARITY_THRESHOLD

    def confirmed_similarity_check(self, similarity):
        return similarity < STRICT_SIMILARITY_THRESHOLD

    def _test_match_face(self, image_path, identity_id, similarity_check, expected_count, is_confirmed):
        encoding = face_recognition.face_encodings(
            face_recognition.load_image_file(image_path))[0]
        new_image = Image.objects.create(
            width=300, height=300, user=self.test_user)

        self.assertEqual(ImageIdentityMatch.objects.filter(
            identity_group_id=identity_id).count(), expected_count - 1)

        identity, similarity, identity_match = match_face(0, encoding,
                                                          ImageIdentityMatch.objects.all(), new_image)

        self.assertEqual(identity.id, identity_id)
        self.assertTrue(similarity_check(similarity))
        self.assertEqual(ImageIdentityMatch.objects.filter(
            identity_group_id=identity_id).count(), expected_count)
        if is_confirmed:
            self.assertTrue(identity_match.confirmed)
        else:
            self.assertFalse(identity_match.confirmed)


class IdifyImage(TestCase):

    def setUp(self):
        self.test_user = User.objects.create(
            username="matej", email="ematej.snuderl@gmail.com")

    def test_idify_image(self):
        self.assertTrue(True)
