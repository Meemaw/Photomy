from .test import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'e2e',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
    }
}

DEFAULT_FILE_STORAGE = 'gallery.storage_backends.MediaStorage'
ACCOUNT_EMAIL_VERIFICATION = 'none'
