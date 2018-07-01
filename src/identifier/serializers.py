from rest_framework import serializers

from .models import IdentityGroup, ImageIdentityMatch
from gallery.serializers import  ImageSerializer


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
        data = {"image_identity": obj.identity_group_id.identity,
                "identity_group_id": obj.identity_group_id.id,
                "identity_match_id": obj.id,
                "confirmed": obj.confirmed,
                "face_index": obj.face_index,
                **ImageSerializer(obj.image_id).data
                }
        return data



