import DataTable from '../components/DataTable';
import ChartCard from '../components/ChartCard';
import { doctorAttendance, chartData } from '../data/dummyData';

const columns = [
  { key: 'name', label: 'Doctor Name', render: (val) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
        {val.split(' ')[1]?.[0] || val[0]}
      </div>
      <span className="font-medium text-slate-800">{val}</span>
    </div>
  )},
  { key: 'center', label: 'Health Center', render: (val) => (
    <span className="text-slate-600">{val}</span>
  )},
  { key: 'present', label: 'Status', render: (val) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
      val ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${val ? 'bg-success-500' : 'bg-danger-500'}`} />
      {val ? 'Present' : 'Absent'}
    </span>
  )},
  { key: 'attendedDays', label: 'Attended / Total', render: (val, row) => (
    <span className="text-slate-600">{row.attendedDays} / {row.totalDays} days</span>
  )},
  { key: 'percentage', label: 'Attendance %', render: (val) => {
    const color = val >= 85 ? 'text-success-600' : val >= 70 ? 'text-warning-600' : 'text-danger-600';
    const bg = val >= 85 ? 'bg-success-100' : val >= 70 ? 'bg-warning-100' : 'bg-danger-100';
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 max-w-[120px] h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${
            val >= 85 ? 'bg-success-500' : val >= 70 ? 'bg-warning-500' : 'bg-danger-500'
          }`} style={{ width: `${val}%` }} />
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${bg} ${color}`}>
          {val}%
        </span>
      </div>
    );
  }},
];

export default function DoctorAttendance() {
  const present = doctorAttendance.filter((d) => d.present).length;
  const absent = doctorAttendance.filter((d) => !d.present).length;
  const avgAttendance = Math.round(doctorAttendance.reduce((s, d) => s + d.percentage, 0) / doctorAttendance.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl">👨‍⚕️</div>
          <div>
            <p className="text-xs text-slate-500">Total Doctors</p>
            <p className="text-2xl font-bold text-slate-800">{doctorAttendance.length}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center text-xl">✅</div>
          <div>
            <p className="text-xs text-slate-500">Present Today</p>
            <p className="text-2xl font-bold text-success-600">{present}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-danger-50 text-danger-600 flex items-center justify-center text-xl">❌</div>
          <div>
            <p className="text-xs text-slate-500">Absent Today</p>
            <p className="text-2xl font-bold text-danger-600">{absent}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl">📊</div>
          <div>
            <p className="text-xs text-slate-500">Avg Attendance</p>
            <p className="text-2xl font-bold text-slate-800">{avgAttendance}%</p>
          </div>
        </div>
      </div>

      <ChartCard
        title="Doctor Attendance Overview"
        subtitle="Green ≥ 85% | Yellow ≥ 70% | Red < 70%"
        type="bar"
        data={chartData.doctorsAttendance}
        height={300}
      />

      <DataTable
        columns={columns}
        data={doctorAttendance}
        searchable
        searchPlaceholder="Search doctors..."
      />
    </div>
  );
}
