from django.contrib import admin

# Register your models here.


from .models import *
admin.site.register(Word)
admin.site.register(Example)
admin.site.register(Entry)


admin.site.register(Student)
admin.site.register(ClassGroup)
admin.site.register(StudentProgress)
admin.site.register(Profile)

