from rest_framework import serializers
from api.member.serializers import MemberReadSerializer
from api.serializer_mixins import DynamicFieldsMixin
from api.subject.serializers import SubjectReadSerializer
from apps.facility.models import FacilityTb, MemberFacilityTb
from apps.subject.models import SubjectTb
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
        fields = ['facility_id', 'name', 'address', 'main_type_cd', 'sub_type_cd', 'title', 'contents',
                  'main_img_url', 'sub_img_url', 'member', 'mod_dt', 'reg_dt', 'use']


class FacilityWithSubjectReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    member = MemberReadSerializer()
    subjects = serializers.SerializerMethodField()

    class Meta:
        model = FacilityTb
        fields = ['name', 'address', 'main_type_cd', 'sub_type_cd', 'title', 'contents', 'main_img_url', 'sub_img_url',
                  'member', 'subjects', 'mod_dt', 'reg_dt', 'use']

    def get_subjects(self, obj):
        subject_data = SubjectTb.objects.filter(facility_tb=obj)
        return SubjectReadSerializer(instance=subject_data, many=True).data
