from django.urls import path
from . import views
from django.contrib.auth.views import LoginView


urlpatterns = [
    # List and Create
    path("user_post/", views.User_PostListCreate.as_view(), name="post_list"),
    # Retrieve, Update, and Delete
    path(
        "user_post/<int:pk>/", views.User_PostDetail.as_view(), name="user_post_detail"
    ),
    # this doesnt work # path("user_post/delete/<int:pk>", views.User_PostDelete.as_view(), name="delete_post"),
]
