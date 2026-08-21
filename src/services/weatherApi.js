import { getWeatherMeta, metersToKm } from "../utils/weather";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

const AQI_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

/* =========================================
   LANGUAGE
========================================= */

function getCurrentLanguage() {
  try {
    const saved = localStorage.getItem("weather-language");

    if (["en", "de", "uk", "ru"].includes(saved)) {
      return saved;
    }
  } catch {
    // ignore
  }

  return "en";
}

function getText() {
  const language = getCurrentLanguage();

  const texts = {
    en: {
      searchUnavailable: "Location search is unavailable",

      weatherUnavailable: "Weather data is unavailable",

      cityNotFound: "City not found",

      currentLocation: "Current location",
    },

    de: {
      searchUnavailable: "Die Standortsuche ist derzeit nicht verfügbar",

      weatherUnavailable: "Wetterdaten sind derzeit nicht verfügbar",

      cityNotFound: "Stadt nicht gefunden",

      currentLocation: "Aktueller Standort",
    },

    uk: {
      searchUnavailable: "Пошук місцезнаходження зараз недоступний",

      weatherUnavailable: "Дані про погоду зараз недоступні",

      cityNotFound: "Місто не знайдено",

      currentLocation: "Поточне місцезнаходження",
    },

    ru: {
      searchUnavailable: "Поиск местоположения сейчас недоступен",

      weatherUnavailable: "Данные о погоде сейчас недоступны",

      cityNotFound: "Город не найден",

      currentLocation: "Текущее местоположение",
    },
  };

  return texts[language] || texts.en;
}

/* =========================================
   CITY SEARCH
========================================= */

export async function searchCities(query, count = 6) {
  const value = String(query || "").trim();

  if (value.length < 2) {
    return [];
  }

  const language = getCurrentLanguage();

  const params = new URLSearchParams({
    name: value,
    count: String(count),
    language,
    format: "json",
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`);

  if (!response.ok) {
    throw new Error(getText().searchUnavailable);
  }

  const data = await response.json();

  return (data.results || []).map((item) => ({
    id: item.id,

    city: item.name,

    country: item.country || "",

    countryCode: item.country_code || "",

    admin1: item.admin1 || "",

    lat: item.latitude,

    lon: item.longitude,

    timezone: item.timezone || "auto",
  }));
}

/* =========================================
   AIR QUALITY
========================================= */

async function fetchAirQuality(lat, lon, timezone) {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,

      current: "european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone",

      timezone: timezone || "auto",
    });

    const response = await fetch(`${AQI_URL}?${params}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return {
      europeanAqi: data.current?.european_aqi ?? null,

      pm10: data.current?.pm10 ?? null,

      pm25: data.current?.pm2_5 ?? null,

      carbonMonoxide: data.current?.carbon_monoxide ?? null,

      nitrogenDioxide: data.current?.nitrogen_dioxide ?? null,

      ozone: data.current?.ozone ?? null,
    };
  } catch {
    return null;
  }
}

/* =========================================
   WEATHER PARSER
========================================= */

function parseWeather(data, location, airQuality) {
  const current = data.current;

  const hourly = data.hourly;

  const daily = data.daily;

  const meta = getWeatherMeta(current.weather_code);

  const now = new Date(current.time).getTime();

  let currentHourIndex = hourly.time.findIndex(
    (time) => new Date(time).getTime() >= now
  );

  if (currentHourIndex < 0) {
    currentHourIndex = 0;
  }

  /* =======================================
     HOURLY
  ======================================= */

  const hourlyItems = hourly.time
    .slice(currentHourIndex, currentHourIndex + 48)
    .map((time, index) => {
      const i = currentHourIndex + index;

      return {
        time,

        temperature: hourly.temperature_2m[i],

        feelsLike: hourly.apparent_temperature[i],

        precipitationProbability: hourly.precipitation_probability[i],

        precipitation: hourly.precipitation[i],

        humidity: hourly.relative_humidity_2m[i],

        windSpeed: hourly.wind_speed_10m[i],

        visibility: metersToKm(hourly.visibility[i]),

        uvIndex: hourly.uv_index[i],

        weatherCode: hourly.weather_code[i],

        ...getWeatherMeta(hourly.weather_code[i]),
      };
    });

  /* =======================================
     DAILY
  ======================================= */

  const dailyItems = daily.time.map((time, i) => ({
    date: time,

    weatherCode: daily.weather_code[i],

    minTemperature: daily.temperature_2m_min[i],

    maxTemperature: daily.temperature_2m_max[i],

    sunrise: daily.sunrise[i],

    sunset: daily.sunset[i],

    precipitationSum: daily.precipitation_sum[i],

    precipitationProbability: daily.precipitation_probability_max[i],

    windSpeedMax: daily.wind_speed_10m_max[i],

    windGustsMax: daily.wind_gusts_10m_max[i],

    uvIndexMax: daily.uv_index_max[i],

    ...getWeatherMeta(daily.weather_code[i]),
  }));

  /* =======================================
     FINAL CITY OBJECT
  ======================================= */

  return {
    id: `${location.lat.toFixed(3)}-${location.lon.toFixed(3)}`,

    city: location.city,

    country: location.country || "",

    admin1: location.admin1 || "",

    lat: location.lat,

    lon: location.lon,

    timezone: data.timezone,

    timezoneAbbreviation: data.timezone_abbreviation,

    temperature: current.temperature_2m,

    feelsLike: current.apparent_temperature,

    humidity: current.relative_humidity_2m,

    pressure: current.pressure_msl,

    surfacePressure: current.surface_pressure,

    precipitation: current.precipitation,

    rain: current.rain,

    showers: current.showers,

    snowfall: current.snowfall,

    cloudCover: current.cloud_cover,

    visibility: metersToKm(current.visibility),

    windSpeed: current.wind_speed_10m,

    windDirection: current.wind_direction_10m,

    windGusts: current.wind_gusts_10m,

    isDay: current.is_day === 1,

    weatherCode: current.weather_code,

    description: meta.label,

    weatherIcon: meta.icon,

    updatedAt: current.time,

    minTemperature: dailyItems[0]?.minTemperature,

    maxTemperature: dailyItems[0]?.maxTemperature,

    precipitationProbability: dailyItems[0]?.precipitationProbability,

    uvIndex: dailyItems[0]?.uvIndexMax,

    sunrise: dailyItems[0]?.sunrise,

    sunset: dailyItems[0]?.sunset,

    hourly: hourlyItems,

    forecast: dailyItems,

    airQuality,
  };
}

/* =========================================
   WEATHER BY COORDINATES
========================================= */

export async function getWeatherByCoords(lat, lon, location = {}) {
  const params = new URLSearchParams({
    latitude: lat,

    longitude: lon,

    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility",

    hourly:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,visibility,wind_speed_10m,uv_index",

    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,uv_index_max",

    timezone: "auto",

    forecast_days: "14",

    wind_speed_unit: "kmh",
  });

  const response = await fetch(`${FORECAST_URL}?${params}`);

  if (!response.ok) {
    throw new Error(getText().weatherUnavailable);
  }

  const data = await response.json();

  const resolvedLocation = {
    city: location.city || getText().currentLocation,

    country: location.country || "",

    admin1: location.admin1 || "",

    lat: Number(lat),

    lon: Number(lon),
  };

  const airQuality = await fetchAirQuality(lat, lon, data.timezone);

  return parseWeather(data, resolvedLocation, airQuality);
}

/* =========================================
   WEATHER BY CITY
========================================= */

export async function getWeatherByCity(cityOrLocation) {
  let location = cityOrLocation;

  if (typeof cityOrLocation === "string") {
    const matches = await searchCities(cityOrLocation, 1);

    if (!matches.length) {
      throw new Error(getText().cityNotFound);
    }

    [location] = matches;
  }

  return getWeatherByCoords(location.lat, location.lon, location);
}
