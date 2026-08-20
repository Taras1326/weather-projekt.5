import WeatherCard from '../WeatherCard/WeatherCard';

export default function WeatherList({ cities, unit, favorites, onFavorite, onRefresh, onDelete, onOpen }) {
  if (!cities.length) {
    return (
      <section className="city-section section-shell">
        <div className="empty-state container">
          <span>☀️</span>
          <h2>Add your first city</h2>
          <p>Search above or use your current location to build your personal weather dashboard.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="city-section section-shell" id="menu">
      <div className="section-heading container-wide">
        <div><p className="eyebrow">Saved locations</p><h2>Your cities</h2></div>
        <p>{cities.length} {cities.length === 1 ? 'location' : 'locations'}</p>
      </div>
      <div className="weather-grid container-wide">
        {cities.map(city => (
          <WeatherCard
            key={city.id}
            city={city}
            unit={unit}
            favorite={favorites.includes(city.id)}
            onFavorite={() => onFavorite(city.id)}
            onRefresh={() => onRefresh(city.id)}
            onDelete={() => onDelete(city.id)}
            onOpen={() => onOpen(city)}
          />
        ))}
      </div>
    </section>
  );
}
