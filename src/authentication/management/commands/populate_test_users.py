from django.core.management.base import BaseCommand, CommandError
from authentication.models import User
from allauth.account.models import EmailAddress

USERS = [{"email": "test_user1@gmail.com", "password": "test12345"},
         {"email": "test_delete@gmail.com", "password": "testdelete"}]


class Command(BaseCommand):

    def handle(self, *args, **options):
        for user in USERS:
            user = User.objects.create_user(
                email=user.get('email'), password=user.get('password'))
            EmailAddress.objects.create(
                email=user.email, verified=True, primary=True, user_id=user.id)
