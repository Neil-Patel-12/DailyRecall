# models.py

from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator

class Topic(models.Model):
    name = models.CharField(max_length=50, blank=False)
    SUBJECT_ITEMS = (
        ('m', 'Math'),
        ('s', 'Science'),
        ('a', 'Art'),
        ('h', 'History'),
        ('x', "Misc"),
    )
    subject = models.CharField(
        max_length=1,
        choices=SUBJECT_ITEMS,
        default='x',
        help_text="choices one subject")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="topics")
    
    def __str__(self):
        return f"{self.author.username} - {self.subject} - {self.name}"

# Create your models here.
class User_Post(models.Model):
    title = models.CharField(max_length=50, null=True, blank=False)
    confidence = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(10)])
    content = models.TextField()  # Optional: a more detailed explanation of what was learned

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post")
    date_posted = models.DateField(auto_now_add=True)

    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="post")

    def __str__(self):
        return f"{self.author.username} - {self.title} ({self.date_posted})"