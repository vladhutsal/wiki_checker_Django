from .nlp import get_kp
from rest_framework import serializers

from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers import TextSerializer, KpSerializer

@api_view(['POST'])
def add_text(request):
    obj = TextSerializer(data=request.data)
    if obj.is_valid(raise_exception=True):
        obj.save()
        kp = get_kp(obj.data.get('text_content'))
        response = {
            'data': kp,
            'msg': 'text saved'
        }
        return Response(response, status=201)

    return Response({'msg': 'There was an error'}, status=400)
