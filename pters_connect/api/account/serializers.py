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
            'first_name',
            'email'
        ]


class UserCreateSerializer(serializers.ModelSerializer):
    # password1 = serializers.CharField(
    #     label='비밀번호', write_only=True,
    #     style={'placeholder': '비밀번호를 설정해주세요.'}
    # )
    # password2 = serializers.CharField(
    #     label='비밀번호 확인', write_only=True,
    #     style={'placeholder': '설정하신 비밀번호를 다시 입력해주세요.'}
    # )
    # is_agreed_1 = serializers.BooleanField(label='개인정보 취급방침에 동의합니다.', write_only=True)
    # is_agreed_2 = serializers.BooleanField(label='이용약관에 동의합니다.', write_only=True)
    # code = serializers.CharField(label='인증번호', write_only=True)
    token = serializers.CharField(source='get_token', read_only=True)

    class Meta:
        model = User
        fields = [
            'first_name', 'email', 'token'
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
        metadata = {
            'password1': {
                'widget': {
                    'first_name': 'input',
                    'attrs': {'type': 'password'}
                }
            },
            'password2': {
                'widget': {
                    'first_name': 'input',
                    'attrs': {'type': 'password'}
                }
            }
        }

    def validate_password2(self, password2):
        password1 = self.initial_data.get('password1')
        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError('비밀번호가 일치하지 않습니다.')
        return password2

    def validate_is_agreed(self, value):
        if not value:
            raise serializers.ValidationError('필수 동의사항입니다.')
        return value

    def validate_code(self, code):
        phone_number = self.initial_data.get('phone_number')
        # if phone_number and not is_contact_valid(phone_number, code):
        #     raise serializers.ValidationError('인증번호 또는 전화번호가 올바르지 않습니다.')
        return code

    def validate(self, data):
        data['password'] = data.pop('password1')
        data.pop('password2')
        # data.pop('code')
        # data.pop('is_agreed_1')
        # data.pop('is_agreed_2')
        return data


class UserUpdateSerializer(serializers.ModelSerializer):
    # code = serializers.CharField(label='인증번호', write_only=True)

    class Meta:
        model = User
        fields = [
            'first_name'
        ]

    # def validate_code(self, code):
    #     user = self.context['request'].user
    #     phone_number = self.initial_data.get('phone_number')
    #     # if phone_number and phone_number != user.phone_number:
    #     #     if not is_contact_valid(phone_number, code):
    #     #         raise serializers.ValidationError('인증번호 또는 전화번호가 올바르지 않습니다.')
    #     return code


class MemberReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

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

    def get_user(self, obj):
        return UserReadSerializer(instance=obj.user, context=self.context).data

