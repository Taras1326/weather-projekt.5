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
} from 'react-icons/wi';

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

export default function WeatherIcon({ type = 'partly', size = 72, title = 'Weather' }) {
  const Icon = icons[type] || WiDayCloudy;
  return <Icon className="weather-glyph" size={size} aria-label={title} title={title} />;
}
