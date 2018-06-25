from django.urls import path

from . import views

urlpatterns = [
    path('upload_url', views.upload_url, name='upload_url'),
    path('upload_file', views.upload_image_file, name='upload_file'),
    path('favorites', views.FavoritesList.as_view(), name='favorites'),
    path('albums', views.AlbumListView.as_view(), name='albums'),
    path('albums/<uuid:pk>', views.AlbumDetailView.as_view(), name='album_detail'),
    path('albums/<uuid:album_id>/addImage/<uuid:image_id>',
         views.add_image_to_album, name='add_image_to_album'),
    path('albums/<uuid:album_id>/removeImage/<uuid:image_id>',
         views.remove_image_from_album, name='remove_image_from_album'),
    path('albums/<uuid:album_id>/setCoverImage/<uuid:image_id>',
         views.set_album_cover_image, name='set_album_cover_image'),
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
    path('identity_match/merge_identities/<int:base_identity_id>/<int:join_identity_id>', views.merge_identities,
         name='merge_identities'),
    path("identity", views.IdentityList.as_view(), name='identity_list'),
    path("identity/<int:identity_id>/representatives",
         views.get_representatives, name='representatives')
]
