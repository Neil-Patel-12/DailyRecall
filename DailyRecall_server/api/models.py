# models.py

from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class User_Post(models.Model):
    subject = models.CharField(max_length=255)  # What broad area was learned ('Math', 'Programming')
    topic = models.CharField(max_length=255)    # More specific ('Algebra', 'React.js')
    mastery = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    # A rating (from 1 to 5) that reflects how well they feel they understand the topic
    content = models.TextField()  # Optional: a more detailed explanation of what was learned
    
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_post")  # Link the post to a user
    date_posted = models.DateField(auto_now_add=True)  # Automatically store the date the post was made
    
    def __str__(self):
        return f"{self.author.username} - {self.subject} ({self.date_posted})"