from __future__ import absolute_import, unicode_literals

import itertools
import logging
import os

import PIL.Image
import face_recognition
import numpy as np
import requests


from photomy.celeryconf import app
from django.conf import settings
from gallery.constants import ProcessingStatus
from .models import Image, ImageIdentityMatch, IdentityGroup

STRICT_SIMILARITY_THRESHOLD = 0.52
REVIEW_SIMILARITY_THRESHOLD = 0.6
CDN_SECRET_KEY = os.environ['AWS_LAMBDA_SECRET_APP_KEY']
CDN_SECRET_VALUE = os.environ['AWS_LAMBDA_SECRET_APP_VALUE']

logger = logging.getLogger(__name__)

@app.task
def reidify_identity_match(identity_match_id):
    logger.info("reidify_identity_match task")
    identity_match = ImageIdentityMatch.objects.select_related(
        'image_id').get(id=identity_match_id)
    image = identity_match.image_id
    face_index = identity_match.face_index
    face_encoding = image.face_encodings[face_index]

    matches = ImageIdentityMatch.objects.select_related(
        'image_id', 'identity_group_id').filter(user=identity_match.user).exclude(
        identity_group_id__in=identity_match.rejected_identities).order_by('identity_group_id__id')

    match_face(face_index, np.array(face_encoding),
               matches, image, identity_match)


@app.task
def idify_image(image_id):
    logger.info("idify_image task")
    new_image = Image.objects.get(id=image_id)
    Image.objects.filter(id=image_id).update(
        processing_status=ProcessingStatus.PROCESSING)

    face_encodings = encode_image_faces(new_image)

    matches = ImageIdentityMatch.objects.select_related(
        'image_id', 'identity_group_id').filter(user=new_image.user).all().order_by('identity_group_id__id')

    _ = [match_face(face_index, np.array(face_encoding), matches, new_image)
         for face_index, face_encoding in enumerate(face_encodings)]

    Image.objects.filter(id=image_id).update(
        processing_status=ProcessingStatus.PROCESSED)


def match_face(face_index, face_encoding, all_matches, new_image, existing_match=None):
    matches_by_identity = itertools.groupby(
        all_matches, key=lambda match: match.identity_group_id)
    face_similarities = [(identity_id, get_face_2_group_similarity(
        face_encoding, identity_matches)) for identity_id, identity_matches in matches_by_identity]

    identity_id, similarity = min(
        face_similarities, key=lambda x: x[1], default=(None, 1))
    logger.debug(f"Similarity: ${similarity}")

    identity_match = existing_match if existing_match else ImageIdentityMatch()

    if similarity < REVIEW_SIMILARITY_THRESHOLD:
        identity_match.image_id = new_image
        identity_match.identity_group_id = identity_id
        identity_match.face_index = face_index
        identity_match.match_confidence = similarity
        identity_match.confirmed = False
        identity_match.user = new_image.user

        if similarity < STRICT_SIMILARITY_THRESHOLD:
            identity_match.confirmed = True

        identity_match.save()
    else:
        create_new_identity(new_image, face_index, existing_match)

    return identity_id, similarity, identity_match


def get_face_2_group_similarity(face_encoding, identity_group_matches):
    face_encodings = [np.array(match.face_encoding)
                      for match in identity_group_matches]
    return _get_face_2_group_similarity(face_encoding, face_encodings)


def _get_face_2_group_similarity(face_encoding, identity_group_face_encodings):
    distances = face_recognition.face_distance(
        identity_group_face_encodings, face_encoding)
    return sum(distances) / float(len(distances))


def create_new_identity(image, face_index, existing_match=None):
    identity = IdentityGroup.objects.create(user=image.user)

    if existing_match:
        existing_match.identity_group_id = identity
        existing_match.confirmed = True
        existing_match.save()
    else:
        return ImageIdentityMatch.objects.create(
            image_id=image, identity_group_id=identity,
            user=image.user,
            face_index=face_index)


def encode_image_faces(image):
    raw_image = PIL.Image.open(requests.get(
        image.image_upload.url, stream=True,
        headers={CDN_SECRET_KEY: CDN_SECRET_VALUE}).raw)

    return _encode_image_faces(image, raw_image)


def _encode_image_faces(image, raw_image):
    d_image = np.array(raw_image)
    face_locations = face_recognition.face_locations(d_image)
    face_encodings = face_recognition.face_encodings(d_image, face_locations)
    image.face_encodings = [list(face_encoding)
                            for face_encoding in face_encodings]
    image.face_locations = face_locations
    image.save()
    return face_encodings
