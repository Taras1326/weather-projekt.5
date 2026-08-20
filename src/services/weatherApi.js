const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const AIR_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

const weatherCodeText = (code) => ({
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  56: 'Freezing drizzle', 57: 'Heavy freezing drizzle', 61: 'Light rain', 63: 'Rain',
  65: 'Heavy rain', 66: 'Freezing rain', 67: 'Heavy freezing rain', 71: 'Light snow',
  73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains', 80: 'Rain showers', 81: 'Rain showers',
  82: 'Heavy rain showers', 85: 'Snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm',
  96: 'Thunderstorm with hail', 99: 'Severe thunderstorm with hail',
}[code] || 'Weather');

const weatherEmoji = (code, isDay = 1) => {
  if (code === 0) return isDay ? '☀️' : '🌙';
  if ([1,2].includes(code)) return isDay ? '🌤️' : '☁️';
  if (code === 3) return '☁️';
  if ([45,48].includes(code)) return '🌫️';
  if ([51,53,55,56,57].includes(code)) return '🌦️';
  if ([61,63,65,66,67,80,81,82].includes(code)) return '🌧️';
  if ([71,73,75,77,85,86].includes(code)) return '❄️';
  if ([95,96,99].includes(code)) return '⛈️';
  return '🌡️';
};

function aqiLabel(value) {
  if (value == null) return 'Unknown';
  if (value <= 20) return 'Good';
  if (value <= 40) return 'Fair';
  if (value <= 60) return 'Moderate';
  if (value <= 80) return 'Poor';
  if (value <= 100) return 'Very poor';
  return 'Extremely poor';
}

export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];
  const response = await fetch(`${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=6&language=en&format=json`);
  if (!response.ok) throw new Error('Could not search locations');
  const data = await response.json();
  return (data.results || []).map(item => ({
    id: `${item.latitude}-${item.longitude}`,
    name: item.name,
    country: item.country || '',
    admin1: item.admin1 || '',
    latitude: item.latitude,
    longitude: item.longitude,
    timezone: item.timezone,
  }));
}

export async function getWeatherByCoordinates(latitude, longitude, place = {}) {
  const params = new URLSearchParams({
    latitude, longitude,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
    hourly: 'temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,cloud_cover,visibility,wind_speed_10m,wind_gusts_10m,uv_index',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max',
    timezone: 'auto',
    forecast_days: '14',
  });

  const [weatherResponse, airResponse] = await Promise.all([
    fetch(`${FORECAST_URL}?${params}`),
    fetch(`${AIR_URL}?latitude=${latitude}&longitude=${longitude}&current=european_aqi,pm10,pm2_5&timezone=auto`).catch(() => null),
  ]);
  if (!weatherResponse.ok) throw new Error('Weather data is unavailable');
  const data = await weatherResponse.json();
  const air = airResponse && airResponse.ok ? await airResponse.json() : null;

  const current = data.current;
  const todayIndex = 0;
  const hourly = data.hourly.time.map((time, index) => ({
    time,
    temperature: Math.round(data.hourly.temperature_2m[index]),
    feelsLike: Math.round(data.hourly.apparent_temperature[index]),
    precipitationProbability: data.hourly.precipitation_probability[index],
    precipitation: data.hourly.precipitation[index],
    weatherCode: data.hourly.weather_code[index],
    cloudCover: data.hourly.cloud_cover[index],
    visibility: Math.round((data.hourly.visibility[index] || 0) / 1000),
    windSpeed: Math.round(data.hourly.wind_speed_10m[index]),
    windGusts: Math.round(data.hourly.wind_gusts_10m[index]),
    uv: data.hourly.uv_index[index],
  }));
  const daily = data.daily.time.map((date, index) => ({
    date,
    weatherCode: data.daily.weather_code[index],
    max: Math.round(data.daily.temperature_2m_max[index]),
    min: Math.round(data.daily.temperature_2m_min[index]),
    feelsMax: Math.round(data.daily.apparent_temperature_max[index]),
    feelsMin: Math.round(data.daily.apparent_temperature_min[index]),
    sunrise: data.daily.sunrise[index],
    sunset: data.daily.sunset[index],
    uv: data.daily.uv_index_max[index],
    precipitation: data.daily.precipitation_sum[index],
    rain: data.daily.rain_sum[index],
    precipProbability: data.daily.precipitation_probability_max[index],
    windMax: Math.round(data.daily.wind_speed_10m_max[index]),
    gustMax: Math.round(data.daily.wind_gusts_10m_max[index]),
  }));

  return {
    id: `${Number(latitude).toFixed(3)}-${Number(longitude).toFixed(3)}`,
    city: place.name || 'Current location',
    country: place.country || '',
    admin1: place.admin1 || '',
    lat: Number(latitude), lon: Number(longitude), timezone: data.timezone,
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    pressure: Math.round(current.surface_pressure),
    windSpeed: Math.round(current.wind_speed_10m),
    windGusts: Math.round(current.wind_gusts_10m),
    windDirection: current.wind_direction_10m,
    cloudCover: current.cloud_cover,
    precipitation: current.precipitation,
    rain: current.rain,
    weatherCode: current.weather_code,
    description: weatherCodeText(current.weather_code),
    emoji: weatherEmoji(current.weather_code, current.is_day),
    isDay: current.is_day,
    updatedAt: current.time,
    minTemperature: daily[todayIndex]?.min,
    maxTemperature: daily[todayIndex]?.max,
    sunrise: daily[todayIndex]?.sunrise,
    sunset: daily[todayIndex]?.sunset,
    uv: daily[todayIndex]?.uv,
    visibility: hourly.find(h => h.time >= current.time)?.visibility ?? null,
    aqi: air?.current?.european_aqi ?? null,
    aqiLabel: aqiLabel(air?.current?.european_aqi),
    pm10: air?.current?.pm10 ?? null,
    pm25: air?.current?.pm2_5 ?? null,
    hourly,
    forecast: daily,
  };
}

export async function getWeatherByCity(city) {
  const [place] = await searchCities(city);
  if (!place) throw new Error('City not found');
  return getWeatherByCoordinates(place.latitude, place.longitude, place);
}

export { weatherCodeText, weatherEmoji };
