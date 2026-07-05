from django.contrib import admin
from .models import HealthCenter, MedicineStock, Doctor, PatientRecord, Alert


@admin.register(HealthCenter)
class HealthCenterAdmin(admin.ModelAdmin):
    list_display = ["name", "center_type", "district", "total_beds", "available_beds", "status"]
    list_filter = ["center_type", "status", "district"]
    search_fields = ["name", "district"]


@admin.register(MedicineStock)
class MedicineStockAdmin(admin.ModelAdmin):
    list_display = ["medicine_name", "health_center", "current_stock", "days_left", "status"]
    list_filter = ["status", "health_center"]
    search_fields = ["medicine_name", "health_center__name"]


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ["name", "specialization", "health_center", "attendance_status", "attendance_percentage"]
    list_filter = ["attendance_status", "health_center", "specialization"]
    search_fields = ["name", "health_center__name"]


@admin.register(PatientRecord)
class PatientRecordAdmin(admin.ModelAdmin):
    list_display = ["patient_name", "age", "gender", "disease", "health_center", "visit_date"]
    list_filter = ["gender", "disease", "visit_date", "health_center"]
    search_fields = ["patient_name", "disease", "health_center__name"]


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ["alert_type", "health_center", "priority", "created_at"]
    list_filter = ["priority", "alert_type", "health_center"]
    search_fields = ["message", "health_center__name"]
