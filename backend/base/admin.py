from django.contrib import admin

# Register your models here.


from .models import *
admin.site.register(Word)
admin.site.register(Example)
admin.site.register(Entry)
admin.site.register(Answer)
admin.site.register(Profile)

