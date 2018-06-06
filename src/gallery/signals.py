from django.db import models
from django.dispatch.dispatcher import receiver
from identifier.tasks import idify_image

from .models import Image


@receiver(models.signals.pre_delete, sender=Image)
def delete_file(sender, instance, *args, **kwargs):
    if instance.image_upload:
        instance.image_upload.delete()
    if instance.lqip_upload:
        instance.lqip_upload.delete()


@receiver(models.signals.post_save, sender=Image)
def identify_image(sender, instance, *args, **kwargs):
    if instance.face_encodings == None:
        image_id = instance.id
        idify_image.delay(image_id)
