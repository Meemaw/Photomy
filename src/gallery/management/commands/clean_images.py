from django.core.management.base import BaseCommand
from gallery.models import Image


class Command(BaseCommand):

    def handle(self, *args, **options):
        Image.objects.all().delete()
