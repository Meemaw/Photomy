from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage
from django.core.files.storage import Storage


class MediaStorage(S3Boto3Storage):
    location = settings.AWS_MEDIA_LOCATION
    file_overwrite = False


class TestFile(object):

    def __init__(self, name):
        self.url = name
        self._committed = False

    def write(self, d):
        self._committed = True

    def close(self):
        pass


class TestStorage(Storage):

    def _open(self, name, mode=None):
        return TestFile(name)

    def url(self, name):
        return name
