import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import AlertCard from '../components/AlertCard';
import { stats, medicineStock, bedData, chartData } from '../data/dummyData';

export default function Dashboard() {
  const criticalMeds = medicineStock.filter((m) => m.status === 'critical');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon="🏥" label="Total Health Centers" value={stats.totalHealthCenters} trend={0} color="primary" />
        <StatCard icon="🧑‍🤝‍🧑" label="Total Patients Today" value={stats.totalPatientsToday} trend={12} color="primary" />
        <StatCard icon="🛏️" label="Available Beds" value={stats.availableBeds} trend={-5} color="success" />
        <StatCard icon="🚨" label="Critical Medicine Alerts" value={stats.criticalMedicineAlerts} color="danger" />
        <StatCard icon="👨‍⚕️" label="Doctors Present Today" value={stats.doctorsPresent} trend={3} color="primary" />
        <StatCard icon="⚠️" label="Under-resourced Centers" value={stats.underResourcedCenters} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Patient Footfall"
            subtitle="Last 7 days across all centers"
            type="line"
            data={chartData.patientsOverWeek}
            height={250}
          />
        </div>
        <ChartCard
          title="Centers by Type"
          subtitle="PHC vs CHC distribution"
          type="doughnut"
          data={chartData.centersByType}
          height={250}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Bed Utilization by Center"
          subtitle="Occupied vs Available beds"
          type="bar"
          data={chartData.bedUtilization}
          height={250}
        />
        <ChartCard
          title="Doctor Attendance"
          subtitle="Individual attendance percentage"
          type="bar"
          data={chartData.doctorsAttendance}
          height={250}
        />
      </div>

      {criticalMeds.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">🚨 Critical Medicine Alerts</h3>
            <span className="text-xs text-slate-400">{criticalMeds.length} items need attention</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {criticalMeds.map((med) => (
              <AlertCard
                key={med.id}
                type="danger"
                title={`${med.name}`}
                message={`Only ${med.currentStock} units left. May finish in ${med.daysLeft} day${med.daysLeft > 1 ? 's' : ''} at current usage rate.`}
                action="Order Now"
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-bold text-slate-800 mb-3">🏥 Centers with Critical Bed Shortage</h3>
          <div className="space-y-2">
            {bedData.filter((b) => b.available <= 2).map((b) => (
              <div key={b.center} className="flex items-center justify-between p-3 bg-danger-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-800">{b.center}</p>
                  <p className="text-xs text-slate-500">{b.available} beds available out of {b.total}</p>
                </div>
                <span className="text-xs font-bold text-danger-600 bg-danger-100 px-2 py-1 rounded-full">
                  {Math.round((b.occupied / b.total) * 100)}% full
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm font-bold text-slate-800 mb-3">👨‍⚕️ Doctors with Low Attendance</h3>
          <div className="space-y-2">
            {chartData.doctorsAttendance.labels.slice(8, 12).map((name, i) => {
              const pct = chartData.doctorsAttendance.datasets[0].data.slice(8, 12)[i];
              const doctor = [
                { name: 'Dr. Manoj Tiwari', center: 'PHC Vasant Kunj' },
                { name: 'Dr. Deepika Chauhan', center: 'CHC Janakpuri' },
                { name: 'Dr. Amit Verma', center: 'PHC Dwarka' },
                { name: 'Dr. Neha Patel', center: 'CHC Lajpat Nagar' },
              ][i];
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{doctor.name}</p>
                    <p className="text-xs text-slate-500">{doctor.center}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${pct < 70 ? 'bg-danger-100 text-danger-600' : 'bg-warning-100 text-warning-600'}`}>
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
