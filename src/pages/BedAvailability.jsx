import DataTable from '../components/DataTable';
import ChartCard from '../components/ChartCard';
import AlertCard from '../components/AlertCard';
import { bedData } from '../data/dummyData';

const columns = [
  { key: 'center', label: 'Health Center', render: (val) => (
    <div className="flex items-center gap-2">
      <span className="text-lg">🛏️</span>
      <span className="font-medium text-slate-800">{val}</span>
    </div>
  )},
  { key: 'total', label: 'Total Beds', render: (val) => (
    <span className="font-semibold text-slate-700">{val}</span>
  )},
  { key: 'occupied', label: 'Occupied', render: (val, row) => (
    <div className="flex items-center gap-2">
      <span className={`font-medium ${(val / row.total) > 0.9 ? 'text-danger-600' : 'text-slate-700'}`}>{val}</span>
      <div className="flex-1 max-w-[80px] h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-primary-500" style={{ width: `${(val / row.total) * 100}%` }} />
      </div>
    </div>
  )},
  { key: 'available', label: 'Available', render: (val, row) => {
    const pct = row.occupied / row.total;
    return (
      <span className={`font-bold ${
        pct >= 1 ? 'text-danger-600' : pct >= 0.9 ? 'text-warning-600' : 'text-success-600'
      }`}>
        {val}
      </span>
    );
  }},
  { key: 'occupancy', label: 'Occupancy Rate', render: (val, row) => {
    const pct = Math.round((row.occupied / row.total) * 100);
    return (
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          pct >= 90 ? 'bg-danger-100 text-danger-700' :
          pct >= 75 ? 'bg-warning-100 text-warning-700' :
          'bg-success-100 text-success-700'
        }`}>
          {pct}%
        </span>
      </div>
    );
  }},
];

const chartData = {
  labels: bedData.map((b) => b.center.replace('PHC ', '').replace('CHC ', '')),
  datasets: [
    {
      label: 'Available Beds',
      data: bedData.map((b) => b.available),
      backgroundColor: bedData.map((b) => {
        const pct = b.occupied / b.total;
        return pct >= 1 ? '#ef4444' : pct >= 0.9 ? '#f59e0b' : '#4ade80';
      }),
      borderRadius: 6,
    },
  ],
};

export default function BedAvailability() {
  const totalBeds = bedData.reduce((s, b) => s + b.total, 0);
  const occupiedBeds = bedData.reduce((s, b) => s + b.occupied, 0);
  const availableBeds = bedData.reduce((s, b) => s + b.available, 0);
  const criticalBeds = bedData.filter((b) => b.available <= 2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl">🛏️</div>
          <div>
            <p className="text-xs text-slate-500">Total Beds</p>
            <p className="text-2xl font-bold text-slate-800">{totalBeds}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning-50 text-warning-600 flex items-center justify-center text-xl">📋</div>
          <div>
            <p className="text-xs text-slate-500">Occupied Beds</p>
            <p className="text-2xl font-bold text-warning-600">{occupiedBeds}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center text-xl">✅</div>
          <div>
            <p className="text-xs text-slate-500">Available Beds</p>
            <p className="text-2xl font-bold text-success-600">{availableBeds}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Available Beds by Center"
            subtitle="Green = sufficient, Yellow = low, Red = critical"
            type="bar"
            data={chartData}
            height={300}
          />
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800">🚨 Critical Bed Shortage</h3>
          {criticalBeds.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-3xl mb-2">✅</p>
              <p className="text-sm text-slate-500">No critical bed shortages</p>
            </div>
          ) : (
            <div className="space-y-2">
              {criticalBeds.map((b) => (
                <AlertCard
                  key={b.center}
                  type={b.available === 0 ? 'danger' : 'warning'}
                  title={b.center}
                  message={`${b.available} bed${b.available !== 1 ? 's' : ''} available out of ${b.total} total beds (${Math.round((b.occupied / b.total) * 100)}% occupied)`}
                  action="View"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={bedData}
        searchable
        searchPlaceholder="Search centers..."
      />
    </div>
  );
}
