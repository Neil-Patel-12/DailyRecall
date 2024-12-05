# serializers.py

from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User_Post

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


# when our model is create, we need to create a serializer for this model
# because remember, this is an api. And we need to be able to convert this into JSON
# data, so that we can recieve it, and return it.


class User_PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Post
        fields = [
            "id",
            "subject",
            "topic",
            "mastery",
            "content",
            "author",
            "date_posted",
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
