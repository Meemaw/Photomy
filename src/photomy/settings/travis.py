from .test import *

SECRET_KEY = "SecretKeyForUseOnTravis"
DEBUG = True
TEMPLATE_DEBUG = True
ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'travisci',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
    }
}
