import logging

from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.subject.permissions import IsSubjectUpdateOrReadOnly
from api.subject.serializers import SubjectReadSerializer, SubjectCreateSerializer, SubjectUpdateSerializer, \
    SubjectTrainerCreateSerializer, SubjectTrainerReadSerializer, SubjectTrainerUpdateSerializer, \
    SubjectWithSubTrainerReadSerializer
from api.viewset_mixins import DynamicSerializerMixin
from apps.subject.models import SubjectTb, MemberSubjectTb
from configs.const import USE

logger = logging.getLogger(__name__)


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
    search_fields = ['subject_id', 'name', 'facility_tb__name']

    def perform_create(self, serializer):
        serializer.save(member_id=self.request.user.id)

    @action(detail=True, methods=['get'])
    def with_sub_trainer(self, request, pk):
        subject_info = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = SubjectWithSubTrainerReadSerializer(subject_info)
        return Response(data=serializer.data)


class SubjectTrainerViewSet(DynamicSerializerMixin,
                            mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):
    """
    과목 정보 관련 기능

    """
    permission_classes = [IsSubjectUpdateOrReadOnly]
    queryset = MemberSubjectTb.objects.filter(use=USE).order_by('-subject_id')
    serializer_classes = {
        'read': SubjectTrainerReadSerializer,
        'create': SubjectTrainerCreateSerializer,
        'update': SubjectTrainerUpdateSerializer,
    }
    filter_backends = [SearchFilter]
    search_fields = ['member__name', 'subject_tb__name']
    # lookup_fields = ['member', 'subject_tb', 'auth_cd', 'own_cd', 'mod_member']

    # def perform_create(self, serializer):
    #     serializer.save(member_id=self.request.user.id)

