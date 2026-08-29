import { useEffect, useState } from "react";

import {
  FiBell,
  FiCheck,
  FiCloudLightning,
  FiCloudRain,
  FiSun,
  FiThermometer,
  FiWind,
} from "react-icons/fi";

import { useLanguage } from "../../components/context/LanguageContext.jsx";

import "./AlertsPage.css";

const ALERTS_KEY = "weather-alert-settings";

const initialAlerts = {
  rain: true,
  storm: true,
  wind: true,
  heat: false,
  cold: false,

  temperatureHigh: 35,
  temperatureLow: -5,
  windSpeed: 60,
};

export default function AlertsPage({ cities = [] }) {
  const { language, t } = useLanguage();

  const text = {
    en: {
      warnings: "Weather warnings",
      warningsText: "Select which weather events you want to be warned about.",
      rainText: "Notify me when heavy rain is expected.",
      stormText: "Notify me about thunderstorms and lightning.",
      windText: "Notify me when strong wind may become dangerous.",
      heatText: "Notify me about unusually high temperatures.",
      cold: "Extreme cold",
      coldText: "Notify me about very low temperatures.",
      thresholds: "Alert thresholds",
      highTemperature: "High temperature",
      lowTemperature: "Low temperature",
      locations: "Saved locations",
      locationsText:
        "Add cities to your dashboard to receive location-based alerts.",
      save: "Save alert settings",
      saved: "Alert settings saved.",
    },

    de: {
      warnings: "Wetterwarnungen",
      warningsText:
        "Wähle aus, vor welchen Wetterereignissen du gewarnt werden möchtest.",
      rainText: "Benachrichtigung bei erwartetem Starkregen.",
      stormText: "Benachrichtigung bei Gewittern und Blitzen.",
      windText: "Benachrichtigung bei gefährlich starkem Wind.",
      heatText: "Benachrichtigung bei ungewöhnlich hohen Temperaturen.",
      cold: "Extreme Kälte",
      coldText: "Benachrichtigung bei sehr niedrigen Temperaturen.",
      thresholds: "Warnschwellen",
      highTemperature: "Hohe Temperatur",
      lowTemperature: "Niedrige Temperatur",
      locations: "Gespeicherte Orte",
      locationsText:
        "Füge Städte zum Dashboard hinzu, um ortsbezogene Warnungen zu erhalten.",
      save: "Warnungen speichern",
      saved: "Warnungseinstellungen wurden gespeichert.",
    },

    uk: {
      warnings: "Погодні попередження",
      warningsText:
        "Виберіть погодні явища, про які ви хочете отримувати попередження.",
      rainText: "Повідомляти, коли очікується сильний дощ.",
      stormText: "Повідомляти про грозу та блискавку.",
      windText: "Повідомляти, коли сильний вітер може стати небезпечним.",
      heatText: "Повідомляти про дуже високі температури.",
      cold: "Сильний мороз",
      coldText: "Повідомляти про дуже низькі температури.",
      thresholds: "Пороги попереджень",
      highTemperature: "Висока температура",
      lowTemperature: "Низька температура",
      locations: "Збережені міста",
      locationsText:
        "Додайте міста на головну панель, щоб отримувати попередження.",
      save: "Зберегти попередження",
      saved: "Налаштування попереджень збережено.",
    },

    ru: {
      warnings: "Погодные предупреждения",
      warningsText:
        "Выберите погодные явления, о которых вы хотите получать предупреждения.",
      rainText: "Сообщать, когда ожидается сильный дождь.",
      stormText: "Сообщать о грозе и молнии.",
      windText: "Сообщать, когда сильный ветер может стать опасным.",
      heatText: "Сообщать об очень высоких температурах.",
      cold: "Сильный мороз",
      coldText: "Сообщать об очень низких температурах.",
      thresholds: "Пороги предупреждений",
      highTemperature: "Высокая температура",
      lowTemperature: "Низкая температура",
      locations: "Сохранённые города",
      locationsText:
        "Добавьте города на главную панель, чтобы получать предупреждения.",
      save: "Сохранить предупреждения",
      saved: "Настройки предупреждений сохранены.",
    },
  };

  const tx = text[language] || text.en;

  const [settings, setSettings] = useState(() => {
    try {
      return {
        ...initialAlerts,
        ...(JSON.parse(localStorage.getItem(ALERTS_KEY)) || {}),
      };
    } catch {
      return initialAlerts;
    }
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem(ALERTS_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveSettings = () => {
    localStorage.setItem(ALERTS_KEY, JSON.stringify(settings));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const alertItems = [
    {
      key: "rain",
      icon: <FiCloudRain />,
      title: t("alerts.rain"),
      text: tx.rainText,
    },

    {
      key: "storm",
      icon: <FiCloudLightning />,
      title: t("alerts.storm"),
      text: tx.stormText,
    },

    {
      key: "wind",
      icon: <FiWind />,
      title: t("alerts.strongWind"),
      text: tx.windText,
    },

    {
      key: "heat",
      icon: <FiSun />,
      title: t("alerts.heat"),
      text: tx.heatText,
    },

    {
      key: "cold",
      icon: <FiThermometer />,
      title: tx.cold,
      text: tx.coldText,
    },
  ];

  return (
    <main className="account-page">
      <div className="account-container">
        <div className="account-page-heading">
          <div>
            <span className="account-eyebrow">
              {t("settings.notifications")}
            </span>

            <h1>{t("alerts.title")}</h1>

            <p>{t("alerts.subtitle")}</p>
          </div>
        </div>

        {saved && (
          <div className="alerts-success">
            <FiCheck />

            {tx.saved}
          </div>
        )}

        <section className="alerts-card">
          <div className="alerts-card-heading">
            <FiBell />

            <div>
              <h2>{tx.warnings}</h2>

              <p>{tx.warningsText}</p>
            </div>
          </div>

          <div className="alerts-list">
            {alertItems.map((item) => (
              <div className="alert-setting-row" key={item.key}>
                <div className="alert-setting-info">
                  <span className="alert-setting-icon">{item.icon}</span>

                  <div>
                    <strong>{item.title}</strong>

                    <p>{item.text}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className={
                    settings[item.key]
                      ? "settings-switch active"
                      : "settings-switch"
                  }
                  onClick={() => toggle(item.key)}
                  aria-label={
                    settings[item.key]
                      ? t("common.enabled")
                      : t("common.disabled")
                  }
                >
                  <span />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="alerts-card">
          <h2>{tx.thresholds}</h2>

          <div className="alerts-threshold-grid">
            <label>
              <span>{tx.highTemperature}</span>

              <div>
                <input
                  type="number"
                  value={settings.temperatureHigh}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      temperatureHigh: Number(event.target.value),
                    }))
                  }
                />

                <strong>°C</strong>
              </div>
            </label>

            <label>
              <span>{tx.lowTemperature}</span>

              <div>
                <input
                  type="number"
                  value={settings.temperatureLow}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      temperatureLow: Number(event.target.value),
                    }))
                  }
                />

                <strong>°C</strong>
              </div>
            </label>

            <label>
              <span>{t("alerts.strongWind")}</span>

              <div>
                <input
                  type="number"
                  value={settings.windSpeed}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      windSpeed: Number(event.target.value),
                    }))
                  }
                />

                <strong>km/h</strong>
              </div>
            </label>
          </div>
        </section>

        <section className="alerts-card">
          <h2>{tx.locations}</h2>

          {cities.length === 0 ? (
            <p className="alerts-muted">{tx.locationsText}</p>
          ) : (
            <div className="alerts-cities">
              {cities.map((city) => (
                <span key={city.id}>{city.city}</span>
              ))}
            </div>
          )}
        </section>

        <div className="alerts-save-wrap">
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
