from django.urls import path
from . import views

urlpatterns = [
    path("user_post/", views.User_PostListCreate.as_view(), name="post_list"),
    path("user_post/delete/<int:pk>", views.User_PostDelete.as_view(), name="delete_post"),
]