from django.shortcuts import render, redirect
from rest_framework import generics, filters, status
from .serializers import UserSerializer
from django.views.generic.base import TemplateResponseMixin, TemplateView, View
from allauth.account.models import EmailAddress, EmailConfirmation, EmailConfirmationHMAC
from django.http import (
    Http404,
    HttpResponsePermanentRedirect,
    HttpResponseRedirect,
)
from django.conf import settings
from rest_framework.decorators import api_view


@api_view(['GET'])
def ok(request, pk):
    return Response(status=status.HTTP_204_NO_CONTENT)


class Me(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class ConfirmEmailView(TemplateResponseMixin, View):

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)

    def post(self, *args, **kwargs):
        confirmation = self.get_object()
        confirmation.confirm(self.request)
        return redirect(settings.EMAIL_CONFIRMATION_REDIRECT_URL)

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        emailconfirmation = EmailConfirmationHMAC.from_key(key)
        if not emailconfirmation:
            if queryset is None:
                queryset = self.get_queryset()
            try:
                emailconfirmation = queryset.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                raise Http404()
        return emailconfirmation

    def get_queryset(self):
        return EmailConfirmation.objects.all_valid().select_related("email_address__user")
