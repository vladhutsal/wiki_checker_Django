from nlp import handle_keywords
from rest_framework import serializers

from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers import TextSerializer, KpSerializer


@api_view(['POST'])
def parse_text(request):
    obj = TextSerializer(data=request.data)
    if obj.is_valid(raise_exception=True):
        obj.save()
        saved = handle_keywords(obj.data.get('text_content'))
        print(saved.get('saved'))
        
        response = {
            'data': saved.get('kp'),
            'msg': 'text saved'
        }
        return Response(response, status=201)

    return Response({'msg': 'There was an error'}, status=400)
