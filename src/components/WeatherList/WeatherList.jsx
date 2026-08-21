import WeatherCard from '../WeatherCard/WeatherCard';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function WeatherList({
  cities,
  unit,
  favorites,
  onFavorite,
  onRefresh,
  onDelete,
  onOpen,
}) {
  const { language } = useLanguage();

  const text = {
    en: {
      addFirstCity: 'Add your first city',
      emptyDescription:
        'Search above or use your current location to build your personal weather dashboard.',
      savedLocations: 'Saved locations',
      yourCities: 'Your cities',
      location: 'location',
      locations: 'locations',
    },

    de: {
      addFirstCity: 'Füge deine erste Stadt hinzu',
      emptyDescription:
        'Suche oben nach einer Stadt oder verwende deinen aktuellen Standort, um deine persönliche Wetterübersicht zu erstellen.',
      savedLocations: 'Gespeicherte Orte',
      yourCities: 'Deine Städte',
      location: 'Ort',
      locations: 'Orte',
    },

    uk: {
      addFirstCity: 'Додайте своє перше місто',
      emptyDescription:
        'Знайдіть місто вище або використайте своє поточне місцезнаходження, щоб створити власну погодну панель.',
      savedLocations: 'Збережені місця',
      yourCities: 'Ваші міста',
      location: 'місто',
      locations: 'міст',
    },

    ru: {
      addFirstCity: 'Добавьте свой первый город',
      emptyDescription:
        'Найдите город выше или используйте своё текущее местоположение, чтобы создать личную панель погоды.',
      savedLocations: 'Сохранённые места',
      yourCities: 'Ваши города',
      location: 'город',
      locations: 'городов',
    },
  };

  const currentText = text[language] || text.en;

  const getLocationText = count => {
    if (language === 'uk') {
      if (count === 1) return 'місто';
      if (count >= 2 && count <= 4) return 'міста';
      return 'міст';
    }

    if (language === 'ru') {
      if (count === 1) return 'город';
      if (count >= 2 && count <= 4) return 'города';
      return 'городов';
    }

    return count === 1
      ? currentText.location
      : currentText.locations;
  };

  if (!cities.length) {
    return (
      <section className="city-section section-shell">
        <div className="empty-state container">
          <span>☀️</span>

          <h2>
            {currentText.addFirstCity}
          </h2>

          <p>
            {currentText.emptyDescription}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="city-section section-shell"
      id="menu"
    >
      <div className="section-heading container-wide">
        <div>
          <p className="eyebrow">
            {currentText.savedLocations}
          </p>

          <h2>
            {currentText.yourCities}
          </h2>
        </div>

        <p>
          {cities.length} {getLocationText(cities.length)}
        </p>
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