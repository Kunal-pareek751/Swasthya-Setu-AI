import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import DataTable from '../components/DataTable';
import { healthCenters } from '../data/dummyData';

const icon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background:#2563eb;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2);">🏥</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

const criticalIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background:#dc2626;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2);">⚠️</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

const columns = [
  { key: 'name', label: 'Center Name', render: (val, row) => (
    <div className="flex items-center gap-2">
      <span className="text-lg">{row.type === 'PHC' ? '🏥' : '🏨'}</span>
      <div>
        <p className="font-medium text-slate-800">{val}</p>
        <p className="text-xs text-slate-400">{row.type}</p>
      </div>
    </div>
  )},
  { key: 'patientsToday', label: 'Patients Today', render: (val) => (
    <span className="font-semibold text-slate-700">{val}</span>
  )},
  { key: 'bedsTotal', label: 'Total Beds', render: (val, row) => (
    <span className={`font-medium ${row.bedsTotal - row.bedsOccupied <= 2 ? 'text-danger-600' : 'text-slate-700'}`}>
      {val}
    </span>
  )},
  { key: 'bedsOccupied', label: 'Occupied', render: (val, row) => (
    <div className="flex items-center gap-2">
      <span className="font-medium text-slate-700">{val}</span>
      <div className="flex-1 max-w-[80px] h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-danger-400 rounded-full" style={{ width: `${(val / row.bedsTotal) * 100}%` }} />
      </div>
    </div>
  )},
  { key: 'doctors', label: 'Doctors', render: (val) => (
    <span className="font-medium text-slate-700">{val}</span>
  )},
  { key: 'status', label: 'Status', render: (val) => (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
      val === 'active' ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${val === 'active' ? 'bg-success-500' : 'bg-danger-500'}`} />
      {val === 'active' ? 'Active' : 'Critical'}
    </span>
  )},
];

export default function HealthCenters() {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl">🏥</div>
          <div>
            <p className="text-xs text-slate-500">Total PHCs</p>
            <p className="text-2xl font-bold text-slate-800">{healthCenters.filter(c => c.type === 'PHC').length}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center text-xl">🏨</div>
          <div>
            <p className="text-xs text-slate-500">Total CHCs</p>
            <p className="text-2xl font-bold text-slate-800">{healthCenters.filter(c => c.type === 'CHC').length}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-danger-50 text-danger-600 flex items-center justify-center text-xl">⚠️</div>
          <div>
            <p className="text-xs text-slate-500">Critical Centers</p>
            <p className="text-2xl font-bold text-danger-600">{healthCenters.filter(c => c.status === 'critical').length}</p>
          </div>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">📍 Health Center Map</h3>
        </div>
        <div className="h-[350px]">
          {mapReady && (
            <MapContainer center={[28.62, 77.18]} zoom={11} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {healthCenters.map((center) => (
                <Marker
                  key={center.id}
                  position={[center.lat, center.lng]}
                  icon={center.status === 'critical' ? criticalIcon : icon}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-bold text-slate-800">{center.name}</p>
                      <p className="text-xs text-slate-500">{center.type}</p>
                      <hr className="my-1" />
                      <p>Patients: <strong>{center.patientsToday}</strong></p>
                      <p>Beds: <strong>{center.bedsOccupied}/{center.bedsTotal}</strong></p>
                      <p>Doctors: <strong>{center.doctors}</strong></p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={healthCenters}
        searchable
        searchPlaceholder="Search health centers..."
      />
    </div>
  );
}
