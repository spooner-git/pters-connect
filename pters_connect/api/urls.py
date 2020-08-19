from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.account.viewsets import MemberViewSet

from api.facility.viewsets import FacilityViewSet

app_name = 'api'


router = DefaultRouter()

router.register('members', MemberViewSet, basename='members')
router.register('facilities', FacilityViewSet, basename='facilities')
# router.register('devices', FCMDeviceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
