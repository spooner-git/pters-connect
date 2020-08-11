from django.db import models


class TimeStampedModel(models.Model):
    reg_dt = models.DateTimeField('최초등록 시각', db_column='REG_DT', blank=True, null=True, auto_now_add=True)
    mod_dt = models.DateTimeField('최종수정 시각', db_column='MOD_DT', blank=True, null=True, auto_now=True)
    use = models.IntegerField('사용', db_column='USE', default=1)  # Field name made lowercase.

    class Meta:
        abstract = True
