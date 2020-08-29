import logging
import datetime
import random

from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.utils import timezone
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.member.permissions import UserPermission
from api.member.serializers import MemberReadSerializer, MemberCreateSerializer, MemberUpdateSerializer, \
    SnsCreateSerializer, SmsValidateSerializer, SmsAuthCreateSerializer
from api.viewset_mixins import DynamicSerializerMixin
from apps.member.models import MemberTb, SnsInfoTb, SmsAuthTb
from configs import settings

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
        'add_social_info': SnsCreateSerializer,
        'get_sms_auth_number': SmsAuthCreateSerializer,
        'validate_sms_auth_number': SmsValidateSerializer
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
        serializer = self.get_serializer(data=request_data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response(serializer.data)

    @action(methods=['post'], detail=False)
    def get_sms_auth_number(self, request):
        serializer = self.get_serializer(data=request.data)
        error = None
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        if error is not None:
            return Response({"fail": error}, status=400)

        return Response(serializer.data)

    @action(methods=['post'], detail=False)
    def validate_sms_auth_number(self, request):
        error = None
        try:
            sms_auth_info = SmsAuthTb.objects.filter(phone_number=request.data['phone_number']).latest('id')
        except ObjectDoesNotExist:
            raise Http404

        if str(sms_auth_info.auth_number) == str(request.data['auth_number']):
            time_interval = (timezone.now() - sms_auth_info.reg_dt).total_seconds()

            if int(time_interval) < int(settings.SMS_ACTIVATION_SECONDS):
                sms_auth_info.auth_check = True
                sms_auth_info.save()
            else:
                error = '입력 시한이 지났습니다.'
        else:
            error = '인증번호를 다시 확인해주세요.'

        if error is None:
            return Response({"success": "ok"}, status=201)

        return Response({"fail": error}, status=400)


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
