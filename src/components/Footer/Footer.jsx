import { FiFacebook, FiGithub, FiInstagram, FiMail } from "react-icons/fi";

import logo from "../Header/logo-projekt.png";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Footer({ onNavigate }) {
  const { language, t } = useLanguage();

  const text = {
    en: {
      explore: "Explore",
      address: "Address",
      contactUs: "Contact us",
      street: "Svobody str. 35",
      city: "Kyiv",
      country: "Ukraine",
      weatherData: "Weather data by Open-Meteo",
    },

    de: {
      explore: "Entdecken",
      address: "Adresse",
      contactUs: "Kontakt",
      street: "Svobody-Str. 35",
      city: "Kyjiw",
      country: "Ukraine",
      weatherData: "Wetterdaten von Open-Meteo",
    },

    uk: {
      explore: "Навігація",
      address: "Адреса",
      contactUs: "Зв'язатися з нами",
      street: "вул. Свободи, 35",
      city: "Київ",
      country: "Україна",
      weatherData: "Дані про погоду: Open-Meteo",
    },

    ru: {
      explore: "Навигация",
      address: "Адрес",
      contactUs: "Связаться с нами",
      street: "ул. Свободы, 35",
      city: "Киев",
      country: "Украина",
      weatherData: "Данные о погоде: Open-Meteo",
    },
  };

  const currentText = text[language] || text.en;

  return (
    <footer className="footer" id="contacts">
      <div className="footer-inner container-wide">
        <img src={logo} alt="24/7 Forecast" className="footer-logo-img" />

        <div>
          <h3>{currentText.explore}</h3>

          <button type="button" onClick={() => onNavigate("home")}>
            {t("nav.dashboard")}
          </button>

          <button type="button" onClick={() => onNavigate("map")}>
            {t("nav.map")}
          </button>

          <button type="button" onClick={() => onNavigate("travel")}>
            {t("nav.travel")}
          </button>
        </div>

        <div>
          <h3>{currentText.address}</h3>

          <p>
            {currentText.street}
            <br />

            {currentText.city}
            <br />

            {currentText.country}
          </p>
        </div>

        <div>
          <h3>{currentText.contactUs}</h3>

          <div className="socials">
            <a
              href="https://github.com/Taras1326/weather-projekt.5"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FiInstagram />
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FiFacebook />
            </a>

            <a href="mailto:weather@example.com" aria-label="E-Mail">
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom container-wide">
        <span>© 2026 24/7 Forecast · {t("footer.rights")}</span>

        <span>{currentText.weatherData}</span>
      </div>
    </footer>
  );
}
