from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from api.account.serializers import MemberReadSerializer
from api.serializer_mixins import DynamicFieldsMixin
from apps.facility.models import FacilityTb


class FacilityCreateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = FacilityTb
        fields = [
            'name', 'address', 'facility_type_cd', 'main_img_url', 'member_id'
        ]
        extra_kwargs = {
            'name': {
                'style': {
                    'placeholder': '시설명을 입력해주세요'
                }
            },
            'address': {
                'style': {
                    'placeholder': '주소를 입력해주세요'
                },
                'required': False
            },
            'facility_type_cd': {
                'style': {
                    'placeholder': '시설 종류를 입력해주세요'
                },
                'required': False
            }
        }


class FacilityUpdateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = FacilityTb
        fields = [
            'name', 'address', 'facility_type_cd', 'main_img_url'
        ]


class FacilityReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    member = MemberReadSerializer()

    class Meta:
        model = FacilityTb
        fields = [
            'facility_id',
            'name',
            'address',
            'facility_type_cd',
            'main_img_url',
            'member'
        ]
