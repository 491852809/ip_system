from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser,FileUploadParser

from rest_framework.decorators import detail_route, list_route

from .models import *
from .serializers import *


class Game_ScriptViewSet(viewsets.ModelViewSet):

    serializer_class = Game_ScriptSerializer
    queryset = Game_Script.objects.all()


class Excuted_CommandViewSet(viewsets.ModelViewSet):

    serializer_class = Excuted_CommandSerializer
    queryset = Excuted_Command.objects.all()

    @list_route(methods=['get'])
    def deploy(self, request, pk=None):
        return Response('11')


class MusicViewSet(viewsets.ModelViewSet):

    serializer_class = MusicSerializer
    queryset = Music.objects.all()
    parser_classes = (MultiPartParser,FormParser,)
