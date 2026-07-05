import os
from datetime import date
from dotenv import load_dotenv
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum, Q, F
from .models import HealthCenter, MedicineStock, Doctor, PatientRecord, Alert
from .serializers import (
    HealthCenterSerializer,
    MedicineStockSerializer,
    DoctorSerializer,
    PatientRecordSerializer,
    AlertSerializer,
    BedAvailabilitySerializer,
    DashboardStatsSerializer,
    AIAssistantSerializer,
)

load_dotenv()


def check_and_create_alerts():
    today = date.today()

    # Medicine stock alerts
    low_stock_items = MedicineStock.objects.filter(status="Low Stock")
    for item in low_stock_items:
        existing = Alert.objects.filter(
            health_center=item.health_center,
            alert_type="Low Stock",
            message__icontains=item.medicine_name,
            created_at__date=today,
        )
        if not existing.exists():
            Alert.objects.create(
                health_center=item.health_center,
                alert_type="Low Stock",
                message=f"{item.medicine_name} may finish in {item.days_left} days.",
                priority="High" if item.days_left <= 2 else "Medium",
            )

    # Bed shortage alerts
    centers = HealthCenter.objects.all()
    for center in centers:
        if center.available_beds <= 2:
            existing = Alert.objects.filter(
                health_center=center,
                alert_type="Bed Shortage",
                created_at__date=today,
            )
            if not existing.exists():
                Alert.objects.create(
                    health_center=center,
                    alert_type="Bed Shortage",
                    message=f"Bed shortage at {center.name}. Only {center.available_beds} beds available.",
                    priority="High",
                )

    # Doctor absent alerts
    absent_doctors = Doctor.objects.filter(attendance_status="Absent")
    for doctor in absent_doctors:
        existing = Alert.objects.filter(
            health_center=doctor.health_center,
            alert_type="Doctor Absent",
            message__icontains=doctor.name,
            created_at__date=today,
        )
        if not existing.exists():
            Alert.objects.create(
                health_center=doctor.health_center,
                alert_type="Doctor Absent",
                message=f"{doctor.name} is absent at {doctor.health_center.name}.",
                priority="Medium",
            )


class HealthCenterViewSet(viewsets.ModelViewSet):
    queryset = HealthCenter.objects.all()
    serializer_class = HealthCenterSerializer

    def perform_create(self, serializer):
        serializer.save()
        check_and_create_alerts()

    def perform_update(self, serializer):
        serializer.save()
        check_and_create_alerts()


class MedicineStockViewSet(viewsets.ModelViewSet):
    queryset = MedicineStock.objects.all()
    serializer_class = MedicineStockSerializer

    def perform_create(self, serializer):
        serializer.save()
        check_and_create_alerts()

    def perform_update(self, serializer):
        serializer.save()
        check_and_create_alerts()


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def perform_create(self, serializer):
        serializer.save()
        check_and_create_alerts()

    def perform_update(self, serializer):
        serializer.save()
        check_and_create_alerts()


class PatientRecordViewSet(viewsets.ModelViewSet):
    queryset = PatientRecord.objects.all()
    serializer_class = PatientRecordSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def bed_availability(request):
    centers = HealthCenter.objects.all()
    serializer = BedAvailabilitySerializer(centers, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    check_and_create_alerts()

    today = date.today()
    stats = {
        "total_health_centers": HealthCenter.objects.count(),
        "total_patients_today": PatientRecord.objects.filter(visit_date=today).count(),
        "total_available_beds": HealthCenter.objects.aggregate(
            total=Sum(F("total_beds") - F("occupied_beds"))
        )["total"] or 0,
        "total_doctors": Doctor.objects.count(),
        "doctors_present": Doctor.objects.filter(attendance_status="Present").count(),
        "medicine_alerts": Alert.objects.filter(alert_type="Low Stock").count(),
        "critical_alerts": Alert.objects.filter(priority="High").count(),
    }
    return Response(stats)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_alerts(request):
    check_and_create_alerts()
    alerts = Alert.objects.all()[:20]
    serializer = AlertSerializer(alerts, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ai_assistant(request):
    serializer = AIAssistantSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    question = serializer.validated_data["question"]

    check_and_create_alerts()

    medicine_data = list(
        MedicineStock.objects.values("medicine_name", "current_stock", "daily_usage", "days_left", "status")
    )
    center_data = list(
        HealthCenter.objects.values("name", "center_type", "district", "total_beds", "occupied_beds")
    )
    doctor_data = list(
        Doctor.objects.values("name", "specialization", "attendance_status", "attendance_percentage")
    )
    alert_data = list(Alert.objects.values("alert_type", "message", "priority"))

    context = f"""
Current Health Center Data:
{center_data}

Current Medicine Stock Data:
{medicine_data}

Current Doctor Data:
{doctor_data}

Current Alerts:
{alert_data}
"""

    try:
        from google import genai

        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        prompt = f"""
You are a health center management AI assistant for SwasthyaSetu. 
Use the following data to answer the admin's question.

Context Data:
{context}

Admin Question: {question}

Provide a clear, concise answer based ONLY on the data above.
"""
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        answer = response.text
    except Exception as e:
        answer = f"AI Assistant is currently unavailable. Error: {str(e)}"

    return Response({"question": question, "answer": answer})
