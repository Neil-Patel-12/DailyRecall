# urls.py

"""
URL configuration for DailyRecall_server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, RefreshTokenView, UserLoginView, UserLogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/user/login/", UserLoginView.as_view(), name="login"),
    path("api/user/logout/", UserLogoutView.as_view(), name="logout"),
    path("api/user/refresh/", RefreshTokenView.as_view(), name='token_refresh'),
    
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
