import { useEffect, useMemo, useState } from "react";
import { FiCrosshair, FiSearch, FiX } from "react-icons/fi";

import { searchCities } from "../../services/weatherApi";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Hero({ onSearch, onUseLocation, loading }) {
  const { language, t } = useLanguage();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);

  const now = useMemo(() => new Date(), []);

  const localeMap = {
    en: "en-US",
    de: "de-DE",
    uk: "uk-UA",
    ru: "ru-RU",
  };

  const currentLocale = localeMap[language] || "en-US";

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return undefined;
    }

    const timer = setTimeout(async () => {
      try {
        setSearching(true);

        const result = await searchCities(query.trim(), 6);

        setSuggestions(result);
      } catch {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const choose = (location) => {
    setQuery("");
    setSuggestions([]);
    onSearch(location);
  };

  const submit = (event) => {
    event.preventDefault();

    if (suggestions[0]) {
      choose(suggestions[0]);
      return;
    }

    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="hero" id="about">
      <div className="hero-overlay" />

      <div className="hero-content container-wide">
        <p className="hero-kicker">{t("hero.badge")}</p>

        <h1>{t("hero.title")}</h1>

        <div className="hero-info">
          <p>{t("hero.subtitle")}</p>

          <div className="hero-divider" />

          <div className="hero-date">
            <span>
              {now.toLocaleDateString(currentLocale, {
                month: "long",
                year: "numeric",
              })}
            </span>

            <strong>
              {now.toLocaleDateString(currentLocale, {
                weekday: "long",
                day: "numeric",
              })}
            </strong>
          </div>
        </div>

        <div className="hero-search-wrap">
          <form className="hero-search" onSubmit={submit}>
            <FiSearch className="search-leading" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("hero.searchPlaceholder")}
              aria-label={t("common.searchCity")}
            />

            {query && (
              <button
                className="clear-search"
                type="button"
                onClick={() => {
                  setQuery("");
                  setSuggestions([]);
                }}
                aria-label={t("common.close")}
              >
                <FiX />
              </button>
            )}

            <button
              className="search-submit"
              type="submit"
              disabled={loading}
              aria-label={t("common.search")}
            >
              {loading ? "..." : <FiSearch />}
            </button>
          </form>

          <button
            className="location-button"
            type="button"
            onClick={onUseLocation}
          >
            <FiCrosshair />

            {t("hero.locationButton")}
          </button>

          {(suggestions.length > 0 || searching) && (
            <div className="search-suggestions glass-panel">
              {searching && (
                <div className="suggestion-status">{t("common.loading")}</div>
              )}

              {!searching &&
                suggestions.map((item) => (
                  <button
                    type="button"
                    key={`${item.id}-${item.lat}`}
                    onClick={() => choose(item)}
                  >
                    <span>
                      <strong>{item.city}</strong>

                      {item.admin1 ? `, ${item.admin1}` : ""}
                    </span>

                    <small>{item.country}</small>
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
