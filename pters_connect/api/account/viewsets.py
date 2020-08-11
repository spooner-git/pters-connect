from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from api.account.permissions import UserPermission
from api.account.serializers import UserReadSerializer
from api.viewset_mixins import DynamicSerializerMixin

User = get_user_model()


class UserViewSet(DynamicSerializerMixin,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    permission_classes = [UserPermission]
    queryset = User.objects.active()
    serializer_classes = {
        'read':  UserReadSerializer
        # 'create': UserCreateSerializer,
        # 'update': UserUpdateSerializer,
        # 'change_password': PasswordChangeSerializer,
        # 'inactivate': UserInactivateSerializer,
        # 'find_email': EmailFindSerializer,
        # 'find_password': PasswordFindSerializer,
    }
    search_fields = ['name', 'email']

    def get_object(self):
        if self.kwargs.get('pk') == 'me':
            return self.request.user
        return super().get_object()

    @action(methods=['post'], detail=True)
    def change_password(self, request, pk):
        return self.update(request)

    @action(methods=['post'], detail=False)
    def find_email(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)

    @action(methods=['post'], detail=False)
    def find_password(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)
