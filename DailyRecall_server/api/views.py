# views.py

from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import (
    CustomTokenObtainPairSerializer,
    UserSerializer,
    User_PostSerializer,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User_Post
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
import logging
from api import serializers


logger = logging.getLogger(__name__)


# List and create User Post, for listing and creating posts,
# that is why i am using ListCreateAPIView
# Users can see their own posts and create new ones.
class User_PostListCreate(generics.ListCreateAPIView):
    serializer_class = User_PostSerializer
    permission_classes = [
        IsAuthenticated
    ]  # cannot call this root, unless you are authenticata, and pass valid JWT token

    # need access to the request object
    def get_queryset(self):
        # Show only the posts of the logged-in user
        user = self.request.user
        return User_Post.objects.filter(author=user)

    def preform_create(self, serializer):
        # the serializer checks the data that was passes and tell us if its valid or not
        # serializer will check all the field arguments to see if its valid
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            logger.error(
                f"Failed to create post: {serializer.errors}"
            )  # preferred over print in production


# this is for Retrieve, Update, and Delete User Posts
class User_PostDetail(generics.DestroyAPIView):
    serializer_class = User_PostSerializer
    permission_classes = [IsAuthenticated]  # only authenticated users can access

    # you can only delete Posts that you own
    def get_queryset(self):
        # Restrict access to currently logged in user.
        user = self.request.user
        return User_Post.objects.filter(author=user)


# Handles user registration and returns JWT tokens if successful
class CreateUserView(generics.CreateAPIView):
    # This is a generic view that was built in from Django that,
    # will automatically handle creating a new user or new object for use.
    queryset = User.objects.all()
    # tells this view what kind of data we need to accept to make a new user (username, password)
    serializer_class = UserSerializer  # connecting out Auth routes
    permission_classes = [AllowAny]  # who is allowed to use this

    # Validate user data, create a new user, and return access & refresh tokens.
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            user_info = {
                "id": user.id,
                "firstName": user.first_name,
                "lastName": user.last_name,
                "email": user.email,
                "username": user.username,
            }

            response = Response(
                {
                    "message": "User registered successfully!",
                    "accessToken": str(access),
                    "userData": user_info,
                },
                status=status.HTTP_201_CREATED,
            )

            response.set_cookie(
                key="refreshToken",
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite="Lax",  # Restrict cross-site cookie sharing
            )
            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Handles user login and provides JWT token
class UserLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        refreshToken = data.get("refresh")
        accessToken = data.get("access")
        userInfo = data.get("userInfo")

        response = Response(
            {
                "accessToken": accessToken,
                "userInfo": userInfo,
            },
            status=status.HTTP_200_OK,
        )

        response.set_cookie(
            key="refreshToken",
            value=refreshToken,
            httponly=True,  # Prevent JavaScript access for security
            secure=True,  # Set to True in production (HTTPS)
            samesite="none",
            max_age=60 * 60 * 24 * 7,
        )

        return response


# Refreshes access token with valid refresh token
class RefreshTokenView(APIView):
    def post(self, request, *args, **kwargs):
        # Generate a new access token using the refresh token from cookies.
        refresh_token = request.COOKIES.get("refreshToken")
        if not refresh_token:
            return Response(
                {"error": "No refresh token found"}, status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
            return Response({"accessToken": access_token}, status=status.HTTP_200_OK)
        except Exception as e:  # log token errors for debugging
            logger.error(f"Refresh token error: {e}")
            return Response(
                {"error": "Invalid or expired refresh token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


# User LogOut : Removes refresh token cookie
class UserLogoutView(APIView):
    # Invalidate the refresh token by deleting the corresponding cookie.
    def post(self, request, *args, **kwargs):
        response = Response(
            {"message": "Logged out successfully"}, status=status.HTTP_200_OK
        )
        response.delete_cookie("refreshToken")
        return response
