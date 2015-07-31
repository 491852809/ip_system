from django.conf.urls import patterns, include, url
from django.conf import settings
from django.shortcuts import render

from rest_framework import status
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

    @list_route(methods=['post'])
    def login(self, request, pk=None):
        username = request.DATA["username"]
        password = request.DATA["password"]
        user_info = User.objects.filter(username=username, password=password, is_active=True)
        if user_info:
            return Response({"loginname":username})
        else:
            return Response({'result':'username not exists or password wrong'}, status=status.HTTP_404_NOT_FOUND)

    @list_route(methods=['post'])
    def register(self,request, *args, **kwargs):
        username, password = request.DATA['username'], request.DATA["password"]
        print username, password
        user_save = self.serializer_class(data={
                                    'username': username,
                                    'password': password,
                                    'is_active': False
                                    })
        if user_save.is_valid():
            user_save.save()
            return Response( {'result':username})
        else:
            return Response({'result':'no way to go'},status=status.HTTP_404_NOT_FOUND)


# User login part

from rest_framework.decorators import api_view
@api_view(['GET', 'POST'])
def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')

@api_view(['GET', 'POST'])
def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')



# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
from django.views.generic import TemplateView

urlpatterns = [

    url(r'^$', TemplateView.as_view(template_name="ip_info_main.html")),

    url(r'^', include(router.urls)),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^login', login),

    url(r'^register', register),
    #static
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': settings.STATIC_ROOT}),

    #media
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': settings.MEDIA_ROOT}),

    url(r'^setgame/', include('setgame.urls',
                            namespace='setgame')),

    url(r'^servers/', include('servers.urls',
                            namespace='servers')),

    url(r'^ipinfo/', include('ipinfo.urls',
                            namespace='ipinfo')),
]

