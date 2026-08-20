export const weatherCodeMap = {
  0: { label: 'Clear sky', icon: 'sun' },
  1: { label: 'Mainly clear', icon: 'sun' },
  2: { label: 'Partly cloudy', icon: 'partly' },
  3: { label: 'Overcast', icon: 'cloud' },
  45: { label: 'Fog', icon: 'fog' },
  48: { label: 'Rime fog', icon: 'fog' },
  51: { label: 'Light drizzle', icon: 'drizzle' },
  53: { label: 'Drizzle', icon: 'drizzle' },
  55: { label: 'Heavy drizzle', icon: 'rain' },
  56: { label: 'Freezing drizzle', icon: 'sleet' },
  57: { label: 'Heavy freezing drizzle', icon: 'sleet' },
  61: { label: 'Light rain', icon: 'rain' },
  63: { label: 'Rain', icon: 'rain' },
  65: { label: 'Heavy rain', icon: 'rain' },
  66: { label: 'Freezing rain', icon: 'sleet' },
  67: { label: 'Heavy freezing rain', icon: 'sleet' },
  71: { label: 'Light snow', icon: 'snow' },
  73: { label: 'Snow', icon: 'snow' },
  75: { label: 'Heavy snow', icon: 'snow' },
  77: { label: 'Snow grains', icon: 'snow' },
  80: { label: 'Rain showers', icon: 'showers' },
  81: { label: 'Rain showers', icon: 'showers' },
  82: { label: 'Heavy showers', icon: 'showers' },
  85: { label: 'Snow showers', icon: 'snow' },
  86: { label: 'Heavy snow showers', icon: 'snow' },
  95: { label: 'Thunderstorm', icon: 'storm' },
  96: { label: 'Thunderstorm with hail', icon: 'storm' },
  99: { label: 'Heavy thunderstorm with hail', icon: 'storm' },
};

export function getWeatherMeta(code) {
  return weatherCodeMap[code] || { label: 'Weather', icon: 'partly' };
}

export function cToF(c) {
  return Math.round((c * 9) / 5 + 32);
}

export function formatTemperature(value, unit = 'C') {
  const temp = unit === 'F' ? cToF(value) : Math.round(value);
  return `${temp}°${unit}`;
}

export function kmhToMph(value) {
  return Math.round(value * 0.621371);
}

export function formatWind(value, unit = 'C') {
  return unit === 'F' ? `${kmhToMph(value)} mph` : `${Math.round(value)} km/h`;
}

export function metersToKm(value) {
  return Number.isFinite(value) ? value / 1000 : 0;
}

export function getWindDirection(degrees = 0) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
}

export function getAqiLabel(aqi) {
  if (aqi == null) return { label: 'No data', level: 'neutral' };
  if (aqi <= 20) return { label: 'Excellent', level: 'good' };
  if (aqi <= 40) return { label: 'Good', level: 'good' };
  if (aqi <= 60) return { label: 'Moderate', level: 'moderate' };
  if (aqi <= 80) return { label: 'Poor', level: 'poor' };
  if (aqi <= 100) return { label: 'Very poor', level: 'poor' };
  return { label: 'Extremely poor', level: 'danger' };
}

export function getUvLabel(uv) {
  if (uv == null) return 'No data';
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very high';
  return 'Extreme';
}

export function formatHour(dateString, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    timeZone,
  }).format(new Date(dateString));
}

export function formatShortDate(dateString, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone,
  }).format(new Date(dateString));
}

export function getComfortAdvice(city) {
  if (!city) return [];

  const tips = [];
  const temp = city.temperature;
  const rainChance = city.precipitationProbability ?? 0;
  const uv = city.uvIndex ?? 0;
  const wind = city.windSpeed ?? 0;
  const aqi = city.airQuality?.europeanAqi;

  if (temp <= 5) tips.push({ icon: '🧥', title: 'Dress warmly', text: 'A warm jacket and layers will feel more comfortable.' });
  else if (temp <= 15) tips.push({ icon: '🧶', title: 'Take a light jacket', text: 'A sweater or light jacket is a good choice.' });
  else if (temp >= 28) tips.push({ icon: '💧', title: 'Stay hydrated', text: 'It is hot outside. Take water and avoid long sun exposure.' });
  else tips.push({ icon: '👕', title: 'Comfortable weather', text: 'Light everyday clothing should work well.' });

  if (rainChance >= 45) tips.push({ icon: '☂️', title: 'Take an umbrella', text: `${Math.round(rainChance)}% chance of precipitation today.` });
  else tips.push({ icon: '🌤️', title: 'Low rain risk', text: 'An umbrella is probably not necessary right now.' });

  if (uv >= 6) tips.push({ icon: '🧴', title: 'UV protection', text: `UV index ${Math.round(uv)}. Sunglasses and sunscreen are recommended.` });
  if (wind >= 35) tips.push({ icon: '💨', title: 'Strong wind', text: 'Expect strong wind. Secure loose items and be careful outside.' });
  if (aqi != null && aqi > 60) tips.push({ icon: '😷', title: 'Air quality alert', text: 'Air quality is reduced. Sensitive people may want to limit outdoor activity.' });

  return tips.slice(0, 4);
}

export function scoreTravelWeather(city) {
  if (!city) return 0;
  let score = 100;
  const temp = city.temperature;
  const rain = city.precipitationProbability ?? 0;
  const wind = city.windSpeed ?? 0;
  const uv = city.uvIndex ?? 0;
  const aqi = city.airQuality?.europeanAqi ?? 20;

  score -= Math.abs(21 - temp) * 2.1;
  score -= rain * 0.28;
  score -= Math.max(0, wind - 15) * 0.7;
  score -= Math.max(0, uv - 7) * 2;
  score -= Math.max(0, aqi - 40) * 0.3;
  return Math.max(0, Math.min(100, Math.round(score)));
}
