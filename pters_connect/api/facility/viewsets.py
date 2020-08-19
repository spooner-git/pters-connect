from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet

from api.facility.permissions import IsFacilityUpdateOrReadOnly
from api.facility.serializers import FacilityReadSerializer, FacilityCreateSerializer, FacilityUpdateSerializer
from api.viewset_mixins import DynamicSerializerMixin
from apps.facility.models import FacilityTb
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
