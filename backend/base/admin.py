from django.contrib import admin

# Register your models here.


from .models import *
admin.site.register(Note)
admin.site.register(Word)
admin.site.register(Example)
admin.site.register(Entry)