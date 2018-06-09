from .docker import *


DEBUG = False

EMAIL_CONFIRMATION_REDIRECT_URL = "http://photomy.si/confirmed"


AWS_S3_CUSTOM_DOMAIN = os.environ['AWS_CLOUDFRONT_DOMAIN']
AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PASSWORD': os.environ['POSTGRES_PASSWORD'],
        'PORT': 5432,
    }
}


SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = 'DENY'
