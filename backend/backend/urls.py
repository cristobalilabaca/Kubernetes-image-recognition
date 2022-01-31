from django.urls import include, path
from rest_framework import routers
from backend.quickstart import views
from images.views import ImageList
# from images.views import Image_list
# from images.views import ImageViewset

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
# router.register(r'image', ImageViewset)


urlpatterns = [
    path('', include(router.urls)),
    # path('image/', Image_list),
    path('image/', ImageList.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
