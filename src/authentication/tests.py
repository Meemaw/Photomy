from photomy.test_base import *

from gallery.models import Image
from allauth.account.models import EmailAddress

from identifier.models import IdentityGroup, ImageIdentityMatch
ME_VIEW = reverse('me')


login_url = 'http://127.0.0.1:8000/rest-auth/login/'
register_url = 'http://127.0.0.1:8000/rest-auth/registration/'
ETA = 10

user_data = {'email': 'ematej.snuderl@gmail.com',
             'password1': 'abacabada', 'password2': 'abacabada'}


# Mark all tests to use database
pytestmark = pytest.mark.django_db


@pytest.fixture
def test_user():
    yield User.objects.create(id=uuid.uuid4(), username='Matej', email='ematej.snuderl@gmail.com')


@pytest.fixture(autouse=True)
def init_user_data(client):
    client.post(
        register_url,
        data=json.dumps(user_data),
        content_type='application/json',
    )
    yield
    user_data['email'] += "m"


def test_login_unverified(client):
    response = client.post(
        login_url,
        data={'email': user_data['email'],
              'password': user_data.get('password1')}
    )
    assert response.status_code == 400
    assert response.data.get('non_field_errors')[
        0] == "E-mail is not verified."


def test_login_when_verified(client):
    EmailAddress.objects.all().update(verified=True)
    td1 = datetime.datetime.now()

    response = client.post(
        login_url,
        data={'email': user_data['email'],
              'password': user_data.get('password1')}
    )

    td2 = get_token_valid_to(response.data.get(
        'token')) + datetime.timedelta(0, ETA)
    assert (td2 - td1).days == 7
    assert response.status_code == 200


def test_me_is_protected():
    assert is_protected(ME_VIEW) is True


def test_get_me(client, test_user):
    response = client.get(
        ME_VIEW,
        **auth_headers(test_user)
    )
    assert response.status_code == 200
    assert response.data.get('username') == test_user.username


def test_update_user(client, test_user):
    first_name = 'Markoo'
    update_payload = {"first_name": first_name}
    response = client.put(
        ME_VIEW,
        data=json.dumps(update_payload),
        content_type="application/json",
        **auth_headers(test_user)
    )
    assert response.status_code == 200
    assert response.data.get('first_name') == first_name


def test_delete_user(test_user, mocker):
    mocker.patch('gallery.signals.idify_image')
    im1 = Image.objects.create(user=test_user, width=0, height=0)
    id1 = IdentityGroup.objects.create(identity="Matej", user=test_user)
    im_match1 = ImageIdentityMatch.objects.create(
        image_id=im1, identity_group_id=id1, user=test_user, face_index=0)

    User.objects.filter(id=test_user.id).exists()
    response = client.delete(
        ME_VIEW,
        **auth_headers(test_user)
    )

    assert response.status_code == 204
    assert User.objects.filter(id=test_user.id).exists() is False
    assert Image.objects.filter(id=im1.id).exists() is False
    assert IdentityGroup.objects.filter(id=id1.id).exists() is False
    assert ImageIdentityMatch.objects.filter(id=im_match1.id).exists() is False
