from django.contrib import admin

# Register your models here.
from apps.facility.models import FacilityTb


@admin.register(FacilityTb)
class FacilityTbAdmin(admin.ModelAdmin):
    list_display = ['facility_id', 'member', 'name', 'main_type_cd', 'sub_type_cd', 'support_tag',
                    'title', 'contents', 'address', 'longitude', 'latitude', 'contact_number', 'main_img_url',
                    'sub_img_url', 'start_date', 'end_date', 'state_cd']
    list_filter = ['facility_id', 'name', 'address', 'main_type_cd']
