from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Keyphrase
from ..serializers import KpSerializer


@api_view(['GET'])
def get_all(request):
    obj_qs = Keyphrase.objects.all()
    serialized = KpSerializer(obj_qs, many=True)
    return Response({'data': serialized.data}, status=201)
