import { FiHeart, FiRefreshCw, FiTrash2, FiArrowRight } from 'react-icons/fi';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { formatTemperature } from '../../utils/weather';

export default function WeatherCard({ city, unit, favorite, onFavorite, onRefresh, onDelete, onOpen }) {
  const localTime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: city.timezone }).format(new Date());
  const localDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: '2-digit', day: '2-digit', timeZone: city.timezone }).format(new Date());

  return (
    <article className="weather-card">
      <div className="weather-card-location"><strong>{city.city}</strong><span>{city.country}</span></div>
      <div className="weather-card-time">{localTime}</div>
      <span className="weather-chip">{city.description}</span>
      <div className="weather-card-date">{localDate}</div>
      <WeatherIcon type={city.weatherIcon} size={108} title={city.description} />
      <div className="weather-card-temperature">{formatTemperature(city.temperature, unit)}</div>
      <div className="weather-card-sub">Feels like {formatTemperature(city.feelsLike, unit)}</div>
      <div className="weather-card-actions">
        <button className="icon-button" onClick={onRefresh} title="Refresh"><FiRefreshCw /></button>
        <button className={`icon-button favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite} title="Favourite"><FiHeart /></button>
        <button className="see-more-button" onClick={onOpen}>See more <FiArrowRight /></button>
        <button className="icon-button danger-hover" onClick={onDelete} title="Delete"><FiTrash2 /></button>
      </div>
    </article>
  );
}
