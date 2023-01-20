from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

from base.models import *



class NoteSerializer(ModelSerializer):
    class Meta: 
        model = Note
        fields = '__all__'

class AnswerSerializer(ModelSerializer):
    class Meta: 
        model = Answer
        fields = '__all__'

class WordSerializer(ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'
        
class EntrySerializer(ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'

# class EntrySerializer(ModelSerializer):
#     examples = serializers.SlugRelatedField(
#         many=True, 
#         read_only=False,
#         slug_field="name"
#     )
   
#   class Meta:
#     model = Artist
#     fields = ('id', 'name', 'songs')

#     class Meta:
#         model = Entry
#         fields = '__all__'

class ExampleSerializer(ModelSerializer):
    class Meta:
        model = Example
        fields = '__all__'





UserModel = get_user_model()
class UserSerializer(ModelSerializer):

    password = serializers.CharField(write_only=True,required = True)

    def create(self, validated_data):

        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        user.is_verified = True
        user.is_active = True
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ( "id", "username", "password", )

