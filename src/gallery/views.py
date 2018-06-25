import logging
import uuid

import PIL.Image
import requests
from django.core.files.storage import default_storage as storage
from django.db.models import Q, Count
from rest_framework import filters
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from identifier.models import ImageIdentityMatch, IdentityGroup
from identifier.serializers import ImageIdentityMatchSerializer, IdentitySerializer
from identifier.tasks import reidify_identity_match
from .constants import ALBUM_ID, JPEG, PK, AVATAR, RECOGNIZE_PEOPLE, ProcessingStatus, LOCATION

from .models import Image, Album
from .serializers import ImageSerializer, AlbumSerializer, AlbumsSerializer

logger = logging.getLogger(__name__)


# ALBUM

class AlbumListView(generics.ListCreateAPIView):
    filter_backends = (filters.OrderingFilter,)
    serializer_class = AlbumSerializer

    def list(self, request):
        queryset = Album.objects.filter(Q(user=self.request.user)).annotate(
            images_count=Count('images'))
        serializer = AlbumsSerializer(queryset, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class AlbumDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AlbumSerializer

    def get_queryset(self):
        album_id = self.kwargs.get(PK)
        return Album.objects.filter(Q(user=self.request.user) & Q(id=album_id))


@api_view(['POST'])
def add_image_to_album(request, album_id, image_id):
    album = Album.objects.get(Q(id=album_id) & Q(user=request.user))
    image = Image.objects.get(Q(id=image_id) & Q(user=request.user))

    if not album.images.filter(id=image_id).exists():
        album.images.add(image)

    if not album.cover_image:
        album.cover_image = image

    album.save()

    return Response(status=status.HTTP_200_OK)


@api_view(['DELETE'])
def remove_image_from_album(request, album_id, image_id):
    album = Album.objects.get(Q(id=album_id) & Q(user=request.user))
    image = Image.objects.get(Q(id=image_id) & Q(user=request.user))

    album.images.remove(image)
    if album.cover_image and album.cover_image.id == image_id:
        album.cover_image = None

    album.save()

    return Response(status=status.HTTP_200_OK)


# IDENTITY_MATCH
class IdentityMatchDetail(generics.UpdateAPIView):
    serializer_class = ImageIdentityMatchSerializer

    def get_queryset(self, **kwargs):
        identity_match_id = self.kwargs.get(PK)
        return ImageIdentityMatch.objects.filter(Q(id=identity_match_id) & Q(user=self.request.user))


@api_view(['GET'])
def merge_identities(request, base_identity_id, join_identity_id):
    logger.info("merge_identities")
    if not base_identity_id or not join_identity_id or base_identity_id == join_identity_id:
        return Response(data={}, status=status.HTTP_400_BAD_REQUEST)

    join_identity = IdentityGroup.objects.get(
        Q(user=request.user) & Q(id=join_identity_id))
    base_identity = IdentityGroup.objects.get(
        Q(user=request.user) & Q(id=base_identity_id))

    if not base_identity.identity and join_identity.identity:
        base_identity.identity = join_identity.identity
        base_identity.save()

    matches_to_join = ImageIdentityMatch.objects.filter(
        Q(user=request.user) & Q(identity_group_id=join_identity_id))

    ids = list(matches_to_join.values_list('id', flat=True))

    matches_to_join.update(identity_group_id=base_identity_id)
    join_identity.delete()

    updated_matches = ImageIdentityMatch.objects.filter(id__in=ids)

    serializer = ImageIdentityMatchSerializer(updated_matches, many=True)

    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def reject_identity_match(request, pk):
    logger.info("reject_identity_match")
    identity_match = ImageIdentityMatch.objects.select_related('image_id').get(
        Q(image_id__user=request.user) & Q(id=pk))
    identity_match = _reject_identity_match(identity_match)

    reidify_identity_match.delay(identity_match.id)
    return Response(data={}, status=status.HTTP_200_OK)


def _reject_identity_match(identity_match):
    rejected_identities = identity_match.rejected_identities

    if not rejected_identities:
        rejected_identities = []

    rejected_identities.append(identity_match.identity_group_id.id)
    identity_match.rejected_identities = rejected_identities
    identity_match.save()
    return identity_match


# IDENTITY

class IdentityDetail(generics.RetrieveUpdateAPIView):
    serializer_class = IdentitySerializer

    def get_queryset(self, **kwargs):
        identity_id = self.kwargs.get(PK)
        return IdentityGroup.objects.filter(Q(id=identity_id) & Q(user=self.request.user))


class IdentityList(generics.ListAPIView):
    serializer_class = IdentitySerializer

    def get_queryset(self, **kwargs):
        return IdentityGroup.objects.filter(user=self.request.user)


@api_view(['GET'])
def get_representatives(request, identity_id):
    logger.info("get_representatives")
    images = ImageIdentityMatch.objects.filter(Q(identity_group_id=identity_id) & Q(user=request.user) & Q(
        confirmed=True) & Q(image_id__face_encodings__len=1)).distinct()[:4]

    serializer = ImageIdentityMatchSerializer(images, many=True)

    return Response(data=serializer.data, status=status.HTTP_200_OK)


# PERSON


class PersonList(generics.ListAPIView):
    filter_backends = (filters.OrderingFilter,)
    serializer_class = ImageIdentityMatchSerializer

    def get_queryset(self, **kwargs):
        identity_id = self.kwargs.get('identity_id')
        return ImageIdentityMatch.objects.select_related('image_id').filter(
            Q(identity_group_id__id=identity_id) & Q(user=self.request.user)).distinct()


# PEOPLE

class PeopleList(generics.ListAPIView):
    filter_backends = (filters.OrderingFilter,)
    serializer_class = ImageIdentityMatchSerializer

    def get_queryset(self):
        matches = ImageIdentityMatch.objects.filter(
            Q(image_id__face_encodings__len=1) & Q(image_id__user=self.request.user) & Q(confirmed=True)).distinct()

        people = {match.identity_group_id.id: match for match in matches}.values()
        return list(people)


class NeighbourPeople(generics.ListAPIView):
    filter_backends = (filters.OrderingFilter,)
    serializer_class = ImageIdentityMatchSerializer

    def get_queryset(self, **kwargs):
        identity_id = self.kwargs.get('identity_id')

        identity_images = ImageIdentityMatch.objects.filter(
            Q(identity_group_id=identity_id)).values('image_id')

        neighbours = ImageIdentityMatch.objects.filter(
            Q(image_id__in=identity_images) & Q(confirmed=True)).exclude(identity_group_id=identity_id).values(
            'identity_group_id').distinct()

        matches = ImageIdentityMatch.objects.filter(
            Q(image_id__face_encodings__len=1) & Q(image_id__user=self.request.user) & Q(confirmed=True) & Q(
                identity_group_id__in=neighbours)).distinct()

        people = {match.identity_group_id.id: match for match in matches}.values()

        return list(people)


# FAVORITES

class FavoritesList(generics.ListAPIView):
    serializer_class = ImageSerializer
    filter_backends = (filters.OrderingFilter,)

    def get_queryset(self):
        return Image.objects.filter(Q(favorite=True) & Q(user=self.request.user))


# IMAGES

class ImagesList(generics.ListAPIView):
    serializer_class = ImageSerializer
    filter_backends = (filters.OrderingFilter,)

    def get_queryset(self):
        return Image.objects.filter(user=self.request.user)


class ImageDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ImageSerializer

    def get_queryset(self):
        return Image.objects.filter(user=self.request.user)


# UPLOAD

@api_view(['POST'])
def upload_image_file(request):
    logger.info("upload_image_file")
    uploaded_file = request.FILES.get('file')
    image = PIL.Image.open(uploaded_file).convert('RGB')
    image.format = image.format if image.format else JPEG
    return handle_image_upload(image, request.user, request.POST)


@api_view(['POST'])
def upload_url(request):
    logger.info("upload_url")
    image_url = request.data.get('image_url', '')
    try:
        image = PIL.Image.open(requests.get(image_url, stream=True).raw)
    except OSError as e:
        logger.debug(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return handle_image_upload(image, request.user, request.POST)


def handle_image_upload(image, user, extra_data):
    new_image = save_image(image, user, extra_data)
    serializer = ImageSerializer(new_image)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


def get_lqip(image, image_id, user, size=(300, 300)):
    file_name = str(image_id) + '_' + str(user.id) + \
        '.preview.' + image.format
    lqip_f_thumb = storage.open(file_name, "w")

    optimized_image = image.copy()
    optimized_image.thumbnail(size, PIL.Image.ANTIALIAS)

    optimized_image.save(lqip_f_thumb, JPEG, optimize=True, quality=85)
    return lqip_f_thumb


def save_image(image, user, extra_data=None):
    extra_data = extra_data if extra_data else {}
    return _save_image(image, user, extra_data)


def is_truthy(value):
    return value == True or value == 'True' or value == 'true'


def _save_image(image, user, extra_data):
    image_id = uuid.uuid4()
    file_name = str(image_id) + '_' + str(user.id) + '.' + image.format
    f_thumb = storage.open(file_name, "w")
    image.save(f_thumb, JPEG)
    width, height = image.size

    processing_status = ProcessingStatus.INITIAL if is_truthy(
        extra_data.get(RECOGNIZE_PEOPLE, True)) else ProcessingStatus.USER_DISABLED

    lqip_f_thumb = get_lqip(image, image_id, user)

    new_image = Image.objects.create(
        id=image_id,
        user=user,
        width=width,
        height=height,
        image_upload=f_thumb,
        lqip_upload=lqip_f_thumb,
        taken_on=extra_data.get('taken_on', None),
        processing_status=processing_status,
        location=extra_data.get(LOCATION, None))

    if extra_data.get(ALBUM_ID, None):
        album = Album.objects.get(id=extra_data[ALBUM_ID])
        if not album.cover_image:
            album.cover_image = new_image
        album.images.add(new_image)
        album.save()

    f_thumb.close()
    lqip_f_thumb.close()

    if extra_data.get(AVATAR, False):
        user.avatar = new_image
        user.save()

    return new_image
