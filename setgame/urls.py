from django.conf.urls import patterns, url, include


from rest_framework import routers
from api.api_setviews import *
from views import *


router = routers.SimpleRouter()
router.register(r'game_script_api', Game_ScriptViewSet)
router.register(r'excuted_command_api', Excuted_CommandViewSet)
router.register(r'music_api', MusicViewSet)



urlpatterns = [
        url(r'', include(router.urls)),
]



# deploy page
urlpatterns += [
        url(r'^mainpage', mainpage),
        url(r'^test', test),
]
