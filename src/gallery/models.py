import uuid

from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator
from django.db import models
from .constants import ProcessingStatus


class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image_upload = models.FileField()
    lqip_upload = models.FileField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    favorite = models.BooleanField(default=False)
    width = models.IntegerField()
    height = models.IntegerField()
    location = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=100, null=True, blank=True)

    processing_status = models.CharField(
        max_length=30, choices=[(tag, tag.value) for tag in ProcessingStatus], default=ProcessingStatus.INITIAL)

    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    taken_on = models.DateTimeField(null=True)

    face_locations = ArrayField(
        ArrayField(
            models.IntegerField(validators=[MinValueValidator(0)]),
            size=4
        ),
        size=20,
        null=True,
        blank=True,
    )

    face_encodings = ArrayField(
        ArrayField(
            models.FloatField()
        ),
        size=20,
        null=True,
        blank=True,
    )

    def __str__(self):
        image_url = self.image_upload.url if self.image_upload else None
        num_faces = len(self.face_locations) if self.face_locations else 0
        return '[id: {}, image_url: {}, num_faces: {}]'.format(
            self.id, image_url, num_faces
        )


class Album(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=50, blank=True)
    images = models.ManyToManyField(Image, blank=True, related_name="albums")
    cover_image = models.ForeignKey(
        Image, null=True, on_delete=models.SET_NULL, related_name='covered_albums')
