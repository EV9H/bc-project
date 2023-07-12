from django.db import models
from django.contrib.auth.models import User, Group

# from django.contrib.postgres.fields import HStoreField


# Create your models here.

# class Note(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
#     body = models.TextField()

#     def __str__(self):
#         return self.body

# class Progress(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    # progress = HStoreField(default = dict)




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
# class UserProgress(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
#     user_base = models.ManyToManyField(Entry)

class StudentProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE, null=True)
    progress = models.FloatField(default= 0.0)

    def __str__(self):
        return (self.user.username + "/" + self.entry.meaning + "/" + str(self.progress))


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




#########################################################################

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, null = True, blank=True)
    name = models.TextField(max_length=64, null = True, blank=True)
    year = models.IntegerField(null=True,blank=True)
    staff = models.BooleanField(default=True)
    # profile_pic = models.ImageField(upload_to='profile_pics', blank=True)

    # def __str__(self):
    #     return (self.name)
    @property
    def owner(self):
        return self.user




class ClassGroup(models.Model):
    admin = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank = True)    
    name = models.TextField(blank = True,null = True)
    description = models.TextField(blank=True, null= True)
    password = models.TextField(null = True, blank= True)



    def __str__(self):
        return (self.description)
    
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    classGroup = models.ForeignKey(ClassGroup, on_delete= models.DO_NOTHING)
    
        
    @property
    def owner(self):
        return self.user

class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @property
    def owner(self):
        return self.user
