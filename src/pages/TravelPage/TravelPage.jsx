import { useEffect, useState } from "react";
import { FiArrowRight, FiMapPin, FiSearch } from "react-icons/fi";

import WeatherIcon from "../../components/WeatherIcon/WeatherIcon";
import { useLanguage } from "../../components/context/LanguageContext.jsx";

import { getWeatherByCity, searchCities } from "../../services/weatherApi";

import {
  formatTemperature,
  formatWind,
  scoreTravelWeather,
} from "../../utils/weather";

function CityPicker({ label, value, onChange, placeholder }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return undefined;
    }

    const timer = setTimeout(async () => {
      try {
        setResults(await searchCities(query.trim(), 5));
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="travel-picker">
      <label>{label}</label>

      <div className="travel-search">
        <FiSearch />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
      </div>

      {results.length > 0 && (
        <div className="travel-results glass-panel">
          {results.map((item) => (
            <button
              key={`${item.id}-${item.lat}`}
              onClick={() => {
                onChange(item);
                setQuery("");
                setResults([]);
              }}
            >
              <span>{item.city}</span>

              <small>{item.country}</small>
            </button>
          ))}
        </div>
      )}

      {value && (
        <div className="selected-location">
          <FiMapPin /> {value.city}
          {value.country ? `, ${value.country}` : ""}
        </div>
      )}
    </div>
  );
}

function CompareCard({ data, unit, text }) {
  if (!data) {
    return <div className="compare-placeholder">{text.chooseCity}</div>;
  }

  const score = scoreTravelWeather(data);

  return (
    <article className="compare-card">
      <div className="compare-top">
        <div>
          <p>{data.country}</p>

          <h2>{data.city}</h2>
        </div>

        <div className="trip-score">
          <strong>{score}</strong>

          <span>{text.tripScore}</span>
        </div>
      </div>

      <WeatherIcon type={data.weatherIcon} size={96} title={data.description} />

      <div className="compare-temp">
        {formatTemperature(data.temperature, unit)}
      </div>

      <p className="compare-condition">{data.description}</p>

      <dl>
        <div>
          <dt>{text.feelsLike}</dt>

          <dd>{formatTemperature(data.feelsLike, unit)}</dd>
        </div>

        <div>
          <dt>{text.rainChance}</dt>

          <dd>{Math.round(data.precipitationProbability ?? 0)}%</dd>
        </div>

        <div>
          <dt>{text.wind}</dt>

          <dd>{formatWind(data.windSpeed, unit)}</dd>
        </div>

        <div>
          <dt>{text.uv}</dt>

          <dd>{Math.round(data.uvIndex ?? 0)}</dd>
        </div>

        <div>
          <dt>{text.humidity}</dt>

          <dd>{Math.round(data.humidity)}%</dd>
        </div>

        <div>
          <dt>{text.airQuality}</dt>

          <dd>
            {data.airQuality?.europeanAqi != null
              ? Math.round(data.airQuality.europeanAqi)
              : "—"}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export default function TravelPage({ unit }) {
  const { language } = useLanguage();

  const textMap = {
    en: {
      planSmarter: "Plan smarter",
      title: "Travel weather planner",
      subtitle:
        "Compare two destinations using temperature, rain, wind, UV and air quality.",
      destinationA: "Destination A",
      destinationB: "Destination B",
      searchCity: "Search city",
      updating: "Updating live weather…",
      chooseCity: "Choose a city to compare weather.",
      tripScore: "trip score",
      feelsLike: "Feels like",
      rainChance: "Rain chance",
      wind: "Wind",
      uv: "UV",
      humidity: "Humidity",
      airQuality: "Air quality",
      bestConditions: "Best conditions right now",
      winnerText:
        "Based on a simple comfort score that balances temperature, rain, wind, UV and air quality.",
      packingHelper: "Packing helper",
      packingText:
        "Use the dashboard comfort guide to decide whether you need a jacket, umbrella or sunscreen.",
      outlook: "14-day outlook",
      outlookText:
        "Open either destination on the dashboard to inspect the long-range forecast.",
      mapCheck: "Map check",
      mapText:
        "Use the weather map before departure to check rain and wind systems.",
      versus: "VS",
    },

    de: {
      planSmarter: "Cleverer planen",
      title: "Reise-Wetterplaner",
      subtitle:
        "Vergleiche zwei Reiseziele anhand von Temperatur, Regen, Wind, UV und Luftqualität.",
      destinationA: "Reiseziel A",
      destinationB: "Reiseziel B",
      searchCity: "Stadt suchen",
      updating: "Live-Wetter wird aktualisiert…",
      chooseCity: "Wähle eine Stadt zum Wettervergleich.",
      tripScore: "Reisewertung",
      feelsLike: "Gefühlt",
      rainChance: "Regenwahrscheinlichkeit",
      wind: "Wind",
      uv: "UV",
      humidity: "Luftfeuchtigkeit",
      airQuality: "Luftqualität",
      bestConditions: "Beste Bedingungen im Moment",
      winnerText:
        "Basierend auf einer einfachen Komfortbewertung aus Temperatur, Regen, Wind, UV und Luftqualität.",
      packingHelper: "Packhilfe",
      packingText:
        "Nutze den Komfort-Ratgeber im Dashboard, um zu entscheiden, ob du Jacke, Regenschirm oder Sonnenschutz brauchst.",
      outlook: "14-Tage-Ausblick",
      outlookText:
        "Öffne eines der Reiseziele im Dashboard, um die langfristige Vorhersage anzusehen.",
      mapCheck: "Kartenprüfung",
      mapText:
        "Nutze vor der Abreise die Wetterkarte, um Regen- und Windsysteme zu prüfen.",
      versus: "VS",
    },

    uk: {
      planSmarter: "Плануйте розумніше",
      title: "Планувальник погоди для подорожей",
      subtitle:
        "Порівнюйте два напрямки за температурою, дощем, вітром, UV та якістю повітря.",
      destinationA: "Напрямок A",
      destinationB: "Напрямок B",
      searchCity: "Пошук міста",
      updating: "Оновлення актуальної погоди…",
      chooseCity: "Виберіть місто для порівняння погоди.",
      tripScore: "оцінка поїздки",
      feelsLike: "Відчувається як",
      rainChance: "Ймовірність дощу",
      wind: "Вітер",
      uv: "UV",
      humidity: "Вологість",
      airQuality: "Якість повітря",
      bestConditions: "Найкращі умови зараз",
      winnerText:
        "На основі простої оцінки комфорту, яка враховує температуру, дощ, вітер, UV та якість повітря.",
      packingHelper: "Допомога зі зборами",
      packingText:
        "Використовуйте поради на головній панелі, щоб вирішити, чи потрібні куртка, парасоля або сонцезахисний крем.",
      outlook: "Прогноз на 14 днів",
      outlookText:
        "Відкрийте будь-який напрямок на головній панелі, щоб переглянути довгостроковий прогноз.",
      mapCheck: "Перевірка карти",
      mapText:
        "Перед поїздкою перевірте погодну карту, щоб побачити дощові та вітрові системи.",
      versus: "VS",
    },

    ru: {
      planSmarter: "Планируйте умнее",
      title: "Планировщик погоды для путешествий",
      subtitle:
        "Сравнивайте два направления по температуре, дождю, ветру, UV и качеству воздуха.",
      destinationA: "Направление A",
      destinationB: "Направление B",
      searchCity: "Поиск города",
      updating: "Обновление актуальной погоды…",
      chooseCity: "Выберите город для сравнения погоды.",
      tripScore: "оценка поездки",
      feelsLike: "Ощущается как",
      rainChance: "Вероятность дождя",
      wind: "Ветер",
      uv: "UV",
      humidity: "Влажность",
      airQuality: "Качество воздуха",
      bestConditions: "Лучшие условия сейчас",
      winnerText:
        "На основе простой оценки комфорта, которая учитывает температуру, дождь, ветер, UV и качество воздуха.",
      packingHelper: "Помощь со сборами",
      packingText:
        "Используйте советы на главной панели, чтобы решить, нужны ли куртка, зонт или солнцезащитный крем.",
      outlook: "Прогноз на 14 дней",
      outlookText:
        "Откройте любое направление на главной панели, чтобы посмотреть долгосрочный прогноз.",
      mapCheck: "Проверка карты",
      mapText:
        "Перед поездкой проверьте погодную карту, чтобы увидеть дождевые и ветровые системы.",
      versus: "VS",
    },
  };

  const text = textMap[language] || textMap.en;

  const [leftLocation, setLeftLocation] = useState({
    city: "Ljubljana",
    country: "Slovenia",
    lat: 46.0569,
    lon: 14.5058,
  });

  const [rightLocation, setRightLocation] = useState({
    city: "Split",
    country: "Croatia",
    lat: 43.5081,
    lon: 16.4402,
  });

  const [left, setLeft] = useState(null);

  const [right, setRight] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);

      try {
        const [a, b] = await Promise.all([
          getWeatherByCity(leftLocation),
          getWeatherByCity(rightLocation),
        ]);

        if (active) {
          setLeft(a);
          setRight(b);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [leftLocation, rightLocation, language]);

  const leftScore = scoreTravelWeather(left);

  const rightScore = scoreTravelWeather(right);

  const winner =
    left && right ? (leftScore >= rightScore ? left : right) : null;

  return (
    <main className="subpage travel-page">
      <section className="subpage-hero">
        <div className="container-wide">
          <p className="eyebrow">{text.planSmarter}</p>

          <h1>{text.title}</h1>

          <p>{text.subtitle}</p>
        </div>
      </section>

      <section className="travel-section section-shell">
        <div className="container-wide">
          <div className="travel-pickers">
            <CityPicker
              label={text.destinationA}
              value={leftLocation}
              onChange={setLeftLocation}
              placeholder={text.searchCity}
            />

            <FiArrowRight className="travel-arrow" />

            <CityPicker
              label={text.destinationB}
              value={rightLocation}
              onChange={setRightLocation}
              placeholder={text.searchCity}
            />
          </div>

          {loading && <div className="loading-banner">{text.updating}</div>}

          <div className="compare-grid">
            <CompareCard data={left} unit={unit} text={text} />

            <div className="versus">{text.versus}</div>

            <CompareCard data={right} unit={unit} text={text} />
          </div>

          {winner && (
            <div className="winner-banner">
              <span>🏆</span>

              <div>
                <p className="eyebrow">{text.bestConditions}</p>

                <h2>{winner.city}</h2>

                <p>{text.winnerText}</p>
              </div>
            </div>
          )}

          <div className="travel-features">
            <article>
              <span>🧳</span>

              <h3>{text.packingHelper}</h3>

              <p>{text.packingText}</p>
            </article>

            <article>
              <span>📅</span>

              <h3>{text.outlook}</h3>

              <p>{text.outlookText}</p>
            </article>

            <article>
              <span>🗺️</span>

              <h3>{text.mapCheck}</h3>

              <p>{text.mapText}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
