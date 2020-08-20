from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet

from api.account.permissions import UserPermission
from api.account.serializers import MemberReadSerializer, MemberCreateSerializer, MemberUpdateSerializer
from api.viewset_mixins import DynamicSerializerMixin
from apps.account.models import MemberTb


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
            return super().get_queryset().get(member_id=self.request.user.id)
        return super().get_object()

    # @action(methods=['post'], detail=True)
    # def change_password(self, request, pk):
    #     return self.update(request)
    #
    # @action(methods=['post'], detail=False)
    # def find_password(self, request):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     return Response(serializer.data)

