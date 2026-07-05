export default function AlertCard({ type = 'info', title, message, action }) {
  const styles = {
    danger: {
      bg: 'bg-danger-50 border-danger-200',
      icon: 'text-danger-500',
      badge: 'bg-danger-500 text-white',
    },
    warning: {
      bg: 'bg-warning-50 border-warning-200',
      icon: 'text-warning-600',
      badge: 'bg-warning-500 text-white',
    },
    info: {
      bg: 'bg-primary-50 border-primary-200',
      icon: 'text-primary-600',
      badge: 'bg-primary-500 text-white',
    },
    success: {
      bg: 'bg-success-50 border-success-200',
      icon: 'text-success-600',
      badge: 'bg-success-500 text-white',
    },
  };

  const s = styles[type] || styles.info;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${s.bg}`}>
      <div className={`text-lg ${s.icon}`}>
        {type === 'danger' ? '🚨' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-600 mt-0.5">{message}</p>
      </div>
      {action && (
        <button className={`px-3 py-1.5 rounded-lg text-xs font-medium ${s.badge} whitespace-nowrap`}>
          {action}
        </button>
      )}
    </div>
  );
}
