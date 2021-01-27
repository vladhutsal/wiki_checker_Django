from rest_framework.decorators import api_view
from rest_framework.response import Response

from nlp import handle_keyphrases
from .models import Text, Keyphrase
from .serializers import TextSerializer, KpSerializer


@api_view(['POST'])
def parse_text(request):
    obj = TextSerializer(data=request.data)
    kp_list = handle_keyphrases(request.data.get('text_content'))

    if obj.is_valid():
        obj_instance = obj.save()
        obj_instance.keyphrases.set(kp_list)
        msg = 'text saved, keyphrases saved/updated'
    else:
        msg = 'Text already exists'
        
    serialized = KpSerializer(kp_list, many=True)
    return Response({'data': serialized.data, 'msg': msg}, status=201)


@api_view(['GET'])
def get_all_kp(request):
    obj_qs = Keyphrase.objects.all()
    serialized = KpSerializer(obj_qs, many=True)
    return Response({'data': serialized.data}, status=201)


@api_view(['GET'])
def get_all_text(request):
    obj_qs = Text.objects.all()
    serialized = TextSerializer(obj_qs, many=True)
    return Response({'data': serialized.data}, status=200)
