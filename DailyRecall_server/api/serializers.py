# serializers.py

from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User_Post, Topic

# we are going to create a serializer
# django users uses ORM
# from our API, we will be accepting JSON data


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source="first_name")
    lastName = serializers.CharField(source="last_name")
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "firstName", "lastName"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def create(self, validated_data):
        first_name = validated_data.pop("first_name")
        last_name = validated_data.pop("last_name")
        user = User.objects.create_user(
            first_name=first_name, last_name=last_name, **validated_data
        )
        return user

# these 4 were added
class TopicSerializer(serializers.ModelSerializer):
    name_of_topic = serializers.CharField(source="name")
    subject = serializers.CharField()

    class Meta:
        model = Topic
        fields = ["id", "name_of_topic", "subject"]


class PostByUserAndTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Post
        fields = ["title", "confidence"]


class CreateTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ["name", "subject"]
        extra_kwargs = {
            "name": {"required": True},
            "subject": {"required": True},
        }


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Post
        fields = ["title", "content", "confidence", "topic"]
        extra_kwargs = {
            "title": {"required": True},
            "content": {"required": True},
            "confidence": {"required": True},
            "topic": {"required": True},
        }

# when our model is create, we need to create a serializer for this model
# because remember, this is an api. And we need to be able to convert this into JSON
# data, so that we can recieve it, and return it.


class User_PostSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="author.first_name", read_only=True)
    last_name = serializers.CharField(source="author.last_name", read_only=True)
    subject = serializers.CharField(source="topic.subject", read_only=True)

    class Meta:
        model = User_Post
        fields = [
            "first_name",  # Include the user's first name
            "last_name",  # Include the user's last name
            "subject",
            "id",
            "title",
            "confidence",
            "content",
            "author",
            "date_posted",
            "topic",
        ]
        extra_kwargs = {"author": {"read_only": True}}


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"

    def validate(self, attrs):
        data = super().validate(attrs)
        data["userInfo"] = {
            "id": self.user.id,
            "firstName": self.user.first_name,
            "lastName": self.user.last_name,
            "email": self.user.email,
            "username": self.user.username,
        }
        return data
