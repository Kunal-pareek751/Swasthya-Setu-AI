from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r"health-centers", views.HealthCenterViewSet, basename="health-center")
router.register(r"medicine-stock", views.MedicineStockViewSet, basename="medicine-stock")
router.register(r"doctors", views.DoctorViewSet, basename="doctor")
router.register(r"patients", views.PatientRecordViewSet, basename="patient")

urlpatterns = [
    # Auth
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Dashboard
    path("dashboard/stats/", views.dashboard_stats, name="dashboard-stats"),
    path("dashboard/alerts/", views.dashboard_alerts, name="dashboard-alerts"),
    # Beds
    path("beds/", views.bed_availability, name="bed-availability"),
    # AI Assistant
    path("ai-assistant/", views.ai_assistant, name="ai-assistant"),
    # Router URLs
    path("", include(router.urls)),
]
