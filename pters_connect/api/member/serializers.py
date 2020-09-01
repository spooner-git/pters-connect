import random

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from api.member.views import func_send_sms_auth
from api.serializer_mixins import DynamicFieldsMixin
from apps.member.models import MemberTb, SmsAuthTb, SnsInfoTb
from configs.const import USE

User = get_user_model()


class UserReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'first_name',
            'email'
        ]


class MemberCreateSerializer(serializers.ModelSerializer):

    MEMBER_TYPE_CHOICES = [
        ('manager', '센터 관리자'),
        ('trainer', '강사'),
        ('trainee', '일반 회원'),
    ]

    password1 = serializers.CharField(
        label='비밀번호', write_only=True,
        style={'input_type': 'password', 'placeholder': '비밀번호를 설정해주세요.'}
    )
    password2 = serializers.CharField(
        label='비밀번호 확인', write_only=True,
        style={'input_type': 'password', 'placeholder': '비밀번호를 다시 입력해주세요.'}
    )
    phone = serializers.CharField(
        label='휴대폰 번호', write_only=True, allow_blank=True,
        style={'placeholder': '휴대폰 번호를 입력해주세요.'}
    )

    group = serializers.CharField(
        label='회원 타입', read_only=True, allow_blank=False
    )

    class Meta:
        model = User
        fields = [
            'first_name', 'username', 'email', 'password1', 'password2', 'phone', 'group'
        ]
        extra_kwargs = {
            'email': {
                'style': {
                    'placeholder': '이메일 주소를 입력해주세요'
                }
            },
            'first_name': {
                'style': {
                    'placeholder': '이름을 입력해주세요'
                },
                'required': False
            }
        }

    def validate_password1(self, password1):
        try:
            validate_password(password1)
        except ValidationError as exc:
            raise serializers.ValidationError(str(exc))
        return password1

    def validate_password2(self, password2):
        password1 = self.initial_data.get('password1')
        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError('비밀번호가 일치하지 않습니다.')
        return password2

    # def validate_phone(self, phone):
    #     phone = self.initial_data.get('phone')
    #     return phone

    def validate(self, data):
        data['password'] = data.pop('password1')
        data.pop('password2')
        return data

    def create(self, validated_data):
        group = Group.objects.get(name=validated_data['group'])
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
        )
        user.groups.add(group)
        user.set_password(validated_data['password'])
        user.save()

        member = MemberTb(member_id=user.id, name=user.first_name, phone=validated_data['phone'],
                          user_id=user.id, use=USE)
        member.save()
        return user


class MemberUpdateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(label='이메일', source='user.email')

    class Meta:
        model = MemberTb
        fields = [
            'member_id', 'name', 'phone', 'sex', 'birthday_dt', 'profile_url', 'reg_info', 'age', 'address',
            'job', 'contents', 'email'
        ]

    def update(self, instance, validated_data):
        validated_user = validated_data.pop('user')
        instance.user.first_name = validated_data.pop('name')
        instance.user.email = validated_user.pop('email')
        instance.user.save()
        return instance

    # def validate_code(self, code):
    #     user = self.context['request'].user
    #     phone_number = self.initial_data.get('phone_number')
    #     # if phone_number and phone_number != user.phone_number:
    #     #     if not is_contact_valid(phone_number, code):
    #     #         raise serializers.ValidationError('인증번호 또는 전화번호가 올바르지 않습니다.')
    #     return code


class MemberReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    user = UserReadSerializer()

    class Meta:
        model = MemberTb
        fields = ['member_id', 'sex', 'birthday_dt', 'phone_is_active', 'user']
        extra_fields = ['user']


class SmsAuthCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmsAuthTb
        fields = ['phone_number']

    def save(self, **kwargs):
        max_range = 99999
        auth_number = str(random.randrange(0, max_range)).zfill(len(str(max_range)))
        self.validated_data['auth_check'] = False
        self.validated_data['auth_number'] = auth_number
        error = func_send_sms_auth(self.validated_data['phone_number'], self.validated_data['auth_number'],
                                   'PTERS-CONNECT')

        if error is not None:
            raise serializers.ValidationError('인증번호 전송에 실패했습니다.')
        return super().save(**self.validated_data)


class SmsValidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmsAuthTb
        fields = ['phone_number', 'auth_number']


class SnsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnsInfoTb
        fields = '__all__'
