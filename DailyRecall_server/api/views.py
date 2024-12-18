# views.py

from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import (
    CustomTokenObtainPairSerializer,
    UserSerializer,
    User_PostSerializer,
    TopicSerializer,
    PostByUserAndTopicSerializer,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User_Post, Topic
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
import logging
from api import serializers

from rest_framework.pagination import PageNumberPagination


# logger = logging.getLogger(__name__)


class User_PostListCreate(APIView):
    """
    Handles listing and creating User_Post instances without pagination.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Ensure the request has an authenticated user
        if not request.user.is_authenticated:
            return Response({"error": "Authentication required"}, status=403)

        # Retrieve all posts by the authenticated user
        queryset = User_Post.objects.filter(author=request.user).order_by('-date_posted')
        serializer = User_PostSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        # Create a new post for the authenticated user
        serializer = User_PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)  # Set the authenticated user as the author
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class AllPostsList(APIView):
    """
    Handles retrieving all posts created by all users without pagination.
    """
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        # Retrieve all posts, ordered by most recent
        queryset = User_Post.objects.all().order_by('-date_posted')
        serializer = User_PostSerializer(queryset, many=True)
        return Response(serializer.data)
    
class UserPostsById(APIView):
    """
    Retrieves all posts made by a specific user based on user ID.
    """
    permission_classes = [AllowAny]

    def get(self, request, user_id, *args, **kwargs):
        try:
            # Fetch all posts for the given user ID
            posts = User_Post.objects.filter(author_id=user_id).order_by('-date_posted')
            serializer = User_PostSerializer(posts, many=True)

            return Response({
                "results": serializer.data,
                "totalCount": posts.count(),
                "userId": user_id
            }, status=200)
        except User_Post.DoesNotExist:
            return Response({"error": "User not found or no posts available."}, status=404)
        

class TopicsByUserId(APIView):
    """
    Handles retrieving topics by a specific user ID.
    """
    permission_classes = [AllowAny]

    def get(self, request, user_id, *args, **kwargs):
        try:
            # Retrieve topics created by the user with the given user ID
            topics = Topic.objects.filter(author_id=user_id).order_by("name")
            serializer = TopicSerializer(topics, many=True)

            return Response(
                {
                    "results": serializer.data,
                    "totalCount": topics.count(),
                    "userId": user_id,
                },
                status=status.HTTP_200_OK,
            )
        except Topic.DoesNotExist:
            return Response(
                {"error": "No topics found for the given user ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        

class PostsByUserAndTopic(APIView):
    """
    Handles retrieving posts by a specific user ID and topic ID.
    """
    permission_classes = [AllowAny]

    def get(self, request, user_id, topic_id, *args, **kwargs):
        try:
            # Fetch posts by the given user ID and topic ID
            posts = User_Post.objects.filter(author_id=user_id, topic_id=topic_id).order_by('-date_posted')
            if not posts.exists():
                return Response({"error": "No posts found for the given user and topic."}, status=404)

            serializer = PostByUserAndTopicSerializer(posts, many=True)

            return Response(
                {
                    "results": serializer.data,
                    "totalCount": posts.count(),
                    "userId": user_id,
                    "topicId": topic_id,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
        

class CreateTopic(APIView):
    """
    Allows a user to create a topic.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")  # Extract user_id from URL
        data = request.data
        topic_name = data.get("name")
        subject = data.get("subject")

        # Validate user exists
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=404)

        # Validate input data
        if not topic_name or not subject:
            return Response({"error": "Topic name and subject are required."}, status=400)

        # Create and save the topic
        topic = Topic.objects.create(name=topic_name, subject=subject, author=user)
        return Response(
            {
                "id": topic.id,
                "name": topic.name,
                "subject": topic.subject,
                "author": topic.author.id,
            },
            status=201,
        )
    

class CreatePost(APIView):
    """
    Allows a user to create a post.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")  # Extract user_id from URL
        data = request.data
        title = data.get("title")
        content = data.get("content")
        confidence = data.get("confidence")
        topic_id = data.get("topic_id")

        # Validate user exists
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=404)

        # Validate topic exists
        try:
            topic = Topic.objects.get(id=topic_id)
        except Topic.DoesNotExist:
            return Response({"error": "Topic not found."}, status=404)

        # Validate input data
        if not title or not content or not confidence:
            return Response({"error": "Title, content, and confidence are required."}, status=400)

        if not (1 <= int(confidence) <= 10):
            return Response({"error": "Confidence must be between 1 and 10."}, status=400)

        # Create and save the post
        post = User_Post.objects.create(
            title=title,
            content=content,
            confidence=confidence,
            author=user,
            topic=topic,
        )
        return Response(
            {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "confidence": post.confidence,
                "author": post.author.id,
                "topic": post.topic.id,
                "date_posted": post.date_posted,
            },
            status=201,
        )
        
# user id, the subject, and topic name

# createtopicswithuserid





# this is for the profile page
# fetch topic by id

# this will be used to display in the front end for a specific users profile page
# get post by user id and topic id


# fetch all topics




# createpostwithuserid


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
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = Response(
            {"message": "Logged out successfully"}, status=status.HTTP_200_OK
        )
        response.delete_cookie("refreshToken")
        return response
