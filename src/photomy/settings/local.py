from .base import *

SITE_ID = 2

EMAIL_CONFIRMATION_REDIRECT_URL = "http://localhost:3000/confirmed"

DEBUG = True
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = ('http//:127.0.0.1:3000', )
ALLOWED_HOSTS = ['127.0.0.1']


INSTALLED_APPS += [
    'silk'
]
MIDDLEWARE += [
    'silk.middleware.SilkyMiddleware'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'localhost',
        'PORT': 5432,
    }
}
