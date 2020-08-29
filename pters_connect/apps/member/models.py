from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from configs.models import TimeStampedModel


class MemberTb(TimeStampedModel):
    member_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    name = models.CharField('이름', db_column='NAME', max_length=20, blank=True, default='')  # Field name made lowercase.
    phone = models.CharField('휴대폰', db_column='PHONE', max_length=20, blank=True, default='')  # Field name made lowercase.
    sex = models.CharField('성별', db_column='SEX', max_length=2, blank=True, default='')  # Field name made lowercase.
    birthday_dt = models.DateField('생년월일', db_column='BIRTHDAY_DT', blank=True)  # Field name made lowercase.
    profile_url = models.CharField('프로필 사진 URL', db_column='PROFILE_URL', max_length=255, blank=True,
                                   default='/static/common/icon/icon_account.png')
    phone_is_active = models.IntegerField('휴대폰 인증 여부', db_column='PHONE_IS_ACTIVE', blank=True,default=0)
    reg_info = models.CharField('생성자 회원 ID', db_column='REG_INFO', max_length=20, blank=True, default='')
    user = models.ForeignKey(User, verbose_name='회원', on_delete=models.SET_NULL, null=True)

    age = models.IntegerField('나이', db_column='AGE', blank=True)  # Field name made lowercase.
    country = models.CharField('국가', db_column='COUNTRY', max_length=255, blank=True, default='')
    address = models.CharField('지역', db_column='ADDRESS', max_length=255, blank=True, default='')
    job = models.CharField('직업', db_column='JOB', max_length=20, blank=True, default='')  # Field name made lowercase.
    contents = models.CharField('소개', db_column='CONTENTS', max_length=255, blank=True, default='')
    recommended_member_id = models.CharField('추천 회원 ID', db_column='RECOMMENDED_MEMBER_ID',
                                             max_length=20, blank=True, default='')

    class Meta:
        managed = False
        db_table = 'MEMBER_TB'
        verbose_name = '회원'
        verbose_name_plural = '회원'

    def __str__(self):
        return self.name


class SmsAuthTb(TimeStampedModel):
    id = models.AutoField(db_column='ID', primary_key=True, null=False)
    phone_number = models.CharField(verbose_name='휴대폰 번호', db_column='PHONE_NUMBER', max_length=11)
    auth_number = models.IntegerField(verbose_name='인증 번호', db_column='AUTH_NUMBER')
    auth_check = models.BooleanField(verbose_name='인증 확인', db_column='AUTH_CHECK', default=False)

    class Meta:
        managed = True
        db_table = 'SMS_AUTH_TB'
        verbose_name = '휴대폰 인증'
        verbose_name_plural = '휴대폰 인증'


class SnsInfoTb(TimeStampedModel):
    sns_info_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    member = models.ForeignKey(MemberTb, verbose_name='회원', on_delete=models.CASCADE)  # Field name made lowercase.
    sns_name = models.CharField('SNS 이름', db_column='SNS_NAME', max_length=255, blank=False)
    sns_id = models.CharField('SNS ID', db_column='SNS_ID', max_length=255, blank=False)  # Field name made lowercase.
    sns_type = models.CharField('SNS 종류', db_column='SNS_TYPE', max_length=10, blank=False)
    sns_connect_date = models.DateField('SNS 가입일', db_column='SNS_CONNECT_DATE', blank=True)
    change_password_check = models.IntegerField('비밀번호 변경 유무', db_column='CHANGE_PASSWORD_CHECK', default=0)

    sns_profile = models.CharField('프로필 정보', db_column='SNS_PROFILE', max_length=255, blank=True, default='')

    class Meta:
        managed = False
        db_table = 'SNS_INFO_TB'
        verbose_name = 'SNS 가입 정보'
        verbose_name_plural = 'SNS 가입 정보'
