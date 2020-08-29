from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter

from api.member import views
from api.member.viewsets import MemberViewSet, FindMemberViewSet
from api.facility.viewsets import FacilityViewSet
from api.subject.viewsets import SubjectViewSet, SubjectTrainerViewSet

app_name = 'api'


router = DefaultRouter()
# super().__init__()
# router = SimpleRouter(trailing_slash=True)
router.register(r'member', MemberViewSet, basename='member')
router.register(r'find_member', FindMemberViewSet, basename='find_member')
router.register(r'facility', FacilityViewSet, basename='facility')
router.register(r'subject', SubjectViewSet, basename='subject')
# 권한 관련 내용 추가 필요
router.register(r'subject_trainer', SubjectTrainerViewSet, basename='subject_trainer')
# router.register('devices', FCMDeviceViewSet)

urlpatterns = [
    # FBV
    # path('sms_auth/', views.SmsAuthAPIView.as_view()),
    # path('sms_auth_check/', views.SmsAuthCheckAPIView.as_view()),
    path('', include(router.urls)),
]
