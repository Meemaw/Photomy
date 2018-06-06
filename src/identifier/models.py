from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator
from django.db import models

from gallery.models import Image


class IdentityGroup(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    identity = models.CharField(
        max_length=30, blank=True, null=True, default=None)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return '[id: {}, identity: {}]'.format(self.id, self.identity)


class ImageIdentityMatch(models.Model):
    image_id = models.ForeignKey(
        Image, on_delete=models.CASCADE, related_name='image_matches')
    identity_group_id = models.ForeignKey(
        IdentityGroup, on_delete=models.CASCADE, related_name='identity_group')
    face_index = models.IntegerField(validators=[MinValueValidator(0)])
    matched_at = models.DateTimeField(auto_now_add=True)
    confirmed = models.BooleanField(default=True)
    match_confidence = models.FloatField(default=1.0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    rejected_identities = ArrayField(
        models.IntegerField(), null=True, blank=True)

    def __str__(self):
        return '[image_id: {}, identity_group_id: {}, face_index: {}]'.format(
            self.image_id, self.identity_group_id, self.face_index
        )

    def __repr__(self):
        return self.__str__()
