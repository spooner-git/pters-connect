from django.db import models

# Create your models here.
from apps.account.models import MemberTb
from apps.facility.models import FacilityTb
from configs.models import TimeStampedModel
from configs.const import OWN_TYPE_OWNER, AUTH_TYPE_VIEW, AUTH_TYPE_WAIT, AUTH_TYPE_DELETE, OWN_TYPE_SHARE, \
    OWN_TYPE_EMPLOYEE


# 수업 정보
class SubjectTb(TimeStampedModel):
    subject_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    facility_tb = models.ForeignKey(FacilityTb, verbose_name='지점', on_delete=models.CASCADE, blank=True)
    name = models.CharField('수업명', db_column='NAME', max_length=255, blank=True, default='')
    note = models.CharField('설명', db_column='NOTE', max_length=1000, blank=True, default='')
    main_trainer = models.ForeignKey(MemberTb, verbose_name='메인 담당 강사', on_delete=models.SET_NULL,
                                     related_name='MAIN_TRAINER_ID', null=True)

    class Meta:
        managed = True
        db_table = 'SUBJECT_TB'
        verbose_name = '수업'
        verbose_name_plural = '수업'

    def __str__(self):
        return self.facility_tb.__str__()+'-'+self.name.__str__()


# 강사 <-> 수업 연결 정보
class MemberSubjectTb(TimeStampedModel):

    AUTH_CD = [
        (AUTH_TYPE_VIEW, '골프'),
        (AUTH_TYPE_WAIT, '필라테스'),
        (AUTH_TYPE_DELETE, '웨이트 트레이닝'),
    ]
    OWN_CD = [
        (OWN_TYPE_OWNER, '오너'),
        (OWN_TYPE_SHARE, '공유'),
        (OWN_TYPE_EMPLOYEE, '직원'),
    ]

    member_subject_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    member = models.ForeignKey(MemberTb, verbose_name='회원', on_delete=models.CASCADE, null=False)
    subject_tb = models.ForeignKey(SubjectTb, verbose_name='지점', on_delete=models.CASCADE, null=False)
    auth_cd = models.CharField('권한 코드', db_column='AUTH_CD', max_length=20, choices=AUTH_CD, blank=False,
                               default=AUTH_TYPE_VIEW)
    own_cd = models.CharField('소유 코드', db_column='OWN_CD', max_length=20, choices=OWN_CD, blank=False,
                              default=OWN_TYPE_OWNER)
    mod_member = models.ForeignKey(MemberTb, verbose_name='최종수정 회원', on_delete=models.SET_NULL,
                                   related_name='MOD_MEMBER_ID', null=True)

    class Meta:
        managed = True
        db_table = 'MEMBER_SUBJECT_TB'
        verbose_name = '강사->수업 연결 정보'
        verbose_name_plural = '강사->수업 연결 정보'
        unique_together = ('member', 'subject_tb')
