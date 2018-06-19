# Stdlib imports
import json
import re
import uuid
import datetime
import os
import numpy as np
import PIL.Image
import pytest

from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.conf import settings

from rest_framework import status
from rest_framework_jwt.settings import api_settings

User = get_user_model()

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
