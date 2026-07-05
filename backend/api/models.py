from django.db import models


class HealthCenter(models.Model):
    CENTER_TYPES = [
        ("PHC", "Primary Health Center"),
        ("CHC", "Community Health Center"),
    ]

    name = models.CharField(max_length=255)
    center_type = models.CharField(max_length=3, choices=CENTER_TYPES)
    district = models.CharField(max_length=255)
    address = models.TextField()
    total_beds = models.PositiveIntegerField(default=0)
    occupied_beds = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=50, default="Active")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "health_centers"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.get_center_type_display()})"

    @property
    def available_beds(self):
        return self.total_beds - self.occupied_beds


class MedicineStock(models.Model):
    STATUS_CHOICES = [
        ("Available", "Available"),
        ("Low Stock", "Low Stock"),
    ]

    health_center = models.ForeignKey(
        HealthCenter, on_delete=models.CASCADE, related_name="medicine_stocks"
    )
    medicine_name = models.CharField(max_length=255)
    current_stock = models.PositiveIntegerField(default=0)
    daily_usage = models.PositiveIntegerField(default=0)
    days_left = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="Available")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "medicine_stocks"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.medicine_name} @ {self.health_center.name}"

    def save(self, *args, **kwargs):
        if self.daily_usage > 0:
            self.days_left = self.current_stock // self.daily_usage
        else:
            self.days_left = 999
        if self.days_left <= 5:
            self.status = "Low Stock"
        else:
            self.status = "Available"
        super().save(*args, **kwargs)


class Doctor(models.Model):
    ATTENDANCE_STATUS = [
        ("Present", "Present"),
        ("Absent", "Absent"),
    ]

    health_center = models.ForeignKey(
        HealthCenter, on_delete=models.CASCADE, related_name="doctors"
    )
    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    attendance_status = models.CharField(
        max_length=10, choices=ATTENDANCE_STATUS, default="Present"
    )
    attendance_percentage = models.FloatField(default=100.0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "doctors"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Dr. {self.name} ({self.specialization})"


class PatientRecord(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ]

    health_center = models.ForeignKey(
        HealthCenter, on_delete=models.CASCADE, related_name="patient_records"
    )
    patient_name = models.CharField(max_length=255)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    disease = models.CharField(max_length=255)
    visit_date = models.DateField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "patient_records"
        ordering = ["-visit_date"]

    def __str__(self):
        return f"{self.patient_name} - {self.disease}"


class Alert(models.Model):
    PRIORITY_CHOICES = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
    ]

    health_center = models.ForeignKey(
        HealthCenter, on_delete=models.CASCADE, related_name="alerts"
    )
    alert_type = models.CharField(max_length=255)
    message = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default="Medium")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "alerts"
        ordering = ["-created_at"]

    def __str__(self):
        return f"[{self.priority}] {self.alert_type} @ {self.health_center.name}"
