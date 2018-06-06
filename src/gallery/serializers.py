from rest_framework import serializers

from .models import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('__all__')

    def to_representation(self, obj):
        image_location = obj.image_upload.url if obj.image_upload else None
        preview_location = obj.lqip_upload.url if obj.lqip_upload else None

        return {"image_url": image_location,
                "image_id": obj.id,
                "uploaded_at": obj.uploaded_at,
                "width": obj.width,
                "height": obj.height,
                "favorite": obj.favorite,
                "preview_url": preview_location
                }
