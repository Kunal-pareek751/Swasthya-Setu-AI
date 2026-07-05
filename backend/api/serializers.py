from rest_framework import serializers
from .models import HealthCenter, MedicineStock, Doctor, PatientRecord, Alert


class HealthCenterSerializer(serializers.ModelSerializer):
    available_beds = serializers.ReadOnlyField()

    class Meta:
        model = HealthCenter
        fields = "__all__"


class MedicineStockSerializer(serializers.ModelSerializer):
    health_center_name = serializers.CharField(source="health_center.name", read_only=True)

    class Meta:
        model = MedicineStock
        fields = "__all__"


class DoctorSerializer(serializers.ModelSerializer):
    health_center_name = serializers.CharField(source="health_center.name", read_only=True)

    class Meta:
        model = Doctor
        fields = "__all__"


class PatientRecordSerializer(serializers.ModelSerializer):
    health_center_name = serializers.CharField(source="health_center.name", read_only=True)

    class Meta:
        model = PatientRecord
        fields = "__all__"


class AlertSerializer(serializers.ModelSerializer):
    health_center_name = serializers.CharField(source="health_center.name", read_only=True)

    class Meta:
        model = Alert
        fields = "__all__"


class BedAvailabilitySerializer(serializers.ModelSerializer):
    available_beds = serializers.ReadOnlyField()

    class Meta:
        model = HealthCenter
        fields = ["id", "name", "center_type", "district", "total_beds", "occupied_beds", "available_beds"]


class DashboardStatsSerializer(serializers.Serializer):
    total_health_centers = serializers.IntegerField()
    total_patients_today = serializers.IntegerField()
    total_available_beds = serializers.IntegerField()
    total_doctors = serializers.IntegerField()
    doctors_present = serializers.IntegerField()
    medicine_alerts = serializers.IntegerField()
    critical_alerts = serializers.IntegerField()


class AIAssistantSerializer(serializers.Serializer):
    question = serializers.CharField()
