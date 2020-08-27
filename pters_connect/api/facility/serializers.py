from django import core
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
        fields = ['name', 'address', 'main_type_cd', 'sub_type_cd', 'title', 'contents', 'main_img_url', 'sub_img_url',
                  'member', 'mod_dt', 'reg_dt', 'use']


class SubjectTrainerCreateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = MemberSubjectTb
        fields = [
            'member', 'subject_tb', 'auth_cd', 'own_cd'
        ]

    def create(self, validated_data):
        validated_data['mod_member_id'] = self.context['request'].user.id
        instance = MemberSubjectTb(**validated_data)
        instance.save()
        return instance


class SubjectTrainerReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    member = MemberReadSerializer()

    class Meta:
        model = MemberSubjectTb
        fields = ['member', 'member_subject_id', 'auth_cd', 'own_cd']


class SubjectCreateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = SubjectTb
        fields = [
            'name', 'note', 'facility_tb', 'main_trainer'
        ]
        extra_kwargs = {
            'name': {
                'style': {
                    'placeholder': '수업명을 입력해주세요'
                }
            },
        }

    def create(self, validated_data):
        member_id = validated_data.pop('member_id')
        # print(str(self.context['request'].session.get('member')))
        instance = SubjectTb(**validated_data)
        instance.save()

        member_subject_info = MemberSubjectTb(subject_tb=instance, auth_cd=AUTH_TYPE_VIEW, own_cd=OWN_TYPE_OWNER,
                                              member=validated_data['main_trainer'],
                                              mod_member_id=member_id)
        member_subject_info.save()
        return instance


class SubjectUpdateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = SubjectTb
        fields = [
            'name', 'note', 'main_trainer_id'
        ]


class SubjectReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    main_trainer = MemberReadSerializer()
    facility_tb = FacilityReadSerializer()
    sub_trainers = serializers.SerializerMethodField()

    class Meta:
        model = SubjectTb
        fields = ['name', 'note', 'facility_tb', 'main_trainer', 'sub_trainers', 'mod_dt', 'reg_dt', 'use']

    def get_sub_trainers(self, obj):
        member_subject_data = MemberSubjectTb.objects.filter(subject_tb=obj)
        return SubjectTrainerReadSerializer(instance=member_subject_data, many=True).data
