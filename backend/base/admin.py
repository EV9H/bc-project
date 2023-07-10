from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# Register your models here.

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import *

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ["email", "username",]

admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(Word)
admin.site.register(Example)
admin.site.register(Entry)
admin.site.register(Answer)