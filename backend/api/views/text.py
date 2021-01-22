from django.shortcuts import get_object_or_404
from rest_framework import serializers

from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers import TextSerializer, KpSerializer


@api_view(['POST'])
def add_text(request):
    obj = TextSerializer(data=request.data)
    if obj.is_valid(raise_exception=True):
        obj.save()
        response = {
            'data': obj.data,
            'msg': 'text saved'
        }
        return Response(response, status=201)

    return Response({'msg': 'There was an error'}, status=400)
