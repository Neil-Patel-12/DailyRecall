from django.contrib import admin

# Register your models here.
from .models import User_Post


# admin.site.register(User_Post)

@admin.register(User_Post)
class User_PostAdmin(admin.ModelAdmin):
    list_display = ('subject', 'topic', 'author', 'mastery')
    list_filter = ('subject', 'topic')