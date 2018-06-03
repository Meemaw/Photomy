SECRET_KEY = "SecretKeyForUseOnTravis"
DEBUG = False
TEMPLATE_DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'travisci',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
    }
}
