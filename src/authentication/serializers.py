from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, exceptions

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)

        if not user:
            msg = _('Your email or password was entered incorrectly.')
            raise exceptions.ValidationError(msg)

        email_address = user.emailaddress_set.get(email=user.email)
        if not email_address.verified:
            raise serializers.ValidationError(_('E-mail is not verified.'))

        attrs['user'] = user
        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')

    def to_representation(self, instance):
        avatar = instance.avatar.image_upload.url if instance.avatar else None
        return {"id": instance.id, "email": instance.email, "avatar": avatar, "first_name": instance.first_name,
                "last_name": instance.last_name, "username": instance.username}
