from django.db import models
from django.contrib.auth.models import User, Group, AbstractUser
from django.contrib.auth import get_user_model
# from django.contrib.postgres.fields import HStoreField


# Create your models here.

#USER MODEL
class CustomUser(AbstractUser):
    # pass
    progress = models.FloatField(default=1.0)
    def __str__(self):
        return self.username
    


# class Note(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
#     body = models.TextField()

#     def __str__(self):
#         return self.body

class Word(models.Model):
    word = models.CharField(max_length=40, null=True, unique = True)
    
    def __str__(self):
        return self.word
    
class Example(models.Model):
    example = models.TextField(max_length=200)
    word = models.ForeignKey(Word, on_delete=models.CASCADE, null = True)
    def __str__(self):
        return self.example

# EACH USER OWN MANY ENTRIES (same except progress to each entry) / (OR OTHER APPROACHES)
class Entry(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    example = models.ManyToManyField(Example)
    meaning = models.CharField(max_length=100)
    attribute = models.CharField(max_length=40)
    progress = models.FloatField(default=0.0)

    def __str__(self):
        return (self.word.word + ": " + self.meaning)

# USER SPECIFIC 
class Answer(models.Model):
    User = get_user_model()
   
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE, null=True)
    progressIncrement = models.FloatField(default= 0.0)

    def __str__(self):
        return (self.user.username + "/" + self.entry.meaning + "/" + str(self.progressIncrement))




