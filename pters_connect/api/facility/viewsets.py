from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
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
    queryset = SubjectTb.objects.filter(use=USE).order_by('-subject_id')
    serializer_classes = {
        'read':  SubjectReadSerializer,
        'create': SubjectCreateSerializer,
        'update': SubjectUpdateSerializer,
    }
    filter_backends = [SearchFilter]
    search_fields = ['name', 'subject_tb__name']

    def perform_create(self, serializer):
        serializer.save(member_id=self.request.user.id)

    # @action(methods=['post'], detail=False)
    # def set_subject_to_trainer(self, *args, **kwargs):
    #     # serializer = self.get_serializer(data=request.data)
    #     # serializer.is_valid(raise_exception=True)
    #     kwargs = {'member', 'subject_tb', 'auth_cd', 'own_cd'}
    #
    #     return Response(status=HTTP_201_CREATED)

