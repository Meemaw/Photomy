from .test import *

SECRET_KEY = "SecretKeyForUseOnTravis"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'travisci',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
    }
}
