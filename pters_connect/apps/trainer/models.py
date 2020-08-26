from django.db import models

# Create your models here.
from apps.account.models import MemberTb
from apps.facility.models import SubjectTb
from configs.const import OWN_TYPE_OWNER, AUTH_TYPE_VIEW, AUTH_TYPE_WAIT, AUTH_TYPE_DELETE, OWN_TYPE_SHARE, \
    OWN_TYPE_EMPLOYEE
from configs.models import TimeStampedModel


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
    member = models.ForeignKey(MemberTb, verbose_name='회원', on_delete=models.CASCADE, null=True)
    subject_tb = models.ForeignKey(SubjectTb, verbose_name='지점', on_delete=models.CASCADE, null=True)
    auth_cd = models.CharField('권한 코드', db_column='AUTH_CD', max_length=20, choices=AUTH_CD, blank=True,  default='')
    own_cd = models.CharField('소유 코드', db_column='OWN_CD', max_length=20, choices=OWN_CD,
                              blank=True, default=OWN_TYPE_OWNER)
    mod_member = models.ForeignKey(MemberTb, verbose_name='최종수정 회원', on_delete=models.SET_NULL,
                                   related_name='MOD_MEMBER_ID', null=True)

    class Meta:
        managed = True
        db_table = 'MEMBER_SUBJECT_TB'
        verbose_name = '강사->수업 연결 정보'
        verbose_name_plural = '강사->수업 연결 정보'
