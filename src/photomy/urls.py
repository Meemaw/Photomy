from django.contrib import admin
from django.urls import include, path
from django.contrib.auth.views import PasswordResetConfirmView
from authentication.views import ConfirmEmailView, ok


urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/account-confirm-email/<str:key>/',
         ConfirmEmailView.as_view(), name="account_confirm_email"),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('gallery/', include('gallery.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('authentication.urls')),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),

    path('account/verification_sent/', ok,
         name='account_email_verification_sent'),
]

urlpatterns += [path('silk/', include('silk.urls', namespace='silk'))]
