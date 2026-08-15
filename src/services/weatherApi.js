const API_KEY = '7be3d79b971643d58b8144248260808';

const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeatherByCity(city) {
  const url =
    `${BASE_URL}/forecast.json` +
    `?key=${API_KEY}` +
    `&q=${encodeURIComponent(city)}` +
    `&days=7` +
    `&aqi=no` +
    `&alerts=no`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Місто не знайдено');
  }

  const data = await response.json();

  return {
    id: data.location.name + data.location.country,

    city: data.location.name,

    country: data.location.country,

    lat: data.location.lat,

    lon: data.location.lon,

    temperature: Math.round(data.current.temp_c),

    feelsLike: Math.round(
      data.current.feelslike_c
    ),

    minTemperature: Math.round(
      data.forecast.forecastday[0].day.mintemp_c
    ),

    maxTemperature: Math.round(
      data.forecast.forecastday[0].day.maxtemp_c
    ),

    pressure: data.current.pressure_mb,

    humidity: data.current.humidity,

    visibility: data.current.vis_km,

    windSpeed: data.current.wind_kph,

    description: data.current.condition.text,

    icon: data.current.condition.icon,

    updatedAt: data.location.localtime,

    hourly: data.forecast.forecastday[0].hour,

    forecast: data.forecast.forecastday,
  };
}