export const stats = {
  totalHealthCenters: 24,
  totalPatientsToday: 1847,
  availableBeds: 312,
  criticalMedicineAlerts: 5,
  doctorsPresent: 68,
  underResourcedCenters: 4,
};

export const healthCenters = [
  { id: 1, name: 'PHC Ramnagar', type: 'PHC', patientsToday: 142, bedsTotal: 30, bedsOccupied: 22, doctors: 4, status: 'active', lat: 28.6129, lng: 77.2295 },
  { id: 2, name: 'CHC Shahdara', type: 'CHC', patientsToday: 231, bedsTotal: 60, bedsOccupied: 48, doctors: 8, status: 'active', lat: 28.6899, lng: 77.2723 },
  { id: 3, name: 'PHC Dwarka', type: 'PHC', patientsToday: 98, bedsTotal: 20, bedsOccupied: 18, doctors: 3, status: 'active', lat: 28.5921, lng: 77.0457 },
  { id: 4, name: 'CHC Rohini', type: 'CHC', patientsToday: 267, bedsTotal: 50, bedsOccupied: 45, doctors: 7, status: 'active', lat: 28.7341, lng: 77.1042 },
  { id: 5, name: 'PHC Saket', type: 'PHC', patientsToday: 85, bedsTotal: 15, bedsOccupied: 12, doctors: 2, status: 'active', lat: 28.5287, lng: 77.2150 },
  { id: 6, name: 'CHC Lajpat Nagar', type: 'CHC', patientsToday: 198, bedsTotal: 40, bedsOccupied: 35, doctors: 6, status: 'active', lat: 28.5655, lng: 77.2430 },
  { id: 7, name: 'PHC Karol Bagh', type: 'PHC', patientsToday: 76, bedsTotal: 10, bedsOccupied: 10, doctors: 2, status: 'critical', lat: 28.6517, lng: 77.1909 },
  { id: 8, name: 'CHC Pitampura', type: 'CHC', patientsToday: 312, bedsTotal: 55, bedsOccupied: 52, doctors: 8, status: 'active', lat: 28.6998, lng: 77.1438 },
  { id: 9, name: 'PHC Vasant Kunj', type: 'PHC', patientsToday: 63, bedsTotal: 12, bedsOccupied: 8, doctors: 2, status: 'active', lat: 28.5330, lng: 77.1550 },
  { id: 10, name: 'CHC Sarita Vihar', type: 'CHC', patientsToday: 175, bedsTotal: 35, bedsOccupied: 30, doctors: 5, status: 'active', lat: 28.5270, lng: 77.2910 },
  { id: 11, name: 'PHC Nilothi', type: 'PHC', patientsToday: 54, bedsTotal: 8, bedsOccupied: 8, doctors: 1, status: 'critical', lat: 28.6720, lng: 77.0590 },
  { id: 12, name: 'CHC Janakpuri', type: 'CHC', patientsToday: 146, bedsTotal: 30, bedsOccupied: 24, doctors: 4, status: 'active', lat: 28.6213, lng: 77.0899 },
];

export const medicineStock = [
  { id: 1, name: 'Paracetamol 500mg', currentStock: 1200, dailyUsage: 400, daysLeft: 3, status: 'critical' },
  { id: 2, name: 'Amoxicillin 250mg', currentStock: 800, dailyUsage: 100, daysLeft: 8, status: 'low' },
  { id: 3, name: 'Cetirizine 10mg', currentStock: 2500, dailyUsage: 200, daysLeft: 12, status: 'sufficient' },
  { id: 4, name: 'Metformin 500mg', currentStock: 300, dailyUsage: 120, daysLeft: 2, status: 'critical' },
  { id: 5, name: 'Amlodipine 5mg', currentStock: 900, dailyUsage: 80, daysLeft: 11, status: 'low' },
  { id: 6, name: 'Omeprazole 20mg', currentStock: 1500, dailyUsage: 150, daysLeft: 10, status: 'low' },
  { id: 7, name: 'Azithromycin 500mg', currentStock: 200, dailyUsage: 90, daysLeft: 2, status: 'critical' },
  { id: 8, name: 'Ibuprofen 400mg', currentStock: 3500, dailyUsage: 250, daysLeft: 14, status: 'sufficient' },
  { id: 9, name: 'ORS Powder', currentStock: 500, dailyUsage: 200, daysLeft: 2, status: 'critical' },
  { id: 10, name: 'Vitamin B Complex', currentStock: 1800, dailyUsage: 100, daysLeft: 18, status: 'sufficient' },
  { id: 11, name: 'Iron Folic Acid', currentStock: 600, dailyUsage: 80, daysLeft: 7, status: 'low' },
  { id: 12, name: 'Doxycycline 100mg', currentStock: 400, dailyUsage: 60, daysLeft: 6, status: 'low' },
];

export const bedData = [
  { center: 'PHC Ramnagar', total: 30, occupied: 22, available: 8 },
  { center: 'CHC Shahdara', total: 60, occupied: 48, available: 12 },
  { center: 'PHC Dwarka', total: 20, occupied: 18, available: 2 },
  { center: 'CHC Rohini', total: 50, occupied: 45, available: 5 },
  { center: 'PHC Saket', total: 15, occupied: 12, available: 3 },
  { center: 'CHC Lajpat Nagar', total: 40, occupied: 35, available: 5 },
  { center: 'PHC Karol Bagh', total: 10, occupied: 10, available: 0 },
  { center: 'CHC Pitampura', total: 55, occupied: 52, available: 3 },
  { center: 'PHC Vasant Kunj', total: 12, occupied: 8, available: 4 },
  { center: 'CHC Sarita Vihar', total: 35, occupied: 30, available: 5 },
  { center: 'PHC Nilothi', total: 8, occupied: 8, available: 0 },
  { center: 'CHC Janakpuri', total: 30, occupied: 24, available: 6 },
];

export const doctorAttendance = [
  { id: 1, name: 'Dr. Rajesh Kumar', center: 'PHC Ramnagar', present: true, totalDays: 22, attendedDays: 20, percentage: 91 },
  { id: 2, name: 'Dr. Priya Sharma', center: 'CHC Shahdara', present: true, totalDays: 22, attendedDays: 21, percentage: 95 },
  { id: 3, name: 'Dr. Amit Verma', center: 'PHC Dwarka', present: false, totalDays: 22, attendedDays: 17, percentage: 77 },
  { id: 4, name: 'Dr. Sunita Gupta', center: 'CHC Rohini', present: true, totalDays: 22, attendedDays: 22, percentage: 100 },
  { id: 5, name: 'Dr. Vikram Singh', center: 'PHC Saket', present: true, totalDays: 22, attendedDays: 19, percentage: 86 },
  { id: 6, name: 'Dr. Neha Patel', center: 'CHC Lajpat Nagar', present: false, totalDays: 22, attendedDays: 16, percentage: 73 },
  { id: 7, name: 'Dr. Sanjay Joshi', center: 'PHC Karol Bagh', present: true, totalDays: 22, attendedDays: 20, percentage: 91 },
  { id: 8, name: 'Dr. Ananya Reddy', center: 'CHC Pitampura', present: true, totalDays: 22, attendedDays: 21, percentage: 95 },
  { id: 9, name: 'Dr. Manoj Tiwari', center: 'PHC Vasant Kunj', present: false, totalDays: 22, attendedDays: 15, percentage: 68 },
  { id: 10, name: 'Dr. Pooja Mehta', center: 'CHC Sarita Vihar', present: true, totalDays: 22, attendedDays: 18, percentage: 82 },
  { id: 11, name: 'Dr. Ravi Shankar', center: 'PHC Nilothi', present: true, totalDays: 22, attendedDays: 22, percentage: 100 },
  { id: 12, name: 'Dr. Deepika Chauhan', center: 'CHC Janakpuri', present: false, totalDays: 22, attendedDays: 14, percentage: 64 },
  { id: 13, name: 'Dr. Arun Prakash', center: 'PHC Ramnagar', present: true, totalDays: 22, attendedDays: 19, percentage: 86 },
  { id: 14, name: 'Dr. Meera Nair', center: 'CHC Shahdara', present: true, totalDays: 22, attendedDays: 20, percentage: 91 },
];

export const chartData = {
  patientsOverWeek: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Patients',
        data: [1240, 1480, 1620, 1580, 1847, 1720, 1390],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  },
  centersByType: {
    labels: ['PHC', 'CHC'],
    datasets: [
      {
        data: [7, 5],
        backgroundColor: ['#3b82f6', '#22c55e'],
        borderWidth: 0,
      },
    ],
  },
  bedUtilization: {
    labels: healthCenters.map(c => c.name.replace('PHC ', '').replace('CHC ', '')),
    datasets: [
      {
        label: 'Occupied',
        data: healthCenters.map(c => c.bedsOccupied),
        backgroundColor: '#f87171',
        borderRadius: 4,
      },
      {
        label: 'Available',
        data: healthCenters.map(c => c.bedsTotal - c.bedsOccupied),
        backgroundColor: '#4ade80',
        borderRadius: 4,
      },
    ],
  },
  doctorsAttendance: {
    labels: doctorAttendance.map(d => d.name.split(' ')[1]),
    datasets: [
      {
        label: 'Attendance %',
        data: doctorAttendance.map(d => d.percentage),
        backgroundColor: doctorAttendance.map(d => d.percentage >= 85 ? '#22c55e' : d.percentage >= 70 ? '#f59e0b' : '#ef4444'),
        borderRadius: 6,
      },
    ],
  },
};

export const aiResponses = {
  'Which medicine is low?': 'Based on current stock data, **Metformin 500mg** (2 days left), **ORS Powder** (2 days left), and **Paracetamol 500mg** (3 days left) are critically low and need immediate replenishment. **Azithromycin 500mg** (2 days left) also requires urgent action.',
  'Which health center needs urgent support?': '⚠️ **PHC Karol Bagh** and **PHC Nilothi** are in critical condition with 100% bed occupancy and only 1-2 doctors available. **CHC Pitampura** (52/55 beds occupied) and **CHC Rohini** (45/50 beds occupied) also need immediate support.',
  'Show bed shortage centers.': 'Centers with critical bed shortage (< 3 available beds):\n1. **PHC Karol Bagh** — 0 beds available (100% occupied)\n2. **PHC Nilothi** — 0 beds available (100% occupied)\n3. **PHC Dwarka** — 2 beds available\n4. **CHC Pitampura** — 3 beds available\n5. **PHC Saket** — 3 beds available',
  'Show patient trends': 'Patient inflow has increased by **12%** this week compared to last week. Tuesday and Wednesday saw the highest footfall. **CHC Pitampura** recorded the highest single-day count of 312 patients.',
  'default': 'I can help you with:\n- 📊 "Which medicine is low?" — Check critical medicine stocks\n- 🏥 "Which health center needs urgent support?" — Identify under-resourced centers\n- 🛏️ "Show bed shortage centers." — Find centers with bed availability issues\n- 📈 "Show patient trends" — View patient inflow analytics\n\nHow can I assist you today? 🙏',
};
