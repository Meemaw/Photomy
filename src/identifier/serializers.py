from rest_framework import serializers

from .models import IdentityGroup, ImageIdentityMatch
from gallery.models import Image


class IdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = IdentityGroup
        fields = ('__all__')


class IdentityGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdentityGroup
        fields = ('__all__')


class ImageIdentityMatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImageIdentityMatch
        fields = ('__all__')

    def to_representation(self, obj):
        image_url = obj.image_id.image_upload.url if obj.image_id.image_upload else None
        preview_location = obj.image_id.lqip_upload.url if obj.image_id.lqip_upload else None
        return {"image_url": image_url,
                "preview_url": preview_location,
                "image_identity": obj.identity_group_id.identity,
                "identity_group_id": obj.identity_group_id.id,
                "image_id": obj.image_id.id,
                "identity_match_id": obj.id,
                "confirmed": obj.confirmed,
                "face_index": obj.face_index,
                "width": obj.image_id.width,
                "height": obj.image_id.height,
                "uploaded_at": obj.image_id.uploaded_at,
                "favorite": obj.image_id.favorite
                }
