import { FiGithub } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

import logo from "../Header/logo-projekt.png";
import { useLanguage } from "../context/LanguageContext.jsx";

import "./Footer.css";

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

  const navigate = (target) => {
    onNavigate?.(target);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer" id="contacts">
      <div className="footer-inner container-wide">
        <button
          className="footer-logo-button"
          type="button"
          onClick={() => navigate("home")}
          aria-label="24/7 Forecast home"
        >
          <img
            src={logo}
            alt="24/7 Forecast"
            className="footer-logo-img"
            draggable="false"
          />
        </button>

        <div className="footer-column">
          <h3>{currentText.explore}</h3>

          <button type="button" onClick={() => navigate("home")}>
            {t("nav.dashboard")}
          </button>

          <button type="button" onClick={() => navigate("map")}>
            {t("nav.map")}
          </button>

          <button type="button" onClick={() => navigate("travel")}>
            {t("nav.travel")}
          </button>
        </div>

        <div className="footer-column">
          <h3>{currentText.address}</h3>

          <p>
            {currentText.street}
            <br />
            {currentText.city}
            <br />
            {currentText.country}
          </p>
        </div>

        <div className="footer-column footer-contact">
          <h3>{currentText.contactUs}</h3>

          <div className="socials">
            <a
              className="social-link social-instagram"
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              className="social-link social-facebook"
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              className="social-link social-whatsapp"
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              className="social-link social-github"
              href="https://github.com/Taras1326/weather-projekt.5"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <FiGithub />
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
