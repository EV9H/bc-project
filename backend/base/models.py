from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    body = models.TextField()

    def __str__(self):
        return self.body

# class Word(models.Model):
#     name = models.CharField(max_length=20, null=True)
    
#     def __str__(self):
#         return self.name


# class Meaning(models.Model):
    
#     ATTRIBUTE = (
#         ("n", "名词"),
#         ("adj", "形容词"),
#         ("v", "动词"),
#         ("adv","副词"),
#         ("measure","量词"),
#         ("prep", "介词"),
#         ("compound", "复合词"),
#         ("count", "数词"),
#         ("reduplication","叠词"),
#     )
#     name = models.CharField(max_length=40, null=True)
#     example = models.CharField(max_length=100, null=True)
#     attribute = models.CharField(max_length=40, choices=ATTRIBUTE, null=True)
#     word = models.ForeignKey(Word, on_delete=models.CASCADE, null=True)
#     pronounciation = models.CharField(max_length=100, null=True)

#     def __str__(self):
#         return self.name


# NEW DATABASE

class Word(models.Model):
    word = models.CharField(max_length=40, null=True, unique = True)
    
    def __str__(self):
        return self.word
    
class Example(models.Model):
    example = models.TextField(max_length=200)
    word = models.ForeignKey(Word, on_delete=models.CASCADE, null = True)
    def __str__(self):
        return self.example

# EACH USER OWN MANY ENTRIES (same except progress to each entry)
class Entry(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    example = models.ManyToManyField(Example)
    meaning = models.CharField(max_length=100)
    attribute = models.CharField(max_length=40)
    progress = models.FloatField(default=0.0)

    def __str__(self):
        return (self.word.word + ": " + self.meaning)

# USER SPECIFIC 
class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    user_base = models.ManyToManyField(Entry)


# class Word(models.Model):
#     name = models.CharField(max_length=40)

#     def __str__(self):
#         return self.name

# class Attribute(models.Model):
#     name = models.CharField(max_length=40)
#     def __str__(self):
#         return self.name

# class Meaning(models.Model):
#     meaning = models.CharField(max_length=100)
#     word = models.ForeignKey(Word, on_delete=models.CASCADE)
#     attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.meaning

# class Example(models.Model):
#     example = models.CharField(max_length=200)
#     meaning = models.ForeignKey(Meaning, on_delete=models.CASCADE)
#     word = models.ForeignKey(Word,on_delete=models.CASCADE)

#     def __str__(self):
#         return self.example