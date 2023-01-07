from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    body = models.TextField()

    def __str__(self):
        return self.name

class Word(models.Model):
    name = models.CharField(max_length=20, null=True)
    
    def __str__(self):
        return self.name


class Meaning(models.Model):
    
    ATTRIBUTE = (
        ("n", "名词"),
        ("adj", "形容词"),
        ("v", "动词"),
        ("adv","副词"),
        ("measure","量词"),
        ("prep", "介词"),
        ("compound", "复合词"),
        ("count", "数词"),
        ("reduplication","叠词"),
    )
    name = models.CharField(max_length=40, null=True)
    example = models.CharField(max_length=100, null=True)
    attribute = models.CharField(max_length=40, choices=ATTRIBUTE, null=True)
    word = models.ForeignKey(Word, on_delete=models.CASCADE, null=True)
    pronounciation = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name

