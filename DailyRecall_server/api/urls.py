from django.urls import path
from . import views
from django.contrib.auth.views import LoginView


urlpatterns = [
    # List and Create
    path("posts/fetch/", views.User_PostListCreate.as_view(), name="post_list"),

    # Retrieve, Update, and Delete
    path("user_post/<int:pk>/", views.User_PostDetail.as_view(), name="user_post_detail"),

    # Fetch all posts created by all users with pagination
    path("posts/all/", views.AllPostsList.as_view(), name="all_posts"),

    path('posts/user/<int:user_id>/', views.UserPostsById.as_view(), name='user-posts'),

    # this doesnt work # path("user_post/delete/<int:pk>", views.User_PostDelete.as_view(), name="delete_post"),

    # Retrieve, Update, and Delete
    # DONT WORRY ABOUT THIS ONE
    path("user_post/<int:pk>/", views.User_PostDetail.as_view(), name="user_post_detail"),

    # There are still 3 more that need to be added here. 
    path("topics/user/<int:user_id>/", views.TopicsByUserId.as_view(), name="topics_by_user"),
]
