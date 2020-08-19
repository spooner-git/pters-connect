from django.db import models

# Create your models here.
from apps.account.models import MemberTb
from configs.models import TimeStampedModel


# 시설 정보
class FacilityTb(TimeStampedModel):
    facility_id = models.AutoField(db_column='ID', primary_key=True, null=False)
    member = models.ForeignKey(MemberTb, on_delete=models.CASCADE)  # Field name made lowercase.
    name = models.CharField(db_column='NAME', max_length=20, blank=True, null=True)
    address = models.CharField(db_column='ADDRESS', max_length=255, blank=True, null=True)  # Field name made lowercase.
    facility_type_cd = models.CharField(db_column='FACILITY_TYPE_CD', max_length=20, blank=True, null=True)
    main_img_url = models.CharField(db_column='MAIN_IMG_URL', max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'FACILITY_TB'

    def __str__(self):
        return self.name.__str__()
