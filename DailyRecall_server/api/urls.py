# DEPRECTATED

from django.urls import path
from . import views
from django.contrib.auth.views import LoginView


urlpatterns = [
    path("user_post/", views.User_PostListCreate.as_view(), name="post_list"),
    path("user_post/delete/<int:pk>", views.User_PostDelete.as_view(), name="delete_post"),
    path('login/', LoginView.as_view(template_name='login.html'), name='login'),    # may be relocated to /api path
]
