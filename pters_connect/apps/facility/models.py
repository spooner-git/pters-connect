from django.db import models

# Create your models here.
from apps.account.models import MemberTb
from configs.const import OWN_TYPE_OWNER
from configs.models import TimeStampedModel


# 권한
class FunctionAuthTb(TimeStampedModel):
    function_auth_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    function_auth_type_cd = models.CharField('기능권한 타입', db_column='FUNCTION_AUTH_TYPE_CD', max_length=45, blank=True)
    function_auth_type_name = models.CharField('기능 권한명', db_column='FUNCTION_AUTH_TYPE_NAME', max_length=255, blank=True)
    order = models.IntegerField(db_column='ORDER', default=1)

    class Meta:
        managed = False
        db_table = 'FUNCTION_AUTH_TB'
        verbose_name = '기능 권한'
        verbose_name_plural = '기능 권한'

    def __str__(self):
        return self.function_auth_type_name.__str__()


# 시설 정보
class FacilityTb(TimeStampedModel):
    facility_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    member = models.ForeignKey(MemberTb, verbose_name='회원', on_delete=models.CASCADE)
    name = models.CharField('지점명', db_column='SUBJECT_DETAIL_NM', max_length=20, blank=True, default='')
    subject_tag = models.CharField('수업 태그', db_column='SUBJECT_TAG', max_length=3000, blank=True, default='')
    address = models.CharField('주소', db_column='ADDRESS', max_length=255, blank=True, default='')
    start_date = models.DateField('시작일', db_column='START_DATE', blank=True)
    end_date = models.DateField('종료일', db_column='END_DATE', blank=True)
    state_cd = models.CharField('상태', db_column='STATE_CD', max_length=10, blank=True, default='')

    class Meta:
        managed = True
        db_table = 'FACILITY_TB'
        verbose_name = '지점'
        verbose_name_plural = '지점'

    def __str__(self):
        return self.name.__str__()


# 강사 <-> 강사 지점 연결 정보
class MemberFacilityTb(TimeStampedModel):
    member_facility_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    member = models.ForeignKey(MemberTb, verbose_name='회원', on_delete=models.CASCADE, null=True)  # Field name made lowercase.
    facility_tb = models.ForeignKey(FacilityTb, verbose_name='지점', on_delete=models.CASCADE, null=True)
    auth_cd = models.CharField('권한 코드', db_column='AUTH_CD', max_length=20, blank=True,  default='')
    own_cd = models.CharField('소유 코드', db_column='OWN_CD', max_length=20, blank=True, default=OWN_TYPE_OWNER)
    mod_member_id = models.CharField('최종수정 회원 ID', db_column='MOD_MEMBER_ID', max_length=20, blank=True, default='')

    class Meta:
        managed = True
        db_table = 'MEMBER_FACILITY_TB'
        verbose_name = '강사->지점 연결 정보'
        verbose_name_plural = '강사->지점 연결 정보'


# 공유 지점 권한 정보
class FacilityAuthTb(TimeStampedModel):
    product_function_auth_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    facility_tb = models.ForeignKey(FacilityTb, verbose_name='지점', on_delete=models.CASCADE, null=True)
    member = models.ForeignKey(MemberTb, verbose_name='회원', on_delete=models.CASCADE, null=True)
    function_auth_tb = models.ForeignKey(FunctionAuthTb, verbose_name='기능', on_delete=models.CASCADE, null=True)
    auth_type_cd = models.CharField('권한', db_column='AUTH_TYPE_CD', max_length=45, blank=True, default='')
    enable_flag = models.IntegerField('가능 유무', db_column='ENABLE_FLAG', default=1)

    class Meta:
        managed = True
        db_table = 'FACILITY_AUTH_TB'
        verbose_name = '공유 지점 권한'
        verbose_name_plural = '공유 지점 권한'
