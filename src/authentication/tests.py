from photomy.test_base import *


ME_VIEW = reverse('me')


class MeTest(TestCase):

    def setUp(self):
        self.test_user = User.objects.create(
            id=uuid.uuid4(), username='Matej', email='ematej.snuderl@gmail.com')

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
