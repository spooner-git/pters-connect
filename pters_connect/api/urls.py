from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.account.viewsets import MemberViewSet

from api.facility.viewsets import FacilityViewSet, SubjectViewSet

app_name = 'api'


router = DefaultRouter()

router.register('member', MemberViewSet, basename='member')
router.register('facility', FacilityViewSet, basename='facility')
router.register('subject', SubjectViewSet, basename='subject')
# router.register('devices', FCMDeviceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
