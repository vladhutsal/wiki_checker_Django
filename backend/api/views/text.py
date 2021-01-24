from rest_framework.decorators import api_view
from rest_framework.response import Response

from nlp import handle_keyphrases
from ..models import Text
from ..serializers import TextSerializer, KpSerializer


@api_view(['POST'])
def parse_text(request):
    obj = TextSerializer(data=request.data)
    if obj.is_valid(raise_exception=True):
        obj.save()
        serialized_kp_objects = handle_keyphrases(obj.data.get('text_content'))
        
        response = {
            'data': serialized_kp_objects,
            'msg': 'text saved, keyphrases saved/updated'
        }
        return Response(response, status=201)

    return Response({'msg': 'There was an error'}, status=400)
