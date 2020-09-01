import logging

# from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.facility.permissions import IsFacilityUpdateOrReadOnly
from api.facility.serializers import FacilityReadSerializer, FacilityCreateSerializer, FacilityUpdateSerializer, \
    FacilityWithSubjectReadSerializer
from api.viewset_mixins import DynamicSerializerMixin
from apps.facility.models import FacilityTb, MemberFacilityTb
from configs.const import USE

logger = logging.getLogger(__name__)


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
        'with_subjects': FacilityWithSubjectReadSerializer,
    }
    filter_backends = [SearchFilter]
    search_fields = ['facility_id', 'name', 'address', 'main_type_cd']

    def perform_create(self, serializer):
        serializer.save(member_id=self.request.user.id)

    # url : facility/{pk}/with_subjects
    @action(detail=True, methods=['get'])
    def with_subjects(self, request, pk):
        facility_info = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer(facility_info)
        return Response(data=serializer.data)


# class FacilityTrainerViewSet(DynamicSerializerMixin,
#                              mixins.CreateModelMixin,
#                              mixins.RetrieveModelMixin,
#                              mixins.UpdateModelMixin,
#                              mixins.DestroyModelMixin,
#                              viewsets.GenericViewSet):
#     """
#     시설에 강사 추가
#
#     """
#     permission_classes = [IsFacilityUpdateOrReadOnly]
#     queryset = MemberFacilityTb.objects.filter(use=USE).order_by('-facility_id')
#     serializer_classes = {
#         'read': FacilityTrainerReadSerializer,
#         # 권한 관련 내용 추가 필요
#         'create': FacilityTrainerCreateSerializer,
#         'update': FacilityTrainerUpdateSerializer,
#     }
#     filter_backends = [SearchFilter]
#     search_fields = ['member__name', 'subject_tb__name']
