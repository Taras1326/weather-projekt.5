import {
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiSprinkle,
  WiRain,
  WiShowers,
  WiSnow,
  WiSleet,
  WiThunderstorm,
} from "react-icons/wi";

import { useLanguage } from "../context/LanguageContext.jsx";

const icons = {
  sun: WiDaySunny,
  partly: WiDayCloudy,
  cloud: WiCloudy,
  fog: WiFog,
  drizzle: WiSprinkle,
  rain: WiRain,
  showers: WiShowers,
  snow: WiSnow,
  sleet: WiSleet,
  storm: WiThunderstorm,
};

export default function WeatherIcon({ type = "partly", size = 72, title }) {
  const { language } = useLanguage();

  const defaultTitles = {
    en: "Weather",
    de: "Wetter",
    uk: "Погода",
    ru: "Погода",
  };

  const Icon = icons[type] || WiDayCloudy;

  const iconTitle = title || defaultTitles[language] || defaultTitles.en;

  return (
    <Icon
      className="weather-glyph"
      size={size}
      aria-label={iconTitle}
      title={iconTitle}
    />
  );
}
