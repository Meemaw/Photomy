import json
from enum import Enum
from rest_framework import serializers

from .models import Image, Album


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
                "preview_url": preview_location,
                "taken_on": obj.taken_on,
                "processing_status": str(obj.processing_status),
                "location": obj.location,
                "description": obj.description,
                "taken_on": obj.taken_on,
                "albums": ImageAlbumsSerializer(obj.albums, many=True).data
                }


class AlbumSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ('__all__')


class AlbumsSerializer(serializers.Serializer):
    class Meta:
        model = Album
        fields = ('__all__')

    def to_representation(self, instance):
        images = instance.images.all().order_by('-uploaded_at')[:4]
        images_data = ImageSerializer(images, many=True).data
        cover_image_url = instance.cover_image.image_upload.url if instance.cover_image else ""
        return {"images_count": instance.images_count, "name": instance.name, "id": instance.id,
                "uploaded_at": instance.uploaded_at, "images": images_data, "cover_image_url": cover_image_url}


class ImageAlbumsSerializer(serializers.Serializer):
    class Meta:
        model = Album
        fields = ('__all__')

    def to_representation(self, instance):
        cover_image_url = instance.cover_image.image_upload.url if instance.cover_image else ""
        return {"name": instance.name, "id": instance.id, "uploaded_at": instance.uploaded_at, "images_count": instance.images.count(), "cover_image_url": cover_image_url}
