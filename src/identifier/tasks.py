# Create your tasks here
from __future__ import absolute_import, unicode_literals

import itertools
import os

import PIL.Image
import face_recognition
import numpy as np
import requests

from photomy.celeryconf import app
from .models import Image, ImageIdentityMatch, IdentityGroup

STRICT_SIMILARITY_THRESHOLD = 0.52
REVIEW_SIMILARITY_THRESHOLD = 0.58


@app.task
def reidify_identity_match(identity_match_id):
    identity_match = ImageIdentityMatch.objects.select_related(
        'image_id').get(id=identity_match_id)

    image = identity_match.image_id
    face_index = identity_match.face_index
    face_encoding = image.face_encodings[face_index]

    matches = ImageIdentityMatch.objects.select_related(
        'image_id', 'identity_group_id').exclude(
        identity_group_id__in=identity_match.rejected_identities)

    match_face(face_index, np.array(face_encoding),
               matches, image, identity_match)


@app.task
def idify_image(image_id):
    new_image = Image.objects.get(id=image_id)

    face_encodings = encode_image_faces(new_image)

    matches = ImageIdentityMatch.objects.select_related(
        'image_id', 'identity_group_id').all()

    _ = [match_face(face_index, np.array(face_encoding), matches, new_image)
         for face_index, face_encoding in enumerate(face_encodings)]


def match_face(face_index, face_encoding, matches, new_image, existing_match=None):
    matches_by_identity = itertools.groupby(
        matches, key=lambda x: x.identity_group_id)

    face_similarities = [(key, get_match_2_group_similarity(
        face_encoding, group)) for key, group in matches_by_identity]

    identity_group, similarity = min(
        face_similarities, key=lambda x: x[1], default=(None, 1))

    print("Matching face: ", face_index)
    print("Identity group: ", identity_group)
    print("Similarity: ", similarity)

    identity_match = existing_match if existing_match else ImageIdentityMatch()

    if similarity < REVIEW_SIMILARITY_THRESHOLD:
        identity_match.image_id = new_image
        identity_match.identity_group_id = identity_group
        identity_match.face_index = face_index
        identity_match.match_confidence = similarity
        identity_match.confirmed = False
        identity_match.user = new_image.user

        if similarity < STRICT_SIMILARITY_THRESHOLD:
            identity_match.confirmed = True

        identity_match.save()
    else:
        return new_identity_group_for(new_image, face_index, existing_match)


def get_face_encoding(match):
    return match.image_id.face_encodings[match.face_index]


def get_match_2_group_similarity(face_encoding, group):
    face_encodings = [np.array(get_face_encoding(match)) for match in group]
    return get_image_2_group_similarity(face_encoding, face_encodings)


def get_image_2_group_similarity(face_encoding, group_face_encodings):
    distances = face_recognition.face_distance(
        group_face_encodings, face_encoding)
    return sum(distances) / float(len(distances))


def new_identity_group_for(image, face_index, existing_match=None):
    print("New identity for face!", face_index)
    identity = IdentityGroup.objects.create(user=image.user)

    if existing_match:
        print("Existing match")
        existing_match.identity_group_id = identity
        existing_match.confirmed = True
        existing_match.save()
    else:
        print("Ne match!")
        return ImageIdentityMatch.objects.create(
            image_id=image, identity_group_id=identity,
            user=image.user,
            face_index=face_index)


def encode_image_faces(image):
    raw_image = PIL.Image.open(requests.get(
        image.image_upload.url, stream=True,
        headers={os.environ['AWS_LAMBDA_SECRET_APP_KEY']: os.environ['AWS_LAMBDA_SECRET_APP_VALUE']}).raw)

    d_image = np.array(raw_image)

    face_locations = face_recognition.face_locations(d_image)
    face_encodings = face_recognition.face_encodings(d_image)

    image.face_encodings = [list(face_encoding)
                            for face_encoding in face_encodings]
    image.face_locations = face_locations
    image.save()

    return face_encodings
