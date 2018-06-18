import uuid

from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator
from django.db import models


class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image_upload = models.FileField()
    lqip_upload = models.FileField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    favorite = models.BooleanField(default=False)
    width = models.IntegerField()
    height = models.IntegerField()

    rejected_identities = ArrayField(
        models.IntegerField(), null=True, blank=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
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
    images = models.ManyToManyField(Image, blank=True)
