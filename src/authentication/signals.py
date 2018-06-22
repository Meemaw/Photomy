import logging

from django.db import models
from django.dispatch.dispatcher import receiver

from .models import User

logger = logging.getLogger(__name__)


@receiver(models.signals.post_save, sender=User)
def identify_image(sender, instance, *args, **kwargs):
    logger.info("User deleted")
