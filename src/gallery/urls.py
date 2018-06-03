from django.urls import path

from . import views

urlpatterns = [
    path('upload_url', views.upload_url, name='upload_url'),
    path('upload_file', views.upload_image_file, name='upload_file'),
    path('favorites', views.FavoritesList.as_view(), name='favorites'),
    path('images', views.ImagesList.as_view(), name='images'),
    path('images/<uuid:pk>',
         views.ImageDetails.as_view(), name='image_detail'),
    path('people', views.PeopleList.as_view(), name='people'),
    path('identity/<int:pk>',
         views.IdentityDetail.as_view(), name='identity_detail'),
    path('identity_match/<int:pk>/reject',
         views.reject_identity_match, name='reject_identity_match'),
    path('identity/<int:identity_id>/neighbours',
         views.NeighbourPeople.as_view(), name='identity_neighbours'),
    path('identity_match/<int:pk>',
         views.IdentityMatchDetail.as_view(), name='identity_match'),
    path('identity/<int:identity_id>/images',
         views.PersonList.as_view(), name='person'),
]
