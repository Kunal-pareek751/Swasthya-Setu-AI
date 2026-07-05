from django.core.management.base import BaseCommand
from datetime import date, timedelta
from api.models import HealthCenter, MedicineStock, Doctor, PatientRecord, Alert


class Command(BaseCommand):
    help = "Seed the database with sample data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding data...")

        Alert.objects.all().delete()
        PatientRecord.objects.all().delete()
        Doctor.objects.all().delete()
        MedicineStock.objects.all().delete()
        HealthCenter.objects.all().delete()

        centers = []

        centers.append(HealthCenter.objects.create(
            name="Urban PHC Alipur",
            center_type="PHC",
            district="North Delhi",
            address="Alipur, North Delhi",
            total_beds=30,
            occupied_beds=28
        ))

        centers.append(HealthCenter.objects.create(
            name="Rural PHC Bawana",
            center_type="PHC",
            district="North West Delhi",
            address="Bawana, North West Delhi",
            total_beds=20,
            occupied_beds=20
        ))

        centers.append(HealthCenter.objects.create(
            name="CHC Rohini",
            center_type="CHC",
            district="North West Delhi",
            address="Sector 3, Rohini, Delhi",
            total_beds=100,
            occupied_beds=95
        ))

        centers.append(HealthCenter.objects.create(
            name="PHC Najafgarh",
            center_type="PHC",
            district="South West Delhi",
            address="Najafgarh, Delhi",
            total_beds=25,
            occupied_beds=22
        ))

        centers.append(HealthCenter.objects.create(
            name="CHC Sarita Vihar",
            center_type="CHC",
            district="South East Delhi",
            address="Sarita Vihar, Delhi",
            total_beds=80,
            occupied_beds=60
        ))

        self.stdout.write(f"Created {len(centers)} health centers")

        medicines = [
            MedicineStock.objects.create(health_center=centers[0], medicine_name="Paracetamol", current_stock=500, daily_usage=100),
            MedicineStock.objects.create(health_center=centers[0], medicine_name="Amoxicillin", current_stock=50, daily_usage=15),
            MedicineStock.objects.create(health_center=centers[1], medicine_name="Paracetamol", current_stock=200, daily_usage=80),
            MedicineStock.objects.create(health_center=centers[1], medicine_name="Cetirizine", current_stock=30, daily_usage=10),
            MedicineStock.objects.create(health_center=centers[2], medicine_name="Insulin", current_stock=20, daily_usage=5),
            MedicineStock.objects.create(health_center=centers[2], medicine_name="Paracetamol", current_stock=1000, daily_usage=200),
            MedicineStock.objects.create(health_center=centers[2], medicine_name="Amoxicillin", current_stock=100, daily_usage=30),
            MedicineStock.objects.create(health_center=centers[3], medicine_name="Cetirizine", current_stock=10, daily_usage=4),
            MedicineStock.objects.create(health_center=centers[3], medicine_name="Paracetamol", current_stock=300, daily_usage=120),
            MedicineStock.objects.create(health_center=centers[4], medicine_name="Insulin", current_stock=60, daily_usage=10),
        ]

        self.stdout.write(f"Created {len(medicines)} medicine stock records")

        doctors = [
            Doctor.objects.create(health_center=centers[0], name="Rajesh Kumar", specialization="General Medicine", attendance_status="Present", attendance_percentage=95.5),
            Doctor.objects.create(health_center=centers[0], name="Priya Sharma", specialization="Pediatrics", attendance_status="Absent", attendance_percentage=82.0),
            Doctor.objects.create(health_center=centers[1], name="Amit Singh", specialization="General Medicine", attendance_status="Present", attendance_percentage=98.0),
            Doctor.objects.create(health_center=centers[2], name="Sunita Verma", specialization="Gynecology", attendance_status="Present", attendance_percentage=91.0),
            Doctor.objects.create(health_center=centers[2], name="Vikram Patel", specialization="Orthopedics", attendance_status="Absent", attendance_percentage=76.5),
            Doctor.objects.create(health_center=centers[2], name="Anita Gupta", specialization="Pediatrics", attendance_status="Present", attendance_percentage=100.0),
            Doctor.objects.create(health_center=centers[3], name="Deepak Yadav", specialization="General Medicine", attendance_status="Present", attendance_percentage=88.0),
            Doctor.objects.create(health_center=centers[4], name="Neha Joshi", specialization="General Medicine", attendance_status="Absent", attendance_percentage=70.0),
        ]

        self.stdout.write(f"Created {len(doctors)} doctors")

        base_date = date.today()

        patients = [
            PatientRecord.objects.create(health_center=centers[0], patient_name="Ravi Das", age=45, gender="Male", disease="Fever", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[0], patient_name="Sita Devi", age=60, gender="Female", disease="Diabetes", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[0], patient_name="Mohan Lal", age=30, gender="Male", disease="Malaria", visit_date=base_date - timedelta(days=1)),
            PatientRecord.objects.create(health_center=centers[0], patient_name="Gita Kumari", age=25, gender="Female", disease="Typhoid", visit_date=base_date - timedelta(days=1)),

            PatientRecord.objects.create(health_center=centers[1], patient_name="Ram Singh", age=50, gender="Male", disease="Hypertension", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[1], patient_name="Lakshmi Bai", age=35, gender="Female", disease="Anemia", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[1], patient_name="Krishna Murari", age=28, gender="Male", disease="Viral Fever", visit_date=base_date - timedelta(days=2)),
            PatientRecord.objects.create(health_center=centers[1], patient_name="Radha Devi", age=55, gender="Female", disease="Arthritis", visit_date=base_date - timedelta(days=2)),

            PatientRecord.objects.create(health_center=centers[2], patient_name="Arjun Reddy", age=42, gender="Male", disease="Heart Disease", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[2], patient_name="Kavita Joshi", age=32, gender="Female", disease="Thyroid", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[2], patient_name="Suresh Nair", age=48, gender="Male", disease="Kidney Stone", visit_date=base_date - timedelta(days=1)),
            PatientRecord.objects.create(health_center=centers[2], patient_name="Meena Pillai", age=38, gender="Female", disease="Respiratory Infection", visit_date=base_date - timedelta(days=1)),
            PatientRecord.objects.create(health_center=centers[2], patient_name="Vijay Kumar", age=62, gender="Male", disease="Diabetes", visit_date=base_date),

            PatientRecord.objects.create(health_center=centers[3], patient_name="Anil Kapoor", age=44, gender="Male", disease="Dengue", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[3], patient_name="Poonam Gupta", age=29, gender="Female", disease="Pregnancy Checkup", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[3], patient_name="Rahul Sharma", age=36, gender="Male", disease="Skin Infection", visit_date=base_date),

            PatientRecord.objects.create(health_center=centers[4], patient_name="Shanti Devi", age=70, gender="Female", disease="Blood Pressure", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[4], patient_name="Manoj Tiwari", age=55, gender="Male", disease="Asthma", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[4], patient_name="Asha Singh", age=40, gender="Female", disease="Diabetes", visit_date=base_date),
            PatientRecord.objects.create(health_center=centers[4], patient_name="Sanjay Gupta", age=33, gender="Male", disease="Tuberculosis", visit_date=base_date),
        ]

        self.stdout.write(f"Created {len(patients)} patients")

        alerts = [
            Alert.objects.create(health_center=centers[0], alert_type="Low Stock", message="Paracetamol may finish in 5 days.", priority="Medium"),
            Alert.objects.create(health_center=centers[1], alert_type="Low Stock", message="Cetirizine may finish in 3 days.", priority="High"),
            Alert.objects.create(health_center=centers[1], alert_type="Bed Shortage", message="Bed shortage at Rural PHC Bawana. Only 0 beds available.", priority="High"),
            Alert.objects.create(health_center=centers[2], alert_type="Doctor Absent", message="Vikram Patel is absent at CHC Rohini.", priority="Medium"),
            Alert.objects.create(health_center=centers[4], alert_type="Doctor Absent", message="Neha Joshi is absent at CHC Sarita Vihar.", priority="Medium"),
        ]

        self.stdout.write(f"Created {len(alerts)} alerts")

        self.stdout.write(self.style.SUCCESS("Successfully seeded all data!"))