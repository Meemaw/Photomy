from photomy.test_base import *

from gallery.models import Image
from allauth.account.models import EmailAddress

from identifier.models import IdentityGroup, ImageIdentityMatch
ME_VIEW = reverse('me')


class AuthenticationTest(TestCase):

    def setUp(self):
        self.login_url = 'http://127.0.0.1:8000/rest-auth/login/'
        self.register_url = 'http://127.0.0.1:8000/rest-auth/registration/'
        self.ETA = 10

        self.user_data = {'email': 'ematej.snuderl@gmail.com',
                          'password1': 'abacabada', 'password2': 'abacabada'}

        response = client.post(
            self.register_url,
            data=json.dumps(self.user_data),
            content_type='application/json',
        )

    def test_login_unverified(self):
        response = client.post(
            self.login_url,
            data={'email': self.user_data['email'],
                  'password': self.user_data.get('password1')}
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data.get('non_field_errors')[0],
                         "E-mail is not verified.")

    def test_login_when_verified(self):
        EmailAddress.objects.all().update(verified=True)
        td1 = datetime.datetime.now()

        response = client.post(
            self.login_url,
            data={'email': self.user_data['email'],
                  'password': self.user_data.get('password1')}
        )

        td2 = get_token_valid_to(response.data.get(
            'token')) + datetime.timedelta(0, self.ETA)
        self.assertEqual((td2 - td1).days, 7)
        self.assertEqual(response.status_code, 200)


class MeTest(TestCase):

    def setUp(self):
        self.test_user = User.objects.create(
            id=uuid.uuid4(), username='Matej', email='ematej.snuderl@gmail.com')

        self.im1 = Image.objects.create(user=self.test_user, width=0, height=0)
        self.id1 = IdentityGroup.objects.create(
            identity="Matej", user=self.test_user)

        self.im_match1 = ImageIdentityMatch.objects.create(
            image_id=self.im1, identity_group_id=self.id1, user=self.test_user, face_index=0)

    def test_me_is_protected(self):
        self.assertTrue(is_protected(ME_VIEW))

    def test_get_me(self):
        response = client.get(
            ME_VIEW,
            **auth_headers(self.test_user)
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get(
            'username'), self.test_user.username)

    def test_update_user(self):
        first_name = 'Markoo'
        update_payload = {"first_name": first_name}
        response = client.put(
            ME_VIEW,
            data=json.dumps(update_payload),
            content_type="application/json",
            **auth_headers(self.test_user)
        )
        self.assertTrue(response.status_code, 200)
        self.assertEqual(response.data.get('first_name'), first_name)

    def test_delete_user(self):
        self.assertTrue(User.objects.filter(id=self.test_user.id).exists())
        response = client.delete(
            ME_VIEW,
            **auth_headers(self.test_user)
        )

        self.assertTrue(response.status_code, 200)
        self.assertFalse(User.objects.filter(id=self.test_user.id).exists())
        self.assertFalse(Image.objects.filter(id=self.im1.id).exists())
        self.assertFalse(IdentityGroup.objects.filter(id=self.id1.id).exists())
        self.assertFalse(ImageIdentityMatch.objects.filter(
            id=self.im_match1.id).exists())
