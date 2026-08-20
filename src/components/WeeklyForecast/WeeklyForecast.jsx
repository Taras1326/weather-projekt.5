import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { formatShortDate, formatTemperature } from '../../utils/weather';

export default function WeeklyForecast({ city, unit }) {
  if (!city) return null;
  return (
    <section className="weekly-section section-shell">
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow">Long range</p><h2>14-day forecast</h2></div><p>Plan ahead with daily trends</p></div>
        <div className="forecast-list">
          {city.forecast.map(day => (
            <article className="forecast-row" key={day.date}>
              <strong>{formatShortDate(day.date, city.timezone)}</strong>
              <div className="forecast-condition"><WeatherIcon type={day.icon} size={36} title={day.label} /><span>{day.label}</span></div>
              <div className="forecast-temp"><b>{formatTemperature(day.maxTemperature, unit)}</b><span>{formatTemperature(day.minTemperature, unit)}</span></div>
              <span className="forecast-rain">☔ {Math.round(day.precipitationProbability ?? 0)}%</span>
              <span className="forecast-wind">💨 {Math.round(day.windSpeedMax)} km/h</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
