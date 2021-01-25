from rest_framework.decorators import api_view
from rest_framework.response import Response

from nlp import handle_keyphrases
from .models import Text, Keyphrase
from .serializers import TextSerializer, KpSerializer


@api_view(['POST'])
def parse_text(request):
    try:
        obj = TextSerializer(data=request.data)

        if obj.is_valid():
            obj.save()
            msg = 'text saved, keyphrases saved/updated'
        else:
            msg = 'Text already exists'

        serialized_kp_objects = handle_keyphrases(obj.data.get('text_content'))
        return Response({'data': serialized_kp_objects, 'msg': msg}, status=201)
    except:
        return Response({'msg': 'Server error'}, status=500)

    


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
