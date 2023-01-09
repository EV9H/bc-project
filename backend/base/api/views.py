from django.http import JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User

from .serializers import *
from base.models import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def updateVocab(request):
    # def insert_or_create_word(insertedStr):
    #     w, created = Word.objects.get_or_create(
    #         word=insertedStr
    #     )
    #     return w

    # def insert_or_create_example(insertedStr, word):
    #     eg, created = Example.objects.get_or_create(
    #         example = insertedStr,
    #         word = word
    #     )
    #     return eg

    # def insert_or_create_entry(word, example, meaning, attribute):
    #     new_entry, created = Entry.objects.get_or_create(
    #         word = word, 
    #         meaning = meaning,
    #         attribute = attribute
    #     )
    #     new_entry.example.add(example)

    #     return new_entry
    
    def insert_line(str_word, str_example, str_meaning, str_attribute):
        w, created = Word.objects.get_or_create(
            word=str_word
        )
        eg, created = Example.objects.get_or_create(
            example = str_example,
            word = w
        )
        new_entry, created = Entry.objects.get_or_create(
            word = w, 
            meaning = str_meaning,
            attribute = str_attribute
        )
        new_entry.example.add(eg)
        return new_entry
    e = insert_line("树", "两棵树","木头","名词")
    e2 = insert_line("牛", "非常牛的","厉害","形容词")
    e3 = insert_line("牛", "非常牛的第二个例子","厉害","形容词")
    # word_to_create = "十"
    # example_to_create = "十有八九"
    # w  = insert_or_create_word(word_to_create)
    # eg  = insert_or_create_example(example_to_create,w)
    # entry = insert_or_create_entry(w, eg,"10","数词")
    return Response((e.word.word))



@api_view(['GET'])
def getAllEntry(request):
    # user = request.user
    entries = Entry.objects.all()
    # print(request)
    serializer = EntrySerializer(entries, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getExample(request):
    id = request.example_id
    example = Example.objects.get(pk=id)
    # print(request)
    serializer = ExampleSerializer(example)
    return Response(serializer.data)

@api_view(['GET'])
def getWordID(request):
    words = Word.objects.all()
    # print(request)
    serializer = WordSerializer(words, many= True)
    return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer