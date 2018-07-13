from django.core.management.base import BaseCommand, CommandError
from authentication.models import User
from gallery.models import Image
from allauth.account.models import EmailAddress

from gallery.views import _upload_url_user


test_user_email = "test_user1@gmail.com"
TEST_IMAGE_1_URL = "https://test.cdn.photomy.si/test/Screen+Shot+2018-07-11+at+10.57.58.png"
TEST_IMAGE_2_URL = "https://test.cdn.photomy.si/test/Screen+Shot+2018-07-11+at+12.58.29.png"
TEST_IMAGE_3_URL = "https://test.cdn.photomy.si/test/Screen+Shot+2018-07-11+at+12.58.31.png"


class Command(BaseCommand):

    def handle(self, *args, **options):
        user = User.objects.get(email=test_user_email)
        image = Image.objects.create(user=user, width=0, height=0)
        image = Image.objects.create(user=user, width=0, height=0)
        image = Image.objects.create(user=user, width=0, height=0)

        # TODO actualy upload images
