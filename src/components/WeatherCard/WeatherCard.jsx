import { FiHeart, FiRefreshCw, FiTrash2, FiArrowRight } from "react-icons/fi";

import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { formatTemperature } from "../../utils/weather";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function WeatherCard({
  city,
  unit,
  favorite,
  onFavorite,
  onRefresh,
  onDelete,
  onOpen,
}) {
  const { language, t } = useLanguage();

  const localeMap = {
    en: "en-US",
    de: "de-DE",
    uk: "uk-UA",
    ru: "ru-RU",
  };

  const locale = localeMap[language] || "en-US";

  const text = {
    en: {
      refresh: "Refresh",
      favourite: "Favourite",
      delete: "Delete",
      seeMore: "See more",
      feelsLike: "Feels like",
    },

    de: {
      refresh: "Aktualisieren",
      favourite: "Favorit",
      delete: "Löschen",
      seeMore: "Mehr anzeigen",
      feelsLike: "Gefühlt",
    },

    uk: {
      refresh: "Оновити",
      favourite: "В обране",
      delete: "Видалити",
      seeMore: "Детальніше",
      feelsLike: "Відчувається як",
    },

    ru: {
      refresh: "Обновить",
      favourite: "В избранное",
      delete: "Удалить",
      seeMore: "Подробнее",
      feelsLike: "Ощущается как",
    },
  };

  const currentText = text[language] || text.en;

  const weatherLabels = {
    en: {
      Clear: "Clear",
      Sunny: "Sunny",
      Cloudy: "Cloudy",
      Overcast: "Overcast",
      "Partly cloudy": "Partly cloudy",
      Rain: "Rain",
      Drizzle: "Drizzle",
      Snow: "Snow",
      Fog: "Fog",
      Thunderstorm: "Thunderstorm",
    },

    de: {
      Clear: "Klar",
      Sunny: "Sonnig",
      Cloudy: "Bewölkt",
      Overcast: "Bedeckt",
      "Partly cloudy": "Teilweise bewölkt",
      Rain: "Regen",
      Drizzle: "Nieselregen",
      Snow: "Schnee",
      Fog: "Nebel",
      Thunderstorm: "Gewitter",
    },

    uk: {
      Clear: "Ясно",
      Sunny: "Сонячно",
      Cloudy: "Хмарно",
      Overcast: "Похмуро",
      "Partly cloudy": "Мінлива хмарність",
      Rain: "Дощ",
      Drizzle: "Мряка",
      Snow: "Сніг",
      Fog: "Туман",
      Thunderstorm: "Гроза",
    },

    ru: {
      Clear: "Ясно",
      Sunny: "Солнечно",
      Cloudy: "Облачно",
      Overcast: "Пасмурно",
      "Partly cloudy": "Переменная облачность",
      Rain: "Дождь",
      Drizzle: "Морось",
      Snow: "Снег",
      Fog: "Туман",
      Thunderstorm: "Гроза",
    },
  };

  const translateWeather = (value) => {
    const dictionary = weatherLabels[language] || weatherLabels.en;

    return dictionary[value] || value;
  };

  const localTime = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: city.timezone,
  }).format(new Date());

  const localDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
    timeZone: city.timezone,
  }).format(new Date());

  const translatedDescription = translateWeather(city.description);

  return (
    <article className="weather-card">
      <div className="weather-card-location">
        <strong>{city.city}</strong>
        <span>{city.country}</span>
      </div>

      <div className="weather-card-time">{localTime}</div>

      <span className="weather-chip">{translatedDescription}</span>

      <div className="weather-card-date">{localDate}</div>

      <WeatherIcon
        type={city.weatherIcon}
        size={108}
        title={translatedDescription}
      />

      <div className="weather-card-temperature">
        {formatTemperature(city.temperature, unit)}
      </div>

      <div className="weather-card-sub">
        {t("weather.feelsLike")} {formatTemperature(city.feelsLike, unit)}
      </div>

      <div className="weather-card-actions">
        <button
          className="icon-button"
          onClick={onRefresh}
          title={currentText.refresh}
          aria-label={currentText.refresh}
        >
          <FiRefreshCw />
        </button>

        <button
          className={`icon-button favorite-button ${
            favorite ? "is-favorite" : ""
          }`}
          onClick={onFavorite}
          title={currentText.favourite}
          aria-label={currentText.favourite}
        >
          <FiHeart />
        </button>

        <button className="see-more-button" onClick={onOpen}>
          {currentText.seeMore}
          <FiArrowRight />
        </button>

        <button
          className="icon-button danger-hover"
          onClick={onDelete}
          title={currentText.delete}
          aria-label={currentText.delete}
        >
          <FiTrash2 />
        </button>
      </div>
    </article>
  );
}
