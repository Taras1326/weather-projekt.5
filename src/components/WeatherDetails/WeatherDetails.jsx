import {
  FiActivity,
  FiCloud,
  FiDroplet,
  FiEye,
  FiCompass,
  FiSunrise,
  FiSunset,
  FiWind,
  FiUmbrella,
} from "react-icons/fi";

import {
  formatTemperature,
  formatWind,
  getAqiLabel,
  getUvLabel,
  getWindDirection,
} from "../../utils/weather";

import { useLanguage } from "../context/LanguageContext.jsx";

function Metric({ icon, label, value, note }) {
  return (
    <article className="metric-card">
      <div className="metric-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>

        {note && <small>{note}</small>}
      </div>
    </article>
  );
}

export default function WeatherDetails({ city, unit }) {
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

  const localText = {
    en: {
      liveConditions: "Live conditions",
      details: "details",
      updated: "Updated",
      min: "min",
      max: "max",
      relativeHumidity: "Relative humidity",
      seaLevelPressure: "Sea-level pressure",
      gusts: "gusts",
      veryGood: "Very good",
      reduced: "Reduced",
      now: "now",
      localTime: "Local time",
      fineParticles: "Fine particles",

      uv: {
        Low: "Low",
        Moderate: "Moderate",
        High: "High",
        "Very high": "Very high",
        Extreme: "Extreme",
      },

      aqi: {
        Good: "Good",
        Fair: "Fair",
        Moderate: "Moderate",
        Poor: "Poor",
        "Very poor": "Very poor",
        "Extremely poor": "Extremely poor",
      },
    },

    de: {
      liveConditions: "Aktuelle Bedingungen",
      details: "Wetterdetails",
      updated: "Aktualisiert",
      min: "Min.",
      max: "Max.",
      relativeHumidity: "Relative Luftfeuchtigkeit",
      seaLevelPressure: "Luftdruck auf Meereshöhe",
      gusts: "Böen",
      veryGood: "Sehr gut",
      reduced: "Eingeschränkt",
      now: "jetzt",
      localTime: "Ortszeit",
      fineParticles: "Feinstaub",

      uv: {
        Low: "Niedrig",
        Moderate: "Mittel",
        High: "Hoch",
        "Very high": "Sehr hoch",
        Extreme: "Extrem",
      },

      aqi: {
        Good: "Gut",
        Fair: "Zufriedenstellend",
        Moderate: "Mittel",
        Poor: "Schlecht",
        "Very poor": "Sehr schlecht",
        "Extremely poor": "Extrem schlecht",
      },
    },

    uk: {
      liveConditions: "Поточні умови",
      details: "деталі погоди",
      updated: "Оновлено",
      min: "мін.",
      max: "макс.",
      relativeHumidity: "Відносна вологість",
      seaLevelPressure: "Тиск на рівні моря",
      gusts: "пориви",
      veryGood: "Дуже добра",
      reduced: "Обмежена",
      now: "зараз",
      localTime: "Місцевий час",
      fineParticles: "Дрібнодисперсні частинки",

      uv: {
        Low: "Низький",
        Moderate: "Помірний",
        High: "Високий",
        "Very high": "Дуже високий",
        Extreme: "Екстремальний",
      },

      aqi: {
        Good: "Добра",
        Fair: "Задовільна",
        Moderate: "Помірна",
        Poor: "Погана",
        "Very poor": "Дуже погана",
        "Extremely poor": "Надзвичайно погана",
      },
    },

    ru: {
      liveConditions: "Текущие условия",
      details: "детали погоды",
      updated: "Обновлено",
      min: "мин.",
      max: "макс.",
      relativeHumidity: "Относительная влажность",
      seaLevelPressure: "Давление на уровне моря",
      gusts: "порывы",
      veryGood: "Очень хорошая",
      reduced: "Ограниченная",
      now: "сейчас",
      localTime: "Местное время",
      fineParticles: "Мелкодисперсные частицы",

      uv: {
        Low: "Низкий",
        Moderate: "Умеренный",
        High: "Высокий",
        "Very high": "Очень высокий",
        Extreme: "Экстремальный",
      },

      aqi: {
        Good: "Хорошее",
        Fair: "Удовлетворительное",
        Moderate: "Умеренное",
        Poor: "Плохое",
        "Very poor": "Очень плохое",
        "Extremely poor": "Крайне плохое",
      },
    },
  };

  const text = localText[language] || localText.en;

  const aqi = getAqiLabel(city.airQuality?.europeanAqi);

  const uvLabel = getUvLabel(city.uvIndex);

  const translatedUv = text.uv[uvLabel] || uvLabel;

  const translatedAqi = text.aqi[aqi.label] || aqi.label;

  const time = (value) => {
    if (!value) {
      return "—";
    }

    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: city.timezone,
    }).format(new Date(value));
  };

  const updatedTime = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: city.timezone,
  }).format(new Date(city.updatedAt));

  return (
    <section className="details-section section-shell">
      <div className="container">
        <div className="section-heading details-heading">
          <div>
            <p className="eyebrow">{text.liveConditions}</p>

            <h2>
              {city.city} {text.details}
            </h2>
          </div>

          <span className="updated-pill">
            {text.updated} {updatedTime}
          </span>
        </div>

        <div className="metrics-grid">
          <Metric
            icon={<FiActivity />}
            label={t("weather.feelsLike")}
            value={formatTemperature(city.feelsLike, unit)}
            note={`${formatTemperature(city.minTemperature, unit)} ${
              text.min
            } · ${formatTemperature(city.maxTemperature, unit)} ${text.max}`}
          />

          <Metric
            icon={<FiDroplet />}
            label={t("weather.humidity")}
            value={`${Math.round(city.humidity)}%`}
            note={text.relativeHumidity}
          />

          <Metric
            icon={<FiCompass />}
            label={t("weather.pressure")}
            value={`${Math.round(city.pressure)} hPa`}
            note={text.seaLevelPressure}
          />

          <Metric
            icon={<FiWind />}
            label={t("weather.wind")}
            value={formatWind(city.windSpeed, unit)}
            note={`${getWindDirection(city.windDirection)} · ${
              text.gusts
            } ${formatWind(city.windGusts, unit)}`}
          />

          <Metric
            icon={<FiEye />}
            label={t("weather.visibility")}
            value={`${city.visibility.toFixed(1)} km`}
            note={city.visibility >= 10 ? text.veryGood : text.reduced}
          />

          <Metric
            icon={<FiCloud />}
            label={t("weather.cloudCover")}
            value={`${Math.round(city.cloudCover)}%`}
            note={city.description}
          />

          <Metric
            icon={<FiUmbrella />}
            label={t("weather.rainChance")}
            value={`${Math.round(city.precipitationProbability ?? 0)}%`}
            note={`${Number(city.precipitation || 0).toFixed(1)} mm ${
              text.now
            }`}
          />

          <Metric
            icon={<span className="uv-mark">UV</span>}
            label={t("weather.uvIndex")}
            value={`${Math.round(city.uvIndex ?? 0)}`}
            note={translatedUv}
          />

          <Metric
            icon={<span className={`aqi-dot ${aqi.level}`} />}
            label={t("weather.airQuality")}
            value={
              city.airQuality?.europeanAqi != null
                ? `${Math.round(city.airQuality.europeanAqi)} AQI`
                : "—"
            }
            note={translatedAqi}
          />

          <Metric
            icon={<FiSunrise />}
            label={t("weather.sunrise")}
            value={time(city.sunrise)}
            note={text.localTime}
          />

          <Metric
            icon={<FiSunset />}
            label={t("weather.sunset")}
            value={time(city.sunset)}
            note={text.localTime}
          />

          <Metric
            icon={<FiDroplet />}
            label="PM2.5"
            value={
              city.airQuality?.pm25 != null
                ? `${Math.round(city.airQuality.pm25)} µg/m³`
                : "—"
            }
            note={text.fineParticles}
          />
        </div>
      </div>
    </section>
  );
}
