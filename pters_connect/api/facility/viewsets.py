from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet

from api.facility.permissions import IsFacilityUpdateOrReadOnly, IsSubjectUpdateOrReadOnly
from api.facility.serializers import FacilityReadSerializer, FacilityCreateSerializer, FacilityUpdateSerializer, \
    SubjectReadSerializer, SubjectCreateSerializer, SubjectUpdateSerializer
from api.viewset_mixins import DynamicSerializerMixin
from apps.facility.models import FacilityTb, SubjectTb
from configs.const import USE


class FacilityViewSet(DynamicSerializerMixin,
                      ModelViewSet):
    """
    시설 정보 관련 기능

    """
    permission_classes = [IsFacilityUpdateOrReadOnly]
    queryset = FacilityTb.objects.filter(use=USE).order_by('-facility_id')
    serializer_classes = {
        'read':  FacilityReadSerializer,
        'create': FacilityCreateSerializer,
        'update': FacilityUpdateSerializer,
    }
    filter_backends = [SearchFilter]
    search_fields = ['name', 'address', 'facility_type_cd']

    def perform_create(self, serializer):
        serializer.save(member_id=self.request.user.id)


class SubjectViewSet(DynamicSerializerMixin,
                     ModelViewSet):
    """
    과목 정보 관련 기능

    """
    permission_classes = [IsSubjectUpdateOrReadOnly]
    queryset = SubjectTb.objects.filter(use=USE).order_by('-facility_id')
    serializer_classes = {
        'read':  SubjectReadSerializer,
        'create': SubjectCreateSerializer,
        'update': SubjectUpdateSerializer,
    }
    filter_backends = [SearchFilter]
    search_fields = ['name', 'facility_tb__name']

    def perform_create(self, serializer):
        serializer.save(member_id=self.request.user.id)
