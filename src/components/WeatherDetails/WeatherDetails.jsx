import {
  FiActivity,
  FiCloud,
  FiDroplet,
  FiEye,
  FiGauge,
  FiSunrise,
  FiSunset,
  FiWind,
  FiUmbrella,
} from 'react-icons/fi';
import { formatTemperature, formatWind, getAqiLabel, getUvLabel, getWindDirection } from '../../utils/weather';

function Metric({ icon, label, value, note }) {
  return (
    <article className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</div>
    </article>
  );
}

export default function WeatherDetails({ city, unit }) {
  if (!city) return null;
  const aqi = getAqiLabel(city.airQuality?.europeanAqi);
  const time = value => value ? new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: city.timezone }).format(new Date(value)) : '—';

  return (
    <section className="details-section section-shell">
      <div className="container">
        <div className="section-heading details-heading">
          <div><p className="eyebrow">Live conditions</p><h2>{city.city} details</h2></div>
          <span className="updated-pill">Updated {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: city.timezone }).format(new Date(city.updatedAt))}</span>
        </div>
        <div className="metrics-grid">
          <Metric icon={<FiActivity />} label="Feels like" value={formatTemperature(city.feelsLike, unit)} note={`${formatTemperature(city.minTemperature, unit)} min · ${formatTemperature(city.maxTemperature, unit)} max`} />
          <Metric icon={<FiDroplet />} label="Humidity" value={`${Math.round(city.humidity)}%`} note="Relative humidity" />
          <Metric icon={<FiGauge />} label="Pressure" value={`${Math.round(city.pressure)} hPa`} note="Sea-level pressure" />
          <Metric icon={<FiWind />} label="Wind" value={formatWind(city.windSpeed, unit)} note={`${getWindDirection(city.windDirection)} · gusts ${formatWind(city.windGusts, unit)}`} />
          <Metric icon={<FiEye />} label="Visibility" value={`${city.visibility.toFixed(1)} km`} note={city.visibility >= 10 ? 'Very good' : 'Reduced'} />
          <Metric icon={<FiCloud />} label="Cloud cover" value={`${Math.round(city.cloudCover)}%`} note={city.description} />
          <Metric icon={<FiUmbrella />} label="Rain chance" value={`${Math.round(city.precipitationProbability ?? 0)}%`} note={`${Number(city.precipitation || 0).toFixed(1)} mm now`} />
          <Metric icon={<span className="uv-mark">UV</span>} label="UV index" value={`${Math.round(city.uvIndex ?? 0)}`} note={getUvLabel(city.uvIndex)} />
          <Metric icon={<span className={`aqi-dot ${aqi.level}`} />} label="Air quality" value={city.airQuality?.europeanAqi != null ? `${Math.round(city.airQuality.europeanAqi)} AQI` : '—'} note={aqi.label} />
          <Metric icon={<FiSunrise />} label="Sunrise" value={time(city.sunrise)} note="Local time" />
          <Metric icon={<FiSunset />} label="Sunset" value={time(city.sunset)} note="Local time" />
          <Metric icon={<FiDroplet />} label="PM2.5" value={city.airQuality?.pm25 != null ? `${Math.round(city.airQuality.pm25)} µg/m³` : '—'} note="Fine particles" />
        </div>
      </div>
    </section>
  );
}
