import { useState } from "react";

import {
  FiCheck,
  FiClock,
  FiGlobe,
  FiMoon,
  FiSun,
  FiThermometer,
  FiWind,
} from "react-icons/fi";

import { useLanguage } from "../../components/context/LanguageContext.jsx";

import "./SettingsPage.css";

const WIND_KEY = "weather-wind-unit";

const TIME_KEY = "weather-time-format";

export default function SettingsPage({
  theme = "light",
  setTheme,
  unit = "C",
  setUnit,
}) {
  const { language, setLanguage, t } = useLanguage();

  const [windUnit, setWindUnit] = useState(
    () => localStorage.getItem(WIND_KEY) || "km/h"
  );

  const [timeFormat, setTimeFormat] = useState(
    () => localStorage.getItem(TIME_KEY) || "24"
  );

  const [saved, setSaved] = useState(false);

  const text = {
    en: {
      appearanceText: "Choose how the website looks.",
      lightText: "Bright interface",
      darkText: "Dark interface",
      temperatureText: "Choose your preferred temperature unit.",
      languageText: "Choose the language of the website.",
      windText: "Choose how wind speed is displayed.",
      timeText: "Choose your preferred clock format.",
      save: "Save settings",
    },

    de: {
      appearanceText: "Wähle das Erscheinungsbild der Website.",
      lightText: "Helle Oberfläche",
      darkText: "Dunkle Oberfläche",
      temperatureText: "Wähle deine bevorzugte Temperatureinheit.",
      languageText: "Wähle die Sprache der Website.",
      windText: "Wähle die Einheit für die Windgeschwindigkeit.",
      timeText: "Wähle dein bevorzugtes Zeitformat.",
      save: "Einstellungen speichern",
    },

    uk: {
      appearanceText: "Виберіть вигляд сайту.",
      lightText: "Світлий інтерфейс",
      darkText: "Темний інтерфейс",
      temperatureText: "Виберіть одиницю вимірювання температури.",
      languageText: "Виберіть мову сайту.",
      windText: "Виберіть одиницю вимірювання швидкості вітру.",
      timeText: "Виберіть формат відображення часу.",
      save: "Зберегти налаштування",
    },

    ru: {
      appearanceText: "Выберите внешний вид сайта.",
      lightText: "Светлый интерфейс",
      darkText: "Тёмный интерфейс",
      temperatureText: "Выберите единицу измерения температуры.",
      languageText: "Выберите язык сайта.",
      windText: "Выберите единицу измерения скорости ветра.",
      timeText: "Выберите формат отображения времени.",
      save: "Сохранить настройки",
    },
  };

  const tx = text[language] || text.en;

  const languages = [
    {
      code: "en",
      flag: "🇬🇧",
      name: "English",
    },

    {
      code: "de",
      flag: "🇩🇪",
      name: "Deutsch",
    },

    {
      code: "uk",
      flag: "🇺🇦",
      name: "Українська",
    },

    {
      code: "ru",
      flag: "🇷🇺",
      name: "Русский",
    },
  ];

  const saveSettings = () => {
    localStorage.setItem(WIND_KEY, windUnit);

    localStorage.setItem(TIME_KEY, timeFormat);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <main className="account-page">
      <div className="account-container">
        <div className="account-page-heading">
          <div>
            <span className="account-eyebrow">{t("profile.preferences")}</span>

            <h1>{t("settings.title")}</h1>

            <p>{t("settings.subtitle")}</p>
          </div>
        </div>

        {saved && (
          <div className="settings-success">
            <FiCheck />

            {t("settings.saved")}
          </div>
        )}

        <section className="settings-card">
          <div className="settings-title-row">
            {theme === "dark" ? <FiMoon /> : <FiSun />}

            <div>
              <h2>{t("settings.appearance")}</h2>

              <p>{tx.appearanceText}</p>
            </div>
          </div>

          <div className="settings-option-grid">
            <button
              type="button"
              className={theme === "light" ? "active" : ""}
              onClick={() => setTheme?.("light")}
            >
              <FiSun />

              <strong>{t("settings.light")}</strong>

              <span>{tx.lightText}</span>
            </button>

            <button
              type="button"
              className={theme === "dark" ? "active" : ""}
              onClick={() => setTheme?.("dark")}
            >
              <FiMoon />

              <strong>{t("settings.dark")}</strong>

              <span>{tx.darkText}</span>
            </button>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-title-row">
            <FiGlobe />

            <div>
              <h2>{t("settings.language")}</h2>

              <p>{tx.languageText}</p>
            </div>
          </div>

          <div className="settings-segmented">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                className={language === item.code ? "active" : ""}
                onClick={() => setLanguage(item.code)}
              >
                {item.flag} {item.name}
              </button>
            ))}
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-title-row">
            <FiThermometer />

            <div>
              <h2>{t("settings.temperatureUnit")}</h2>

              <p>{tx.temperatureText}</p>
            </div>
          </div>

          <div className="settings-segmented">
            <button
              type="button"
              className={unit === "C" ? "active" : ""}
              onClick={() => setUnit?.("C")}
            >
              {t("settings.celsius")} °C
            </button>

            <button
              type="button"
              className={unit === "F" ? "active" : ""}
              onClick={() => setUnit?.("F")}
            >
              {t("settings.fahrenheit")} °F
            </button>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-title-row">
            <FiWind />

            <div>
              <h2>{t("settings.windUnit")}</h2>

              <p>{tx.windText}</p>
            </div>
          </div>

          <div className="settings-segmented">
            <button
              type="button"
              className={windUnit === "km/h" ? "active" : ""}
              onClick={() => setWindUnit("km/h")}
            >
              {t("settings.kmh")}
            </button>

            <button
              type="button"
              className={windUnit === "m/s" ? "active" : ""}
              onClick={() => setWindUnit("m/s")}
            >
              m/s
            </button>

            <button
              type="button"
              className={windUnit === "mph" ? "active" : ""}
              onClick={() => setWindUnit("mph")}
            >
              {t("settings.mph")}
            </button>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-title-row">
            <FiClock />

            <div>
              <h2>{t("settings.timeFormat")}</h2>

              <p>{tx.timeText}</p>
            </div>
          </div>

          <div className="settings-segmented">
            <button
              type="button"
              className={timeFormat === "24" ? "active" : ""}
              onClick={() => setTimeFormat("24")}
            >
              {t("settings.hour24")}
            </button>

            <button
              type="button"
              className={timeFormat === "12" ? "active" : ""}
              onClick={() => setTimeFormat("12")}
            >
              {t("settings.hour12")}
            </button>
          </div>
        </section>

        <div className="settings-save">
          <button
            className="account-primary-button"
            type="button"
            onClick={saveSettings}
          >
            <FiCheck />

            {tx.save}
          </button>
        </div>
      </div>
    </main>
  );
}
