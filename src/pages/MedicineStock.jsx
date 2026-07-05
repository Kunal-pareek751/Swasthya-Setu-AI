import DataTable from '../components/DataTable';
import AlertCard from '../components/AlertCard';
import { medicineStock } from '../data/dummyData';

const statusStyles = {
  critical: 'bg-danger-50 text-danger-700 border-danger-200',
  low: 'bg-warning-50 text-warning-700 border-warning-200',
  sufficient: 'bg-success-50 text-success-700 border-success-200',
};

const columns = [
  { key: 'name', label: 'Medicine Name', render: (val) => (
    <div className="flex items-center gap-2">
      <span className="text-lg">💊</span>
      <span className="font-medium text-slate-800">{val}</span>
    </div>
  )},
  { key: 'currentStock', label: 'Current Stock', render: (val, row) => (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-slate-700">{val.toLocaleString()}</span>
      <span className="text-xs text-slate-400">units</span>
    </div>
  )},
  { key: 'dailyUsage', label: 'Daily Usage', render: (val) => (
    <span className="text-slate-600">{val.toLocaleString()} units/day</span>
  )},
  { key: 'daysLeft', label: 'Days Left', render: (val, row) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 max-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${
          val <= 3 ? 'bg-danger-500' : val <= 7 ? 'bg-warning-500' : 'bg-success-500'
        }`} style={{ width: `${Math.min((val / 30) * 100, 100)}%` }} />
      </div>
      <span className={`text-xs font-bold ${
        val <= 3 ? 'text-danger-600' : val <= 7 ? 'text-warning-600' : 'text-success-600'
      }`}>
        {val} days
      </span>
    </div>
  )},
  { key: 'status', label: 'Status', render: (val) => (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[val]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        val === 'critical' ? 'bg-danger-500' : val === 'low' ? 'bg-warning-500' : 'bg-success-500'
      }`} />
      {val === 'critical' ? 'Critical' : val === 'low' ? 'Low' : 'Sufficient'}
    </span>
  )},
];

export default function MedicineStock() {
  const criticalMeds = medicineStock.filter((m) => m.status === 'critical');
  const lowMeds = medicineStock.filter((m) => m.status === 'low');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-danger-50 text-danger-600 flex items-center justify-center text-xl">🚨</div>
          <div>
            <p className="text-xs text-slate-500">Critical (≤3 days)</p>
            <p className="text-2xl font-bold text-danger-600">{criticalMeds.length}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning-50 text-warning-600 flex items-center justify-center text-xl">⚠️</div>
          <div>
            <p className="text-xs text-slate-500">Low (≤7 days)</p>
            <p className="text-2xl font-bold text-warning-600">{lowMeds.length}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center text-xl">✅</div>
          <div>
            <p className="text-xs text-slate-500">Sufficient</p>
            <p className="text-2xl font-bold text-success-600">
              {medicineStock.filter((m) => m.status === 'sufficient').length}
            </p>
          </div>
        </div>
      </div>

      {criticalMeds.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-800">🚨 Immediate Attention Required</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {criticalMeds.map((med) => (
              <AlertCard
                key={med.id}
                type="danger"
                title={`${med.name} may finish in ${med.daysLeft} day${med.daysLeft > 1 ? 's' : ''}`}
                message={`Current stock: ${med.currentStock.toLocaleString()} units | Daily usage: ${med.dailyUsage} units | Only ${med.daysLeft} day${med.daysLeft > 1 ? 's' : ''} of supply remaining.`}
                action="Reorder"
              />
            ))}
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={medicineStock}
        searchable
        searchPlaceholder="Search medicines..."
      />
    </div>
  );
}
