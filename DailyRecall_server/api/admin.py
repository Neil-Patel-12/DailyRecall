from django.contrib import admin

# # Register your models here.
from .models import User_Post, Topic

# admin.site.register(User_Post)
# admin.site.register(Topic)


@admin.register(User_Post)
class User_PostAdmin(admin.ModelAdmin):
    list_display = ("author", "title", "topic", "confidence")
    list_filter = ("topic", "author")


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ("subject", "name", "author")
    list_filter = ("subject", "author")
