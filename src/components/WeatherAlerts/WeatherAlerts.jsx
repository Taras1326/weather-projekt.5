import { useState } from "react";
import {
  FiBell,
  FiX,
  FiCloudRain,
  FiWind,
  FiCloudLightning,
  FiSun,
  FiThermometer,
  FiCloudSnow,
} from "react-icons/fi";

import "./WeatherAlerts.css";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function WeatherAlerts({ weather }) {
  const [isOpen, setIsOpen] = useState(false);

  const { language } = useLanguage();

  const text = {
    en: {
      weatherAlerts: "Weather alerts",
      quickNotifications: "Quick notifications",

      strongWind: "Strong wind",
      strongWindText: "Wind gusts may reach",

      rain: "High chance of rain",
      rainText: "Rain probability today is",

      thunderstorm: "Thunderstorm warning",
      thunderstormText: "Thunderstorms are possible in the next hours.",

      highUv: "High UV index",
      highUvText: "Sunscreen and sunglasses are recommended.",

      heat: "Extreme heat",
      heatText: "Very high temperature is expected today.",

      cold: "Cold weather",
      coldText: "Low temperature is expected.",

      snow: "Snow warning",
      snowText: "Snow is possible in the next hours.",

      noWarnings: "No important warnings",
      noWarningsText: "There are no important weather warnings right now.",

      noWeather: "Weather data unavailable",
      noWeatherText: "Select a city to see weather alerts.",

      close: "Close weather alerts",
      open: "Open weather alerts",

      kmh: "km/h",
    },

    de: {
      weatherAlerts: "Wetterwarnungen",
      quickNotifications: "Schnelle Benachrichtigungen",

      strongWind: "Starker Wind",
      strongWindText: "Windböen können erreichen",

      rain: "Hohe Regenwahrscheinlichkeit",
      rainText: "Die Regenwahrscheinlichkeit heute beträgt",

      thunderstorm: "Gewitterwarnung",
      thunderstormText: "In den nächsten Stunden sind Gewitter möglich.",

      highUv: "Hoher UV-Index",
      highUvText: "Sonnencreme und Sonnenbrille werden empfohlen.",

      heat: "Extreme Hitze",
      heatText: "Heute wird eine sehr hohe Temperatur erwartet.",

      cold: "Kalte Temperaturen",
      coldText: "Niedrige Temperaturen werden erwartet.",

      snow: "Schneewarnung",
      snowText: "In den nächsten Stunden ist Schnee möglich.",

      noWarnings: "Keine wichtigen Warnungen",
      noWarningsText: "Zurzeit gibt es keine wichtigen Wetterwarnungen.",

      noWeather: "Keine Wetterdaten",
      noWeatherText: "Wähle eine Stadt aus, um Wetterwarnungen zu sehen.",

      close: "Wetterwarnungen schließen",
      open: "Wetterwarnungen öffnen",

      kmh: "km/h",
    },

    uk: {
      weatherAlerts: "Погодні сповіщення",
      quickNotifications: "Швидкі сповіщення",

      strongWind: "Сильний вітер",
      strongWindText: "Пориви вітру можуть досягати",

      rain: "Висока ймовірність дощу",
      rainText: "Ймовірність опадів сьогодні",

      thunderstorm: "Попередження про грозу",
      thunderstormText: "У найближчі години можливі грози.",

      highUv: "Високий UV-індекс",
      highUvText: "Рекомендуються сонцезахисний крем та окуляри.",

      heat: "Сильна спека",
      heatText: "Сьогодні очікується дуже висока температура.",

      cold: "Сильний холод",
      coldText: "Очікується низька температура.",

      snow: "Попередження про сніг",
      snowText: "У найближчі години можливий сніг.",

      noWarnings: "Важливих попереджень немає",
      noWarningsText: "Зараз немає важливих погодних попереджень.",

      noWeather: "Немає даних про погоду",
      noWeatherText: "Виберіть місто, щоб побачити погодні сповіщення.",

      close: "Закрити погодні сповіщення",
      open: "Відкрити погодні сповіщення",

      kmh: "км/год",
    },

    ru: {
      weatherAlerts: "Погодные уведомления",
      quickNotifications: "Быстрые уведомления",

      strongWind: "Сильный ветер",
      strongWindText: "Порывы ветра могут достигать",

      rain: "Высокая вероятность дождя",
      rainText: "Вероятность осадков сегодня",

      thunderstorm: "Предупреждение о грозе",
      thunderstormText: "В ближайшие часы возможны грозы.",

      highUv: "Высокий UV-индекс",
      highUvText: "Рекомендуются солнцезащитный крем и очки.",

      heat: "Сильная жара",
      heatText: "Сегодня ожидается очень высокая температура.",

      cold: "Сильный холод",
      coldText: "Ожидается низкая температура.",

      snow: "Предупреждение о снеге",
      snowText: "В ближайшие часы возможен снег.",

      noWarnings: "Важных предупреждений нет",
      noWarningsText: "Сейчас нет важных погодных предупреждений.",

      noWeather: "Нет данных о погоде",
      noWeatherText: "Выберите город, чтобы увидеть погодные уведомления.",

      close: "Закрыть погодные уведомления",
      open: "Открыть погодные уведомления",

      kmh: "км/ч",
    },
  };

  const t = text[language] || text.en;

  const alerts = [];

  if (weather) {
    // =========================================
    // СИЛЬНИЙ ВІТЕР
    // =========================================

    if (Number(weather.windGusts) >= 50) {
      alerts.push({
        id: "wind",
        type: "wind",
        icon: <FiWind />,
        title: t.strongWind,
        description: `${t.strongWindText} ${Math.round(
          Number(weather.windGusts)
        )} ${t.kmh}.`,
      });
    }

    // =========================================
    // ДОЩ
    // =========================================

    if (Number(weather.precipitationProbability) >= 60) {
      alerts.push({
        id: "rain",
        type: "rain",
        icon: <FiCloudRain />,
        title: t.rain,
        description: `${t.rainText} ${Math.round(
          Number(weather.precipitationProbability)
        )}%.`,
      });
    }

    // =========================================
    // UV
    // =========================================

    if (Number(weather.uvIndex) >= 6) {
      alerts.push({
        id: "uv",
        type: "uv",
        icon: <FiSun />,
        title: t.highUv,
        description: `UV ${Math.round(Number(weather.uvIndex))}. ${
          t.highUvText
        }`,
      });
    }

    // =========================================
    // СПЕКА
    // =========================================

    if (Number(weather.maxTemperature) >= 35) {
      alerts.push({
        id: "heat",
        type: "heat",
        icon: <FiThermometer />,
        title: t.heat,
        description: `${t.heatText} ${Math.round(
          Number(weather.maxTemperature)
        )}°C.`,
      });
    }

    // =========================================
    // ХОЛОД
    // =========================================

    if (Number(weather.minTemperature) <= -5) {
      alerts.push({
        id: "cold",
        type: "cold",
        icon: <FiThermometer />,
        title: t.cold,
        description: `${t.coldText} ${Math.round(
          Number(weather.minTemperature)
        )}°C.`,
      });
    }

    // =========================================
    // ГРОЗА
    // Open-Meteo weather codes:
    // 95, 96, 99
    // =========================================

    const thunderstormCodes = [95, 96, 99];

    const hasThunderstormNow = thunderstormCodes.includes(
      Number(weather.weatherCode)
    );

    const hasThunderstormSoon =
      Array.isArray(weather.hourly) &&
      weather.hourly
        .slice(0, 12)
        .some((item) => thunderstormCodes.includes(Number(item.weatherCode)));

    if (hasThunderstormNow || hasThunderstormSoon) {
      alerts.push({
        id: "storm",
        type: "storm",
        icon: <FiCloudLightning />,
        title: t.thunderstorm,
        description: t.thunderstormText,
      });
    }

    // =========================================
    // СНІГ
    // =========================================

    const snowCodes = [71, 73, 75, 77, 85, 86];

    const hasSnowNow = snowCodes.includes(Number(weather.weatherCode));

    const hasSnowSoon =
      Array.isArray(weather.hourly) &&
      weather.hourly
        .slice(0, 12)
        .some((item) => snowCodes.includes(Number(item.weatherCode)));

    if (hasSnowNow || hasSnowSoon) {
      alerts.push({
        id: "snow",
        type: "snow",
        icon: <FiCloudSnow />,
        title: t.snow,
        description: t.snowText,
      });
    }
  }

  return (
    <div className="weather-alerts">
      {isOpen && (
        <div className="weather-alerts__panel">
          <div className="weather-alerts__header">
            <div>
              <p className="weather-alerts__eyebrow">{t.weatherAlerts}</p>

              <h3>{t.quickNotifications}</h3>
            </div>

            <button
              type="button"
              className="weather-alerts__close"
              onClick={() => setIsOpen(false)}
              aria-label={t.close}
              title={t.close}
            >
              <FiX />
            </button>
          </div>

          <div className="weather-alerts__list">
            {!weather ? (
              <div className="weather-alerts__empty">
                <FiSun />

                <div>
                  <h4>{t.noWeather}</h4>
                  <p>{t.noWeatherText}</p>
                </div>
              </div>
            ) : alerts.length > 0 ? (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`weather-alerts__item weather-alerts__item--${alert.type}`}
                >
                  <div className="weather-alerts__item-icon">{alert.icon}</div>

                  <div>
                    <h4>{alert.title}</h4>
                    <p>{alert.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="weather-alerts__empty">
                <FiSun />

                <div>
                  <h4>{t.noWarnings}</h4>
                  <p>{t.noWarningsText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        className="weather-alerts__button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t.open}
        title={t.open}
      >
        <FiBell />

        {alerts.length > 0 && (
          <span className="weather-alerts__badge">
            {alerts.length > 9 ? "9+" : alerts.length}
          </span>
        )}
      </button>
    </div>
  );
}
