from django.db import models

# Create your models here.
from apps.account.models import MemberTb
from configs.const import OWN_TYPE_OWNER, AUTH_TYPE_VIEW, AUTH_TYPE_WAIT, AUTH_TYPE_DELETE, OWN_TYPE_SHARE, \
    OWN_TYPE_EMPLOYEE
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

    MAIN_TYPE_CHOICES = [
        ('GOLF', '골프'),
        ('PI', '필라테스'),
        ('WT', '웨이트 트레이닝'),
        ('BL', '발레'),
        ('YG', '요가'),
    ]
    SUB_TYPE_CHOICES = [
        ('INDOOR_FIELD', '실내 연습장'),
        ('OUTDOOR_FIELD', '실외 연습장'),
        ('SCREEN', '스크린 골프'),
        ('STUDIO', '전문 스튜디오'),
    ]

    facility_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    member = models.ForeignKey(MemberTb, verbose_name='회원', on_delete=models.CASCADE)
    name = models.CharField('지점명', db_column='NAME', max_length=20, blank=True, default='')
    main_type_cd = models.CharField('대분류', db_column='MAIN_TYPE_CD', max_length=20, choices=MAIN_TYPE_CHOICES,
                                    blank=True, default='')
    sub_type_cd = models.CharField('소분류', db_column='SUB_TYPE_CD', max_length=20, choices=SUB_TYPE_CHOICES,
                                   blank=True, default='')
    support_tag = models.CharField('지원 태그', db_column='SUPPORT_TAG', max_length=3000, blank=True, default='')
    title = models.CharField('타이틀', db_column='TITLE', max_length=1000, blank=True, default='')
    contents = models.CharField('소개', db_column='CONTENTS', max_length=3000, blank=True, default='')
    address = models.CharField('주소', db_column='ADDRESS', max_length=255, blank=True, default='')
    main_img_url = models.URLField('메인 이미지 URL', db_column='MAIN_IMG_URL', max_length=255, blank=True)
    sub_img_url = models.URLField('서브 이미지 URL', db_column='SUB_IMG_URL', max_length=255, blank=True)
    start_date = models.DateField('시작일', db_column='START_DATE', blank=True, null=True)
    end_date = models.DateField('종료일', db_column='END_DATE', blank=True, null=True)
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
