import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { formatHour, formatTemperature } from '../../utils/weather';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function HourlyForecast({ city, unit }) {
  const [range, setRange] = useState(24);
  const items = city?.hourly?.slice(0, range) || [];

  const chartData = useMemo(() => ({
    labels: items.map(item => formatHour(item.time, city?.timezone)),
    datasets: [{
      data: items.map(item => unit === 'F' ? (item.temperature * 9) / 5 + 32 : item.temperature),
      borderColor: '#ff9f43',
      backgroundColor: 'rgba(255,159,67,.12)',
      pointRadius: 0,
      pointHoverRadius: 5,
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    }],
  }), [items, unit, city?.timezone]);

  if (!city) return null;

  return (
    <section className="hourly-section section-shell">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">Next hours</p><h2>Hourly forecast</h2></div>
          <div className="segmented-control"><button className={range === 12 ? 'active' : ''} onClick={() => setRange(12)}>12h</button><button className={range === 24 ? 'active' : ''} onClick={() => setRange(24)}>24h</button><button className={range === 48 ? 'active' : ''} onClick={() => setRange(48)}>48h</button></div>
        </div>

        <div className="hourly-strip">
          {items.slice(0, 12).map(item => (
            <div className="hour-card" key={item.time}>
              <span>{formatHour(item.time, city.timezone)}</span>
              <WeatherIcon type={item.icon} size={42} title={item.label} />
              <strong>{formatTemperature(item.temperature, unit)}</strong>
              <small>☔ {Math.round(item.precipitationProbability ?? 0)}%</small>
            </div>
          ))}
        </div>

        <div className="chart-card">
          <Line data={chartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { intersect: false, mode: 'index' } },
            scales: {
              x: { grid: { display: false }, ticks: { maxTicksLimit: 12 } },
              y: { grid: { color: 'rgba(120,120,120,.12)' }, ticks: { callback: value => `${Math.round(value)}°` } },
            },
          }} />
        </div>
      </div>
    </section>
  );
}
