from photomy.settings.base import *


DEBUG = True
CORS_ORIGIN_ALLOW_ALL = True
TEMPLATE_DEBUG = True
ALLOWED_HOSTS = ['*']


CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'


DEFAULT_FILE_STORAGE = 'gallery.storage_backends.TestStorage'

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': '127.0.0.1',
        'PORT': 5432,
    }
}
