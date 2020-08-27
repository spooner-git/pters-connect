from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.facility.permissions import IsFacilityUpdateOrReadOnly
from api.facility.serializers import FacilityReadSerializer, FacilityCreateSerializer, FacilityUpdateSerializer, \
    FacilityWithSubjectReadSerializer
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
    search_fields = ['facility_id', 'name', 'address', 'facility_type_cd']

    def perform_create(self, serializer):
        serializer.save(member_id=self.request.user.id)

    # url : facility/{pk}/with_subjects
    @action(detail=True, methods=['get'])
    def with_subjects(self, request, pk):
        facility_info = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = FacilityWithSubjectReadSerializer(facility_info)
        return Response(data=serializer.data)
