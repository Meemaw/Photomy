# Stdlib imports
import json
import re
import uuid
import datetime
from django.conf import settings
import os

# Django core imports
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model

User = get_user_model()
import PIL.Image

# DRF imports
from rest_framework import status
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER

# Initialize the APIClient app
client = Client()

UNAUTHORIZED_STATUS_CODE = 401

TEST_IMAGES_PATH = f'{os.path.dirname(os.path.realpath(__name__))}/tests/test_images'


def auth_headers(user):
    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)
    return {'HTTP_AUTHORIZATION': f"JWT {token}"}


def get_token_valid_to(token):
    return datetime.datetime.fromtimestamp(int(jwt_decode_handler(token).get('exp')))


def results(response):
    return response.data.get('results')


def is_protected(endpoint):
    return client.get(endpoint).status_code == UNAUTHORIZED_STATUS_CODE


TEST_USERS = [
    {"username": 'Miha', "email": 'miha@gmail.com'},
    {"username": "Marko", "email": 'marko.skace@gmail.com'}
]
