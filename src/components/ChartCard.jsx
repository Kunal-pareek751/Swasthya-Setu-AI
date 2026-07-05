import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleFont: { size: 12 },
      bodyFont: { size: 12 },
      padding: 10,
      cornerRadius: 8,
    },
  },
};

export default function ChartCard({ title, subtitle, type = 'line', data, options = {}, height = 250, actions }) {
  const chartOptions = {
    ...chartDefaults,
    ...options,
    plugins: {
      ...chartDefaults.plugins,
      ...options.plugins,
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={{ ...chartOptions, elements: { point: { radius: 3, hoverRadius: 5 } } }} />;
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={{ ...chartOptions, cutout: '70%', plugins: { ...chartOptions.plugins, legend: { display: true, position: 'bottom', labels: { usePointStyle: true, padding: 16, font: { size: 11 } } } } }} />;
      default:
        return <Line data={data} options={chartOptions} />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </div>
  );
}
