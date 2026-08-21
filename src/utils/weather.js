/* =========================================
   CURRENT LANGUAGE
========================================= */

function getLanguage() {
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

function getLocale() {
  const language = getLanguage();

  const locales = {
    en: "en-US",
    de: "de-DE",
    uk: "uk-UA",
    ru: "ru-RU",
  };

  return locales[language] || "en-US";
}

/* =========================================
   WEATHER CODES
========================================= */

const weatherTranslations = {
  en: {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    56: "Freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Rain showers",
    82: "Heavy showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Heavy thunderstorm with hail",
    default: "Weather",
  },

  de: {
    0: "Klarer Himmel",
    1: "Überwiegend klar",
    2: "Teilweise bewölkt",
    3: "Bedeckt",
    45: "Nebel",
    48: "Raureifnebel",
    51: "Leichter Nieselregen",
    53: "Nieselregen",
    55: "Starker Nieselregen",
    56: "Gefrierender Nieselregen",
    57: "Starker gefrierender Nieselregen",
    61: "Leichter Regen",
    63: "Regen",
    65: "Starker Regen",
    66: "Gefrierender Regen",
    67: "Starker gefrierender Regen",
    71: "Leichter Schneefall",
    73: "Schnee",
    75: "Starker Schneefall",
    77: "Schneegriesel",
    80: "Regenschauer",
    81: "Regenschauer",
    82: "Starke Regenschauer",
    85: "Schneeschauer",
    86: "Starke Schneeschauer",
    95: "Gewitter",
    96: "Gewitter mit Hagel",
    99: "Starkes Gewitter mit Hagel",
    default: "Wetter",
  },

  uk: {
    0: "Ясне небо",
    1: "Переважно ясно",
    2: "Мінлива хмарність",
    3: "Похмуро",
    45: "Туман",
    48: "Паморозевий туман",
    51: "Легка мряка",
    53: "Мряка",
    55: "Сильна мряка",
    56: "Крижана мряка",
    57: "Сильна крижана мряка",
    61: "Невеликий дощ",
    63: "Дощ",
    65: "Сильний дощ",
    66: "Крижаний дощ",
    67: "Сильний крижаний дощ",
    71: "Невеликий сніг",
    73: "Сніг",
    75: "Сильний сніг",
    77: "Сніжна крупа",
    80: "Дощові зливи",
    81: "Дощові зливи",
    82: "Сильні зливи",
    85: "Снігові зливи",
    86: "Сильні снігові зливи",
    95: "Гроза",
    96: "Гроза з градом",
    99: "Сильна гроза з градом",
    default: "Погода",
  },

  ru: {
    0: "Ясное небо",
    1: "Преимущественно ясно",
    2: "Переменная облачность",
    3: "Пасмурно",
    45: "Туман",
    48: "Изморозевый туман",
    51: "Лёгкая морось",
    53: "Морось",
    55: "Сильная морось",
    56: "Ледяная морось",
    57: "Сильная ледяная морось",
    61: "Небольшой дождь",
    63: "Дождь",
    65: "Сильный дождь",
    66: "Ледяной дождь",
    67: "Сильный ледяной дождь",
    71: "Небольшой снег",
    73: "Снег",
    75: "Сильный снег",
    77: "Снежная крупа",
    80: "Ливневый дождь",
    81: "Ливневый дождь",
    82: "Сильные ливни",
    85: "Снежные заряды",
    86: "Сильные снежные заряды",
    95: "Гроза",
    96: "Гроза с градом",
    99: "Сильная гроза с градом",
    default: "Погода",
  },
};

const iconMap = {
  0: "sun",
  1: "sun",
  2: "partly",
  3: "cloud",

  45: "fog",
  48: "fog",

  51: "drizzle",
  53: "drizzle",
  55: "rain",

  56: "sleet",
  57: "sleet",

  61: "rain",
  63: "rain",
  65: "rain",

  66: "sleet",
  67: "sleet",

  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",

  80: "showers",
  81: "showers",
  82: "showers",

  85: "snow",
  86: "snow",

  95: "storm",
  96: "storm",
  99: "storm",
};

/*
  Залишаємо weatherCodeMap також,
  щоб інші частини сайту не зламалися,
  якщо десь він імпортується напряму.
*/

export const weatherCodeMap = {
  0: { label: "Clear sky", icon: "sun" },
  1: { label: "Mainly clear", icon: "sun" },
  2: { label: "Partly cloudy", icon: "partly" },
  3: { label: "Overcast", icon: "cloud" },
  45: { label: "Fog", icon: "fog" },
  48: { label: "Rime fog", icon: "fog" },
  51: { label: "Light drizzle", icon: "drizzle" },
  53: { label: "Drizzle", icon: "drizzle" },
  55: { label: "Heavy drizzle", icon: "rain" },
  56: { label: "Freezing drizzle", icon: "sleet" },
  57: { label: "Heavy freezing drizzle", icon: "sleet" },
  61: { label: "Light rain", icon: "rain" },
  63: { label: "Rain", icon: "rain" },
  65: { label: "Heavy rain", icon: "rain" },
  66: { label: "Freezing rain", icon: "sleet" },
  67: { label: "Heavy freezing rain", icon: "sleet" },
  71: { label: "Light snow", icon: "snow" },
  73: { label: "Snow", icon: "snow" },
  75: { label: "Heavy snow", icon: "snow" },
  77: { label: "Snow grains", icon: "snow" },
  80: { label: "Rain showers", icon: "showers" },
  81: { label: "Rain showers", icon: "showers" },
  82: { label: "Heavy showers", icon: "showers" },
  85: { label: "Snow showers", icon: "snow" },
  86: { label: "Heavy snow showers", icon: "snow" },
  95: { label: "Thunderstorm", icon: "storm" },
  96: { label: "Thunderstorm with hail", icon: "storm" },
  99: { label: "Heavy thunderstorm with hail", icon: "storm" },
};

/* =========================================
   WEATHER META
========================================= */

export function getWeatherMeta(code) {
  const language = getLanguage();

  const dictionary = weatherTranslations[language] || weatherTranslations.en;

  return {
    label: dictionary[code] || dictionary.default,

    icon: iconMap[code] || "partly",
  };
}

/* =========================================
   TEMPERATURE
========================================= */

export function cToF(c) {
  return Math.round((c * 9) / 5 + 32);
}

export function formatTemperature(value, unit = "C") {
  if (!Number.isFinite(Number(value))) {
    return "—";
  }

  const temp = unit === "F" ? cToF(Number(value)) : Math.round(Number(value));

  return `${temp}°${unit}`;
}

/* =========================================
   WIND
========================================= */

export function kmhToMph(value) {
  return Math.round(Number(value) * 0.621371);
}

export function formatWind(value, unit = "C") {
  if (!Number.isFinite(Number(value))) {
    return "—";
  }

  return unit === "F"
    ? `${kmhToMph(value)} mph`
    : `${Math.round(Number(value))} km/h`;
}

export function getWindDirection(degrees = 0) {
  const language = getLanguage();

  const directions = {
    en: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],

    de: ["N", "NO", "O", "SO", "S", "SW", "W", "NW"],

    uk: ["Пн", "Пн-Сх", "Сх", "Пд-Сх", "Пд", "Пд-Зх", "Зх", "Пн-Зх"],

    ru: ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"],
  };

  const current = directions[language] || directions.en;

  const index = Math.round(Number(degrees) / 45) % 8;

  return current[index];
}

/* =========================================
   DISTANCE
========================================= */

export function metersToKm(value) {
  return Number.isFinite(Number(value)) ? Number(value) / 1000 : 0;
}

/* =========================================
   AIR QUALITY
========================================= */

export function getAqiLabel(aqi) {
  const language = getLanguage();

  const labels = {
    en: {
      noData: "No data",
      excellent: "Excellent",
      good: "Good",
      moderate: "Moderate",
      poor: "Poor",
      veryPoor: "Very poor",
      extremelyPoor: "Extremely poor",
    },

    de: {
      noData: "Keine Daten",
      excellent: "Ausgezeichnet",
      good: "Gut",
      moderate: "Mittel",
      poor: "Schlecht",
      veryPoor: "Sehr schlecht",
      extremelyPoor: "Extrem schlecht",
    },

    uk: {
      noData: "Немає даних",
      excellent: "Відмінна",
      good: "Добра",
      moderate: "Помірна",
      poor: "Погана",
      veryPoor: "Дуже погана",
      extremelyPoor: "Надзвичайно погана",
    },

    ru: {
      noData: "Нет данных",
      excellent: "Отличное",
      good: "Хорошее",
      moderate: "Умеренное",
      poor: "Плохое",
      veryPoor: "Очень плохое",
      extremelyPoor: "Крайне плохое",
    },
  };

  const text = labels[language] || labels.en;

  if (aqi == null) {
    return {
      label: text.noData,
      level: "neutral",
    };
  }

  if (aqi <= 20) {
    return {
      label: text.excellent,
      level: "good",
    };
  }

  if (aqi <= 40) {
    return {
      label: text.good,
      level: "good",
    };
  }

  if (aqi <= 60) {
    return {
      label: text.moderate,
      level: "moderate",
    };
  }

  if (aqi <= 80) {
    return {
      label: text.poor,
      level: "poor",
    };
  }

  if (aqi <= 100) {
    return {
      label: text.veryPoor,
      level: "poor",
    };
  }

  return {
    label: text.extremelyPoor,
    level: "danger",
  };
}

/* =========================================
   UV INDEX
========================================= */

export function getUvLabel(uv) {
  const language = getLanguage();

  const labels = {
    en: {
      noData: "No data",
      low: "Low",
      moderate: "Moderate",
      high: "High",
      veryHigh: "Very high",
      extreme: "Extreme",
    },

    de: {
      noData: "Keine Daten",
      low: "Niedrig",
      moderate: "Mittel",
      high: "Hoch",
      veryHigh: "Sehr hoch",
      extreme: "Extrem",
    },

    uk: {
      noData: "Немає даних",
      low: "Низький",
      moderate: "Помірний",
      high: "Високий",
      veryHigh: "Дуже високий",
      extreme: "Екстремальний",
    },

    ru: {
      noData: "Нет данных",
      low: "Низкий",
      moderate: "Умеренный",
      high: "Высокий",
      veryHigh: "Очень высокий",
      extreme: "Экстремальный",
    },
  };

  const text = labels[language] || labels.en;

  if (uv == null) {
    return text.noData;
  }

  if (uv < 3) {
    return text.low;
  }

  if (uv < 6) {
    return text.moderate;
  }

  if (uv < 8) {
    return text.high;
  }

  if (uv < 11) {
    return text.veryHigh;
  }

  return text.extreme;
}

/* =========================================
   TIME
========================================= */

export function formatHour(dateString, timeZone) {
  return new Intl.DateTimeFormat(getLocale(), {
    hour: "numeric",
    timeZone,
  }).format(new Date(dateString));
}

export function formatShortDate(dateString, timeZone) {
  return new Intl.DateTimeFormat(getLocale(), {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone,
  }).format(new Date(dateString));
}

/* =========================================
   COMFORT ADVICE
========================================= */

export function getComfortAdvice(city) {
  if (!city) {
    return [];
  }

  const language = getLanguage();

  const content = {
    en: {
      dressWarmly: {
        title: "Dress warmly",
        text: "A warm jacket and layers will feel more comfortable.",
      },

      lightJacket: {
        title: "Take a light jacket",
        text: "A sweater or light jacket is a good choice.",
      },

      hydrated: {
        title: "Stay hydrated",
        text: "It is hot outside. Take water and avoid long sun exposure.",
      },

      comfortable: {
        title: "Comfortable weather",
        text: "Light everyday clothing should work well.",
      },

      umbrella: {
        title: "Take an umbrella",
      },

      rainRisk: {
        title: "Low rain risk",
        text: "An umbrella is probably not necessary right now.",
      },

      uv: {
        title: "UV protection",
      },

      wind: {
        title: "Strong wind",
        text: "Expect strong wind. Secure loose items and be careful outside.",
      },

      air: {
        title: "Air quality alert",
        text: "Air quality is reduced. Sensitive people may want to limit outdoor activity.",
      },

      precipitationChance: (value) =>
        `${value}% chance of precipitation today.`,

      uvText: (value) =>
        `UV index ${value}. Sunglasses and sunscreen are recommended.`,
    },

    de: {
      dressWarmly: {
        title: "Warm anziehen",
        text: "Eine warme Jacke und mehrere Kleidungsschichten sind angenehmer.",
      },

      lightJacket: {
        title: "Leichte Jacke mitnehmen",
        text: "Ein Pullover oder eine leichte Jacke ist eine gute Wahl.",
      },

      hydrated: {
        title: "Ausreichend trinken",
        text: "Draußen ist es heiß. Nimm Wasser mit und vermeide lange direkte Sonneneinstrahlung.",
      },

      comfortable: {
        title: "Angenehmes Wetter",
        text: "Leichte Alltagskleidung sollte gut passen.",
      },

      umbrella: {
        title: "Regenschirm mitnehmen",
      },

      rainRisk: {
        title: "Geringes Regenrisiko",
        text: "Ein Regenschirm ist momentan wahrscheinlich nicht notwendig.",
      },

      uv: {
        title: "UV-Schutz",
      },

      wind: {
        title: "Starker Wind",
        text: "Es wird starker Wind erwartet. Sichere lose Gegenstände und sei draußen vorsichtig.",
      },

      air: {
        title: "Warnung zur Luftqualität",
        text: "Die Luftqualität ist eingeschränkt. Empfindliche Personen sollten Aktivitäten draußen reduzieren.",
      },

      precipitationChance: (value) =>
        `${value}% Niederschlagswahrscheinlichkeit heute.`,

      uvText: (value) =>
        `UV-Index ${value}. Sonnenbrille und Sonnenschutz werden empfohlen.`,
    },

    uk: {
      dressWarmly: {
        title: "Одягніться тепліше",
        text: "Тепла куртка та кілька шарів одягу допоможуть почуватися комфортніше.",
      },

      lightJacket: {
        title: "Візьміть легку куртку",
        text: "Светр або легка куртка будуть хорошим вибором.",
      },

      hydrated: {
        title: "Пийте достатньо води",
        text: "Надворі спекотно. Візьміть воду та уникайте тривалого перебування під прямим сонцем.",
      },

      comfortable: {
        title: "Комфортна погода",
        text: "Легкий повсякденний одяг буде хорошим вибором.",
      },

      umbrella: {
        title: "Візьміть парасолю",
      },

      rainRisk: {
        title: "Низький ризик дощу",
        text: "Зараз парасоля, найімовірніше, не знадобиться.",
      },

      uv: {
        title: "Захист від UV",
      },

      wind: {
        title: "Сильний вітер",
        text: "Очікується сильний вітер. Закріпіть легкі предмети та будьте обережні надворі.",
      },

      air: {
        title: "Попередження про якість повітря",
        text: "Якість повітря погіршена. Чутливим людям краще обмежити активність надворі.",
      },

      precipitationChance: (value) =>
        `Ймовірність опадів сьогодні — ${value}%.`,

      uvText: (value) =>
        `UV-індекс ${value}. Рекомендуються сонцезахисні окуляри та крем SPF.`,
    },

    ru: {
      dressWarmly: {
        title: "Одевайтесь теплее",
        text: "Тёплая куртка и несколько слоёв одежды помогут чувствовать себя комфортнее.",
      },

      lightJacket: {
        title: "Возьмите лёгкую куртку",
        text: "Свитер или лёгкая куртка будут хорошим выбором.",
      },

      hydrated: {
        title: "Пейте достаточно воды",
        text: "На улице жарко. Возьмите воду и избегайте длительного пребывания под прямым солнцем.",
      },

      comfortable: {
        title: "Комфортная погода",
        text: "Лёгкая повседневная одежда будет хорошим выбором.",
      },

      umbrella: {
        title: "Возьмите зонт",
      },

      rainRisk: {
        title: "Низкий риск дождя",
        text: "Сейчас зонт, скорее всего, не понадобится.",
      },

      uv: {
        title: "Защита от UV",
      },

      wind: {
        title: "Сильный ветер",
        text: "Ожидается сильный ветер. Закрепите лёгкие предметы и будьте осторожны на улице.",
      },

      air: {
        title: "Предупреждение о качестве воздуха",
        text: "Качество воздуха снижено. Чувствительным людям лучше ограничить активность на улице.",
      },

      precipitationChance: (value) =>
        `Вероятность осадков сегодня — ${value}%.`,

      uvText: (value) =>
        `UV-индекс ${value}. Рекомендуются солнцезащитные очки и крем SPF.`,
    },
  };

  const text = content[language] || content.en;

  const tips = [];

  const temp = city.temperature;

  const rainChance = city.precipitationProbability ?? 0;

  const uv = city.uvIndex ?? 0;

  const wind = city.windSpeed ?? 0;

  const aqi = city.airQuality?.europeanAqi;

  /* CLOTHING */

  if (temp <= 5) {
    tips.push({
      icon: "🧥",
      title: text.dressWarmly.title,
      text: text.dressWarmly.text,
    });
  } else if (temp <= 15) {
    tips.push({
      icon: "🧶",
      title: text.lightJacket.title,
      text: text.lightJacket.text,
    });
  } else if (temp >= 28) {
    tips.push({
      icon: "💧",
      title: text.hydrated.title,
      text: text.hydrated.text,
    });
  } else {
    tips.push({
      icon: "👕",
      title: text.comfortable.title,
      text: text.comfortable.text,
    });
  }

  /* RAIN */

  if (rainChance >= 45) {
    tips.push({
      icon: "☂️",

      title: text.umbrella.title,

      text: text.precipitationChance(Math.round(rainChance)),
    });
  } else {
    tips.push({
      icon: "🌤️",

      title: text.rainRisk.title,

      text: text.rainRisk.text,
    });
  }

  /* UV */

  if (uv >= 6) {
    tips.push({
      icon: "🧴",

      title: text.uv.title,

      text: text.uvText(Math.round(uv)),
    });
  }

  /* WIND */

  if (wind >= 35) {
    tips.push({
      icon: "💨",

      title: text.wind.title,

      text: text.wind.text,
    });
  }

  /* AIR */

  if (aqi != null && aqi > 60) {
    tips.push({
      icon: "😷",

      title: text.air.title,

      text: text.air.text,
    });
  }

  return tips.slice(0, 4);
}

/* =========================================
   TRAVEL SCORE
========================================= */

export function scoreTravelWeather(city) {
  if (!city) {
    return 0;
  }

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
