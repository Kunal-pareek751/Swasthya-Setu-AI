import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/centers', label: 'Health Centers', icon: '🏥' },
  { path: '/medicine', label: 'Medicine Stock', icon: '💊' },
  { path: '/beds', label: 'Bed Availability', icon: '🛏️' },
  { path: '/doctors', label: 'Doctor Attendance', icon: '👨‍⚕️' },
  { path: '/ai-assistant', label: 'AI Assistant', icon: '🤖' },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <>
      {!collapsed && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={onToggle} />
      )}
      <aside
        className={`fixed top-0 left-0 z-30 h-full bg-slate-900 text-white transition-all duration-300 flex flex-col ${
          collapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-64 translate-x-0'
        }`}
      >
        <div className={`flex items-center gap-3 px-6 h-16 border-b border-slate-700/50 ${collapsed ? 'justify-center px-0' : ''}`}>
          <span className="text-2xl">🏥</span>
          {!collapsed && (
            <div>
              <h1 className="text-base font-bold text-white">SwasthyaSetu</h1>
              <p className="text-[10px] text-primary-400 font-medium -mt-0.5">AI-Powered Health Network</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onToggle}
              className={({ isActive }) =>
                `sidebar-link ${collapsed ? 'justify-center px-0 mx-auto w-12 h-12' : ''} ${
                  isActive ? 'bg-primary-600/20 text-primary-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
              title={collapsed ? item.label : undefined}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={`p-4 border-t border-slate-700/50 ${collapsed ? 'text-center' : ''}`}>
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-xs font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-slate-400 truncate">admin@swasthyasetu.in</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-xs font-bold mx-auto">
              A
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
