from django.shortcuts import render


from rest_framework import generics,permissions,renderers
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser,FileUploadParser

from api.models import *
from api.serializers import *
from django.contrib.auth import authenticate

# for raw sql
from django.db import connections
# Create your views here.
import os,ast,base64

# My scripts
import sys
import json
sys.path.insert(0, 'dj_pro/scripts')
from lyingdragon_script import *
from pythonssh import *

# deploy page function

from rest_framework.decorators import api_view
@api_view(['GET', 'POST'])
def mainpage(request):
    if request.method == 'GET':
        return render(request, 'setgame.html')

@api_view(['GET', 'POST'])
def test(request):
    if request.method == 'GET':
        return render(request, 'test.html')

