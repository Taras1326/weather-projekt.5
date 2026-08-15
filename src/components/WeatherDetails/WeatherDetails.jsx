import {
    FiDroplet,
    FiWind,
    FiEye,
    FiActivity,
  } from 'react-icons/fi';
  
  import './WeatherDetails.css';
  
  function WeatherDetails({ city }) {
    if (!city) {
      return null;
    }
  
    return (
      <section className="weather-details">
        <div className="weather-details-container container">
  
          <div className="weather-details-header">
            <div>
              <h2>{city.city}</h2>
              <p>{city.country}</p>
            </div>
  
            <div className="weather-details-temperature">
              <span>{city.temperature}°C</span>
  
              <img
                src={`https:${city.icon}`}
                alt={city.description}
              />
            </div>
          </div>
  
          <div className="weather-details-description">
            {city.description}
          </div>
  
          <div className="weather-details-grid">
  
            <div className="weather-detail-item">
              <span>Feels like</span>
              <strong>
                {city.feelsLike}°C
              </strong>
            </div>
  
            <div className="weather-detail-item">
              <span>Min temperature</span>
              <strong>
                {city.minTemperature}°C
              </strong>
            </div>
  
            <div className="weather-detail-item">
              <span>Max temperature</span>
              <strong>
                {city.maxTemperature}°C
              </strong>
            </div>
  
            <div className="weather-detail-item">
              <FiDroplet />
  
              <span>Humidity</span>
  
              <strong>
                {city.humidity}%
              </strong>
            </div>
  
            <div className="weather-detail-item">
              <FiActivity />
  
              <span>Pressure</span>
  
              <strong>
                {city.pressure} hPa
              </strong>
            </div>
  
            <div className="weather-detail-item">
              <FiWind />
  
              <span>Wind speed</span>
  
              <strong>
                {city.windSpeed} km/h
              </strong>
            </div>
  
            <div className="weather-detail-item">
              <FiEye />
  
              <span>Visibility</span>
  
              <strong>
                {city.visibility} km
              </strong>
            </div>
  
          </div>
        </div>
      </section>
    );
  }
  
  export default WeatherDetails;