from rest_framework import serializers
from .models import Text, Keyphrase


class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ('id', 'text_content')


class KpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyphrase
        fields = (
            'id', 
            'kp_content',
            'score',
            'wiki_link',
            'disambiguation'
        )
