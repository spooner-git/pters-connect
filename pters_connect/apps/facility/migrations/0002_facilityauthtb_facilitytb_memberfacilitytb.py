# Generated by Django 3.0 on 2020-08-20 19:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
        ('facility', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FacilityTb',
            fields=[
                ('reg_dt', models.DateTimeField(auto_now_add=True, db_column='REG_DT', null=True, verbose_name='최초등록 시각')),
                ('mod_dt', models.DateTimeField(auto_now=True, db_column='MOD_DT', null=True, verbose_name='최종수정 시각')),
                ('use', models.IntegerField(db_column='USE', default=1, verbose_name='사용')),
                ('facility_id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('subject_cd', models.CharField(blank=True, db_column='SUBJECT_CD', default='', max_length=10, verbose_name='지점 코드')),
                ('subject_detail_nm', models.CharField(blank=True, db_column='SUBJECT_DETAIL_NM', default='', max_length=20, verbose_name='지점명')),
                ('start_date', models.DateField(blank=True, db_column='START_DATE', verbose_name='시작일')),
                ('end_date', models.DateField(blank=True, db_column='END_DATE', verbose_name='종료일')),
                ('address', models.CharField(blank=True, db_column='ADDRESS', default='', max_length=255, verbose_name='주소')),
                ('subject_tag', models.CharField(blank=True, db_column='SUBJECT_TAG', default='', max_length=3000, verbose_name='수업 태그')),
                ('state_cd', models.CharField(blank=True, db_column='STATE_CD', default='', max_length=10, verbose_name='상태')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.MemberTb', verbose_name='회원')),
            ],
            options={
                'verbose_name': '지점',
                'verbose_name_plural': '지점',
                'db_table': 'FACILITY_TB',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemberFacilityTb',
            fields=[
                ('reg_dt', models.DateTimeField(auto_now_add=True, db_column='REG_DT', null=True, verbose_name='최초등록 시각')),
                ('mod_dt', models.DateTimeField(auto_now=True, db_column='MOD_DT', null=True, verbose_name='최종수정 시각')),
                ('use', models.IntegerField(db_column='USE', default=1, verbose_name='사용')),
                ('member_facility_id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('auth_cd', models.CharField(blank=True, db_column='AUTH_CD', default='', max_length=20, verbose_name='권한 코드')),
                ('own_cd', models.CharField(blank=True, db_column='OWN_CD', default='OWNER', max_length=20, verbose_name='소유 코드')),
                ('mod_member_id', models.CharField(blank=True, db_column='MOD_MEMBER_ID', default='', max_length=20, verbose_name='최종수정 회원 ID')),
                ('facility_tb', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='facility.FacilityTb', verbose_name='지점')),
                ('member', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='account.MemberTb', verbose_name='회원')),
            ],
            options={
                'verbose_name': '강사->지점 연결 정보',
                'verbose_name_plural': '강사->지점 연결 정보',
                'db_table': 'MEMBER_FACILITY_TB',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='FacilityAuthTb',
            fields=[
                ('reg_dt', models.DateTimeField(auto_now_add=True, db_column='REG_DT', null=True, verbose_name='최초등록 시각')),
                ('mod_dt', models.DateTimeField(auto_now=True, db_column='MOD_DT', null=True, verbose_name='최종수정 시각')),
                ('use', models.IntegerField(db_column='USE', default=1, verbose_name='사용')),
                ('product_function_auth_id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('auth_type_cd', models.CharField(blank=True, db_column='AUTH_TYPE_CD', default='', max_length=45, verbose_name='권한')),
                ('enable_flag', models.IntegerField(db_column='ENABLE_FLAG', default=1, verbose_name='가능 유무')),
                ('facility_tb', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='facility.FacilityTb', verbose_name='지점')),
                ('function_auth_tb', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='facility.FunctionAuthTb', verbose_name='기능')),
                ('member', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='account.MemberTb', verbose_name='회원')),
            ],
            options={
                'verbose_name': '공유 지점 권한',
                'verbose_name_plural': '공유 지점 권한',
                'db_table': 'FACILITY_AUTH_TB',
                'managed': True,
            },
        ),
    ]
