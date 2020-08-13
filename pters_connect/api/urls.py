from django.conf.urls import url
from django.urls import path, include
from rest_framework import renderers, permissions
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from api.account.viewsets import MemberViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

app_name = 'api'

schema_view = get_schema_view(
   openapi.Info(
      title="Lesson Go! REST API",
      default_version='v1',
      description="api 페이지",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="hkkim@spooner.co.kr"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
   url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

router = DefaultRouter()

router.register('members', MemberViewSet, basename='member')
# router.register('devices', FCMDeviceViewSet)

urlpatterns += [
    path('members/', include('api.account.urls')),
    path('', include(router.urls)),
]
