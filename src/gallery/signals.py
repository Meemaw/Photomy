import logging

from django.db import models
from django.dispatch.dispatcher import receiver

from identifier.tasks import idify_image
from .models import Image
from .constants import ProcessingStatus

logger = logging.getLogger(__name__)


@receiver(models.signals.pre_delete, sender=Image)
def delete_file(sender, instance, *args, **kwargs):
    logger.info("delete_image")
    if instance.image_upload:
        instance.image_upload.delete()
    if instance.lqip_upload:
        instance.lqip_upload.delete()


@receiver(models.signals.post_save, sender=Image)
def identify_image(sender, instance, *args, **kwargs):
    if instance.processing_status == ProcessingStatus.INITIAL and not instance.processing_status == ProcessingStatus.USER_DISABLED:
        image_id = instance.id
        Image.objects.filter(id=image_id).update(
            processing_status=ProcessingStatus.IN_QUEUE)
        idify_image.delay(image_id)
