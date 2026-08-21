import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { formatTemperature } from "../../utils/weather";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function WeeklyForecast({ city, unit }) {
  const { language, t } = useLanguage();

  if (!city) {
    return null;
  }

  const localeMap = {
    en: "en-US",
    de: "de-DE",
    uk: "uk-UA",
    ru: "ru-RU",
  };

  const locale = localeMap[language] || "en-US";

  const text = {
    en: {
      longRange: "Long range",
      planAhead: "Plan ahead with daily trends",
      today: "Today",
      tomorrow: "Tomorrow",
    },

    de: {
      longRange: "Langfristige Vorhersage",
      planAhead: "Plane voraus mit täglichen Wettertrends",
      today: "Heute",
      tomorrow: "Morgen",
    },

    uk: {
      longRange: "Довгостроковий прогноз",
      planAhead: "Плануйте наперед за щоденними погодними тенденціями",
      today: "Сьогодні",
      tomorrow: "Завтра",
    },

    ru: {
      longRange: "Долгосрочный прогноз",
      planAhead: "Планируйте заранее по ежедневным погодным тенденциям",
      today: "Сегодня",
      tomorrow: "Завтра",
    },
  };

  const currentText = text[language] || text.en;

  const getDateLabel = (dateValue) => {
    const date = new Date(dateValue);

    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);

    const sameDay = (first, second) =>
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();

    if (sameDay(date, today)) {
      return currentText.today;
    }

    if (sameDay(date, tomorrow)) {
      return currentText.tomorrow;
    }

    return new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: city.timezone,
    }).format(date);
  };

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

  const translateWeatherLabel = (label) => {
    const dictionary = weatherLabels[language] || weatherLabels.en;

    return dictionary[label] || label;
  };

  return (
    <section className="weekly-section section-shell">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{currentText.longRange}</p>

            <h2>{t("weather.forecast14")}</h2>
          </div>

          <p>{currentText.planAhead}</p>
        </div>

        <div className="forecast-list">
          {city.forecast.map((day) => (
            <article className="forecast-row" key={day.date}>
              <strong>{getDateLabel(day.date)}</strong>

              <div className="forecast-condition">
                <WeatherIcon
                  type={day.icon}
                  size={36}
                  title={translateWeatherLabel(day.label)}
                />

                <span>{translateWeatherLabel(day.label)}</span>
              </div>

              <div className="forecast-temp">
                <b>{formatTemperature(day.maxTemperature, unit)}</b>

                <span>{formatTemperature(day.minTemperature, unit)}</span>
              </div>

              <span className="forecast-rain">
                ☔ {Math.round(day.precipitationProbability ?? 0)}%
              </span>

              <span className="forecast-wind">
                💨 {Math.round(day.windSpeedMax)} km/h
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
