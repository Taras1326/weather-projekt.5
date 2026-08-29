import { FiEye, FiHeart, FiMapPin, FiTrash2 } from "react-icons/fi";

import { useLanguage } from "../../components/context/LanguageContext.jsx";

import "./FavoritesPage.css";

export default function FavoritesPage({
  cities = [],
  favorites = [],
  unit = "C",
  onFavorite,
  onDelete,
  onOpen,
}) {
  const { language, t } = useLanguage();

  const text = {
    en: {
      subtitle: "Manage your favorite weather locations.",
      emptyTitle: "No favorite cities yet",
      emptyText: "Add cities to favorites from your weather dashboard.",
      location: "Location",
      open: "Open",
    },

    de: {
      subtitle: "Verwalte deine bevorzugten Wetterorte.",
      emptyTitle: "Noch keine Lieblingsstädte",
      emptyText:
        "Füge Städte über deine Wetterübersicht zu den Favoriten hinzu.",
      location: "Standort",
      open: "Öffnen",
    },

    uk: {
      subtitle: "Керуйте улюбленими містами для прогнозу погоди.",
      emptyTitle: "Улюблених міст ще немає",
      emptyText: "Додайте міста в улюблені на головній панелі погоди.",
      location: "Місцезнаходження",
      open: "Відкрити",
    },

    ru: {
      subtitle: "Управляйте любимыми городами для прогноза погоды.",
      emptyTitle: "Избранных городов пока нет",
      emptyText: "Добавьте города в избранное на главной панели погоды.",
      location: "Местоположение",
      open: "Открыть",
    },
  };

  const tx = text[language] || text.en;

  const favoriteCities = cities.filter((city) => favorites.includes(city.id));

  const getTemperature = (temperature) => {
    if (temperature == null) {
      return "--";
    }

    if (unit === "F") {
      const fahrenheit = temperature * (9 / 5) + 32;

      return `${Math.round(fahrenheit)}°F`;
    }

    return `${Math.round(temperature)}°C`;
  };

  return (
    <main className="account-page">
      <div className="account-container">
        <div className="account-page-heading">
          <div>
            <span className="account-eyebrow">
              {t("weather.currentWeather")}
            </span>

            <h1>{t("profile.myCities")}</h1>

            <p>{tx.subtitle}</p>
          </div>
        </div>

        {favoriteCities.length === 0 ? (
          <div className="favorites-empty">
            <div className="favorites-empty-icon">
              <FiHeart />
            </div>

            <h2>{tx.emptyTitle}</h2>

            <p>{tx.emptyText}</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoriteCities.map((city) => (
              <article className="favorite-city-card" key={city.id}>
                <div className="favorite-city-top">
                  <div>
                    <div className="favorite-location">
                      <FiMapPin />

                      <span>{city.country || tx.location}</span>
                    </div>

                    <h2>{city.city}</h2>
                  </div>

                  <button
                    type="button"
                    className="favorite-heart active"
                    onClick={() => onFavorite?.(city.id)}
                    aria-label={t("common.favorite")}
                  >
                    <FiHeart />
                  </button>
                </div>

                <div className="favorite-temperature">
                  {getTemperature(city.temperature)}
                </div>

                <div className="favorite-city-actions">
                  <button type="button" onClick={() => onOpen?.(city)}>
                    <FiEye />

                    {tx.open}
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={() => onDelete?.(city.id)}
                  >
                    <FiTrash2 />

                    {t("common.delete")}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
