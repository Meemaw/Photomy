import os
import PIL.Image
import requests


CDN_SECRET_KEY = os.environ['AWS_LAMBDA_SECRET_APP_KEY']
CDN_SECRET_VALUE = os.environ['AWS_LAMBDA_SECRET_APP_VALUE']


def get_photomy_cdn_image(image_url):
    return PIL.Image.open(requests.get(
        image_url, stream=True,
        headers={CDN_SECRET_KEY: CDN_SECRET_VALUE}).raw)
