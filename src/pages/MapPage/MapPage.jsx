import { useMemo, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

import { useLanguage } from "../../components/context/LanguageContext.jsx";
import { searchCities } from "../../services/weatherApi";

export default function MapPage({ selectedCity, onSelectCity }) {
  const { language } = useLanguage();

  const textMap = {
    en: {
      eyebrow: "Live weather layers",
      title: "Weather map",
      subtitle:
        "Explore rain, wind, temperature and cloud movement around your selected location.",

      searchPlaceholder: "Jump to a city",
      find: "Find",

      rainRadar: "Rain radar",
      wind: "Wind",
      temperature: "Temperature",
      clouds: "Clouds",

      centralEurope: "Central Europe",

      mapTitle: "Interactive weather map",

      rainInfoTitle: "Rain radar",
      rainInfoText: "Track precipitation systems and see how rain is moving.",

      windInfoTitle: "Wind field",
      windInfoText:
        "Inspect wind speed and direction before travel or outdoor activities.",

      temperatureInfoTitle: "Temperature",
      temperatureInfoText: "Compare warm and cool regions at a glance.",

      cloudsInfoTitle: "Cloud cover",
      cloudsInfoText: "See cloud patterns and changing sky conditions.",
    },

    de: {
      eyebrow: "Live-Wetterebenen",
      title: "Wetterkarte",
      subtitle:
        "Erkunde Regen, Wind, Temperatur und Wolkenbewegungen rund um den ausgewählten Ort.",

      searchPlaceholder: "Zu einer Stadt springen",
      find: "Suchen",

      rainRadar: "Regenradar",
      wind: "Wind",
      temperature: "Temperatur",
      clouds: "Wolken",

      centralEurope: "Mitteleuropa",

      mapTitle: "Interaktive Wetterkarte",

      rainInfoTitle: "Regenradar",
      rainInfoText:
        "Verfolge Niederschlagsgebiete und sieh, wie sich der Regen bewegt.",

      windInfoTitle: "Windfeld",
      windInfoText:
        "Prüfe Windgeschwindigkeit und Windrichtung vor Reisen oder Aktivitäten im Freien.",

      temperatureInfoTitle: "Temperatur",
      temperatureInfoText:
        "Vergleiche warme und kühle Regionen auf einen Blick.",

      cloudsInfoTitle: "Wolkenbedeckung",
      cloudsInfoText:
        "Sieh Wolkenmuster und sich verändernde Himmelsbedingungen.",
    },

    uk: {
      eyebrow: "Погодні шари в реальному часі",
      title: "Карта погоди",
      subtitle:
        "Переглядайте дощ, вітер, температуру та рух хмар навколо вибраного місця.",

      searchPlaceholder: "Перейти до міста",
      find: "Знайти",

      rainRadar: "Радар дощу",
      wind: "Вітер",
      temperature: "Температура",
      clouds: "Хмари",

      centralEurope: "Центральна Європа",

      mapTitle: "Інтерактивна карта погоди",

      rainInfoTitle: "Радар дощу",
      rainInfoText: "Відстежуйте зони опадів і дивіться, як рухається дощ.",

      windInfoTitle: "Поле вітру",
      windInfoText:
        "Перевіряйте швидкість і напрямок вітру перед подорожжю або активністю на відкритому повітрі.",

      temperatureInfoTitle: "Температура",
      temperatureInfoText: "Швидко порівнюйте теплі та прохолодні регіони.",

      cloudsInfoTitle: "Хмарність",
      cloudsInfoText: "Переглядайте рух хмар і зміни стану неба.",
    },

    ru: {
      eyebrow: "Погодные слои в реальном времени",
      title: "Карта погоды",
      subtitle:
        "Просматривайте дождь, ветер, температуру и движение облаков вокруг выбранного места.",

      searchPlaceholder: "Перейти к городу",
      find: "Найти",

      rainRadar: "Радар дождя",
      wind: "Ветер",
      temperature: "Температура",
      clouds: "Облака",

      centralEurope: "Центральная Европа",

      mapTitle: "Интерактивная карта погоды",

      rainInfoTitle: "Радар дождя",
      rainInfoText: "Отслеживайте зоны осадков и смотрите, как движется дождь.",

      windInfoTitle: "Поле ветра",
      windInfoText:
        "Проверяйте скорость и направление ветра перед поездкой или активностью на улице.",

      temperatureInfoTitle: "Температура",
      temperatureInfoText: "Быстро сравнивайте тёплые и прохладные регионы.",

      cloudsInfoTitle: "Облачность",
      cloudsInfoText:
        "Просматривайте движение облаков и изменения состояния неба.",
    },
  };

  const text = textMap[language] || textMap.en;

  const layers = [
    {
      id: "rain",
      label: text.rainRadar,
    },
    {
      id: "wind",
      label: text.wind,
    },
    {
      id: "temp",
      label: text.temperature,
    },
    {
      id: "clouds",
      label: text.clouds,
    },
  ];

  const [layer, setLayer] = useState("rain");

  const [query, setQuery] = useState("");

  const lat = selectedCity?.lat ?? 48.2;

  const lon = selectedCity?.lon ?? 16.37;

  const overlay =
    layer === "temp" ? "temp" : layer === "clouds" ? "clouds" : layer;

  const mapUrl = useMemo(
    () =>
      `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=1200&height=650&zoom=5&level=surface&overlay=${overlay}&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=true&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`,
    [lat, lon, overlay]
  );

  const submit = async (event) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    try {
      const result = await searchCities(query.trim(), 1);

      if (result[0]) {
        onSelectCity(result[0]);
      }

      setQuery("");
    } catch {
      // Якщо пошук не вдався,
      // просто залишаємо карту без змін.
    }
  };

  return (
    <main className="subpage map-page">
      <section className="subpage-hero">
        <div className="container-wide">
          <p className="eyebrow">{text.eyebrow}</p>

          <h1>{text.title}</h1>

          <p>{text.subtitle}</p>
        </div>
      </section>

      <section className="map-section section-shell">
        <div className="container-wide">
          <div className="map-toolbar">
            <form onSubmit={submit} className="compact-search">
              <FiSearch />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={text.searchPlaceholder}
              />

              <button type="submit" className="accent-button">
                {text.find}
              </button>
            </form>

            <div className="layer-tabs">
              {layers.map((item) => (
                <button
                  type="button"
                  className={layer === item.id ? "active" : ""}
                  onClick={() => setLayer(item.id)}
                  key={item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="map-frame-wrap">
            <div className="map-location-badge">
              <FiMapPin />

              <span>
                {selectedCity
                  ? `${selectedCity.city}${
                      selectedCity.country ? `, ${selectedCity.country}` : ""
                    }`
                  : text.centralEurope}
              </span>
            </div>

            <iframe
              key={mapUrl}
              className="weather-map-frame"
              title={text.mapTitle}
              src={mapUrl}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="map-info-grid">
            <article>
              <span>🌧️</span>

              <h3>{text.rainInfoTitle}</h3>

              <p>{text.rainInfoText}</p>
            </article>

            <article>
              <span>💨</span>

              <h3>{text.windInfoTitle}</h3>

              <p>{text.windInfoText}</p>
            </article>

            <article>
              <span>🌡️</span>

              <h3>{text.temperatureInfoTitle}</h3>

              <p>{text.temperatureInfoText}</p>
            </article>

            <article>
              <span>☁️</span>

              <h3>{text.cloudsInfoTitle}</h3>

              <p>{text.cloudsInfoText}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
