import {
    FiRefreshCw,
    FiHeart,
    FiTrash2,
  } from 'react-icons/fi';
  
  import './WeatherCard.css';
  
  function WeatherCard({
    city,
    country,
    temperature,
    icon,
    description,
    date,
    onRefresh,
    onDelete,
    onOpen,
  }) {
    return (
      <article className="weather-card">
        <div className="weather-card-location">
          <span>{city}</span>
          <span>{country}</span>
        </div>
  
        <div className="weather-card-date">
          {date}
        </div>
  
        <div className="weather-icon">
          {icon && (
            <img
              src={`https:${icon}`}
              alt={description}
            />
          )}
        </div>
  
        <div className="weather-card-temperature">
          {temperature}°C
        </div>
  
        <div className="weather-card-actions">
          <button
            type="button"
            className="refresh-button"
            onClick={onRefresh}
          >
            <FiRefreshCw />
          </button>
  
          <button
            type="button"
            className="favorite-button"
          >
            <FiHeart />
          </button>
  
          <button
            type="button"
            className="more-button"
            onClick={onOpen}
          >
            See more
          </button>
  
          <button
            type="button"
            className="delete-button"
            onClick={onDelete}
          >
            <FiTrash2 />
          </button>
        </div>
      </article>
    );
  }
  
  export default WeatherCard;