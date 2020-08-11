from django.contrib.auth import get_user_model
from rest_framework import serializers

from api.serializer_mixins import DynamicFieldsMixin
from apps.account.models import MemberTb

User = get_user_model()


class UserReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'username',
            'email'
        ]


class MemberReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    trailers = serializers.SerializerMethodField()

    class Meta:
        model = MemberTb
        fields = [
            'member_id',
            'name',
            'phone',
            'sex',
            'birthday_dt',
            'profile_url',
            'phone_is_active',
            'reg_info',
            'age',
            'phone_is_active',
            'recommended_member_id',
            'user'
        ]

    def get_trailers(self, obj):
        return UserReadSerializer(instance=obj.user.active(), many=True, context=self.context).data

