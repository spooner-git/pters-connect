from rest_framework import serializers

from api.account.serializers import MemberReadSerializer
from api.serializer_mixins import DynamicFieldsMixin
from apps.subject.models import SubjectTb, MemberSubjectTb
from configs.const import OWN_TYPE_OWNER, AUTH_TYPE_VIEW


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

    class Meta:
        model = SubjectTb
        fields = ['subject_id', 'name', 'note', 'main_trainer', 'mod_dt', 'reg_dt', 'use']


class SubjectWithSubTrainerReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    main_trainer = MemberReadSerializer()
    sub_trainers = serializers.SerializerMethodField()

    class Meta:
        model = SubjectTb
        fields = ['subject_id', 'name', 'note', 'main_trainer', 'sub_trainers', 'mod_dt', 'reg_dt', 'use']

    def get_sub_trainers(self, obj):
        member_subject_data = MemberSubjectTb.objects.filter(subject_tb=obj)
        return SubjectTrainerReadSerializer(instance=member_subject_data, many=True).data


class SubjectTrainerCreateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = MemberSubjectTb
        fields = [
            'member', 'subject_tb', 'auth_cd', 'own_cd',
        ]

    def create(self, validated_data):
        # print(str(self.context))
        validated_data['mod_member_id'] = self.context['request'].user.id
        instance = MemberSubjectTb(**validated_data)
        instance.save()
        return instance


class SubjectTrainerUpdateSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = MemberSubjectTb
        fields = ['subject_tb', 'auth_cd', 'own_cd']


class SubjectTrainerReadSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    member = MemberReadSerializer()

    class Meta:
        model = MemberSubjectTb
        fields = ['member', 'member_subject_id', 'auth_cd', 'own_cd']

