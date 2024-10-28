from django.contrib.auth.models import User
from rest_framework import serializers
from .models import User_Post

# we are going to create a serializer
# django users uses ORM
# from out API, we will be accepting JSON data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# when our model is create, we need to create a serializer for this model
# because remember, this is an api. And we need to be able to convert this into JSON
# data, so that we can recieve it, and return it.

class User_PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Post
        fields = ["id", "subject", "topic", "mastery", "content", "author", "date_posted"]
        extra_kwargs = {"author": {"read_only": True}}