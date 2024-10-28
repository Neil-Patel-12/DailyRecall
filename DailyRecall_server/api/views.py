from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, User_PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User_Post

# Write views for creating user_post and deleting user_post
class User_PostListCreate(generics.ListCreateAPIView):
    serializer_class = User_PostSerializer
    permission_classes = [IsAuthenticated] # cannot call this root, unless you are authenticata, and pass valid JWT token

    # need access to the request object
    def get_queryset(self):
        user = self.request.user
        return User_Post.objects.filter(author=user)
    
    def preform_create(self, serializer):
        # the serializer checks the data that was passes and tell us if its valid or not
        # serializer will check all the field arguments to see if its valid
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class User_PostDelete(generics.DestroyAPIView):
    serializer_class = User_PostSerializer
    permission_classes = [IsAuthenticated]

    # you can only delete Posts that you own
    def get_queryset(self):
        user = self.request.user
        return User_Post.objects.filter(author=user)

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    # This is a generic view that was built in from Django that,
    # will automatically handle creating a new user or new object for use.
    queryset = User.objects.all()
    # tells this view what kind of data we need to accept to make a new user (username, password)
    serializer_class = UserSerializer # connecting out Auth routes
    permission_classes = [AllowAny] # who is allowd to use this
