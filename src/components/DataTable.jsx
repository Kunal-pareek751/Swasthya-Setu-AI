import { useState } from 'react';

export default function DataTable({ columns, data, searchable = false, searchPlaceholder = 'Search...' }) {
  const [search, setSearch] = useState('');

  const filtered = searchable
    ? data.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
    : data;

  return (
    <div className="card overflow-hidden p-0">
      {searchable && (
        <div className="p-4 border-b border-slate-100">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field max-w-xs text-sm"
          />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              {columns.map((col) => (
                <th key={col.key} className="table-header">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="table-cell">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-slate-400 text-sm">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Showing {filtered.length} of {data.length} entries</span>
      </div>
    </div>
  );
}
