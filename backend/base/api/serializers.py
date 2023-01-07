from rest_framework.serializers import ModelSerializer

from base.models import *

class NoteSerializer(ModelSerializer):
    class Meta: 
        model = Note
        fields = '__all__'

class WordSerializer(ModelSerializer):
    class Meta: 
        model = Word
        fields = '__all__'

class MeaningSerializer(ModelSerializer):
    class Meta: 
        model = Meaning
        fields = '__all__'