from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from api.account.serializers import MemberReadSerializer
from api.serializer_mixins import DynamicFieldsMixin
from apps.facility.models import FacilityTb, MemberFacilityTb, SubjectTb
from apps.trainer.models import MemberSubjectTb
from configs.const import OWN_TYPE_OWNER, AUTH_TYPE_VIEW


class FacilityCreateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = FacilityTb
        fields = [
            'name', 'address', 'title', 'contents', 'main_type_cd', 'sub_type_cd', 'support_tag',
            'main_img_url', 'sub_img_url', 'start_date', 'member_id'
        ]
        extra_kwargs = {
            'name': {
                'style': {
                    'placeholder': '지점명을 입력해주세요'
                }
            },
            'address': {
                'style': {
                    'placeholder': '주소를 입력해주세요'
                },
                'required': False
            },
        }

    def validate(self, attrs):
        attrs['member_id'] = self.context['request'].user.id
        return attrs

    def create(self, validated_data):

        member_id = validated_data['member_id']
        instance = FacilityTb(**validated_data)
        instance.save()

        member_facility_info = MemberFacilityTb(facility_tb=instance, auth_cd=AUTH_TYPE_VIEW, own_cd=OWN_TYPE_OWNER,
                                                member_id=member_id, mod_member_id=member_id)
        member_facility_info.save()
        return instance


class FacilityUpdateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = FacilityTb
        fields = [
            'name', 'address', 'title', 'contents', 'main_type_cd', 'sub_type_cd', 'support_tag',
            'main_img_url', 'sub_img_url', 'start_date', 'member_id'
        ]


class FacilityReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    member = MemberReadSerializer()

    class Meta:
        model = FacilityTb
        fields = '__all__'
        extra_fields = ['member']


class SubjectCreateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = SubjectTb
        fields = [
            'name', 'note', 'facility_tb_id', 'main_trainer_id'
        ]
        extra_kwargs = {
            'name': {
                'style': {
                    'placeholder': '과목명을 입력해주세요'
                }
            },
        }

    def create(self, validated_data):

        instance = SubjectTb(**validated_data)
        instance.save()

        member_subject_info = MemberSubjectTb(subject_tb=instance, auth_cd=AUTH_TYPE_VIEW, own_cd=OWN_TYPE_OWNER,
                                              member_id=validated_data['main_trainer_id'],
                                              mod_member_id=validated_data['main_trainer_id'])
        member_subject_info.save()
        return instance


class SubjectUpdateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = SubjectTb
        fields = [
            'name', 'note', 'facility_tb_id', 'main_trainer_id'
        ]


class SubjectReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    main_trainer = MemberReadSerializer()

    class Meta:
        model = SubjectTb
        fields = '__all__'


    # auth_cd = serializers.CharField(
    #     label='조회 권환', write_only=True, allow_blank=True,
    #     style={'placeholder': '조회 권한을 선택해주세요.'}
    # )
    #
    # own_cd = serializers.CharField(
    #     label='소유 권한', write_only=True, allow_blank=True,
    #     style={'placeholder': '소유 권한을 선택해주세요.'}
    # )