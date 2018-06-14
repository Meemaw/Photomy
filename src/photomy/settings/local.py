from .base import *

SITE_ID = 2

EMAIL_CONFIRMATION_REDIRECT_URL = "http://localhost:3000/confirmed"

DEBUG = True
ALLOWED_HOSTS = ["*"]
CORS_ORIGIN_ALLOW_ALL = True

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
