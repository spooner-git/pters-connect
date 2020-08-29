import logging
import datetime

from django.core import serializers
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.member.permissions import UserPermission
from api.member.serializers import MemberReadSerializer, MemberCreateSerializer, MemberUpdateSerializer, \
    SnsCreateSerializer
from api.viewset_mixins import DynamicSerializerMixin
from apps.member.models import MemberTb, SnsInfoTb

logger = logging.getLogger(__name__)


class MemberViewSet(DynamicSerializerMixin,
                    ModelViewSet):
    """
    회원 정보 관련 기능

    """
    permission_classes = [UserPermission]
    queryset = MemberTb.objects.filter().order_by('member_id')
    serializer_classes = {
        'read':  MemberReadSerializer,
        'create': MemberCreateSerializer,
        'update': MemberUpdateSerializer,
        # 'change_password': PasswordChangeSerializer,
        # 'inactivate': UserInactivateSerializer,
        # 'find_email': EmailFindSerializer,
        # 'find_password': PasswordFindSerializer,
    }
    filter_backends = [SearchFilter]
    search_fields = ['user__username', 'user__email', 'name']

    def get_object(self):
        if self.kwargs.get('pk') == 'me':
            member_instance = super().get_queryset().get(member_id=self.request.user.id)
            self.request.session['member'] = serializers.serialize('json', [member_instance])
            return member_instance
        return super().get_object()

    @action(methods=['post'], detail=True)
    def add_social_info(self, request, pk):
        member_info = get_object_or_404(self.get_queryset(), pk=pk)
        request_data = request.data.copy()
        request_data['member'] = member_info.member_id
        request_data['sns_connect_date'] = datetime.date.today()
        serializer = SnsCreateSerializer(data=request_data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response({"fail": serializer.errors}, status=400)

        return Response(serializer.data)


class FindMemberViewSet(DynamicSerializerMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    """
    회원 정보 관련 기능

    """
    permission_classes = [UserPermission]
    queryset = MemberTb.objects.filter().order_by('member_id')
    serializer_classes = {
        'read': MemberReadSerializer,
    }
    filter_backends = [SearchFilter]
    search_fields = ['user__username', 'user__email', 'name']
    lookup_field = 'user__username'

    def get_object(self):
        if self.kwargs.get('pk') == 'me':
            member_instance = super().get_queryset().get(member_id=self.request.user.id)
            self.request.session['member'] = serializers.serialize('json', [member_instance])
            return member_instance
        return super().get_object()
