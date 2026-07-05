import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/centers': 'Health Centers',
  '/medicine': 'Medicine Stock',
  '/beds': 'Bed Availability',
  '/doctors': 'Doctor Attendance',
  '/ai-assistant': 'AI Assistant',
};

export default function Navbar({ onMenuToggle }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center px-4 lg:px-6">
      <button onClick={onMenuToggle} className="lg:hidden p-2 mr-3 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <p className="text-xs text-slate-400">SwasthyaSetu AI Management Platform</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-400">📅</span>
            <span className="text-xs text-slate-600 font-medium">
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
