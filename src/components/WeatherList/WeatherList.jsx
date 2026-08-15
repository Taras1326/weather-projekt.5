import WeatherCard from '../WeatherCard/WeatherCard';

import './WeatherList.css';

function WeatherList({
  cities,
  onRefresh,
  onDelete,
  onOpen,
}) {
  if (!cities || cities.length === 0) {
    return (
      <section className="weather-list-section">
        <div className="weather-empty">
          <p>
            Search for a city to add it to your
            weather list.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="weather-list-section">
      <div className="weather-list">
        {cities.map(city => (
          <WeatherCard
            key={city.id}
            city={city.city}
            country={city.country}
            temperature={city.temperature}
            icon={city.icon}
            description={city.description}
            date={city.updatedAt}
            onRefresh={() =>
              onRefresh(city.id)
            }
            onDelete={() =>
              onDelete(city.id)
            }
            onOpen={() =>
              onOpen(city)
            }
          />
        ))}
      </div>
    </section>
  );
}

export default WeatherList;