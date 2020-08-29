import logging

from api.member.permissions import UserPermission

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