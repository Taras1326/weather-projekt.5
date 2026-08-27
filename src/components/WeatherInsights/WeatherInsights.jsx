import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function WeatherInsights({ city }) {
  const { language } = useLanguage();

  const text = {
    en: {
      eyebrow: "SMART INSIGHTS",
      title: "Today's recommendations",
      subtitle: "Personalized advice based on current weather",
      umbrella: "Take an umbrella",
      umbrellaDesc: "Rain is likely today.",
      sunscreen: "Use sunscreen",
      sunscreenDesc: "UV levels are high today.",
      hydrate: "Stay hydrated",
      hydrateDesc: "High temperatures are expected.",
      wind: "Strong wind",
      windDesc: "Be careful outdoors due to strong winds.",
      air: "Air quality warning",
      airDesc: "Air quality is worse than recommended.",
      outdoor: "Great outdoor weather",
      outdoorDesc: "Conditions look good for outdoor activities.",
    },

    de: {
      eyebrow: "SMARTE HINWEISE",
      title: "Empfehlungen für heute",
      subtitle: "Persönliche Tipps basierend auf dem aktuellen Wetter",
      umbrella: "Regenschirm mitnehmen",
      umbrellaDesc: "Heute ist Regen wahrscheinlich.",
      sunscreen: "Sonnenschutz verwenden",
      sunscreenDesc: "Die UV-Belastung ist heute hoch.",
      hydrate: "Ausreichend trinken",
      hydrateDesc: "Hohe Temperaturen werden erwartet.",
      wind: "Starker Wind",
      windDesc: "Draußen wegen starken Windes vorsichtig sein.",
      air: "Warnung zur Luftqualität",
      airDesc: "Die Luftqualität ist schlechter als empfohlen.",
      outdoor: "Sehr gutes Wetter draußen",
      outdoorDesc: "Die Bedingungen eignen sich gut für Aktivitäten im Freien.",
    },

    uk: {
      eyebrow: "РОЗУМНІ ПОРАДИ",
      title: "Рекомендації на сьогодні",
      subtitle: "Персональні поради на основі поточної погоди",
      umbrella: "Візьміть парасолю",
      umbrellaDesc: "Сьогодні є висока ймовірність дощу.",
      sunscreen: "Використовуйте сонцезахисний крем",
      sunscreenDesc: "Сьогодні високий рівень UV.",
      hydrate: "Пийте більше води",
      hydrateDesc: "Очікується висока температура.",
      wind: "Сильний вітер",
      windDesc: "Будьте обережні надворі через сильний вітер.",
      air: "Погана якість повітря",
      airDesc: "Якість повітря гірша за рекомендований рівень.",
      outdoor: "Чудова погода для прогулянок",
      outdoorDesc: "Умови добре підходять для активностей надворі.",
    },

    ru: {
      eyebrow: "УМНЫЕ СОВЕТЫ",
      title: "Рекомендации на сегодня",
      subtitle: "Персональные советы на основе текущей погоды",
      umbrella: "Возьмите зонт",
      umbrellaDesc: "Сегодня высокая вероятность дождя.",
      sunscreen: "Используйте солнцезащитный крем",
      sunscreenDesc: "Сегодня высокий уровень UV.",
      hydrate: "Пейте больше воды",
      hydrateDesc: "Ожидается высокая температура.",
      wind: "Сильный ветер",
      windDesc: "Будьте осторожны на улице из-за сильного ветра.",
      air: "Плохое качество воздуха",
      airDesc: "Качество воздуха хуже рекомендуемого уровня.",
      outdoor: "Отличная погода для прогулок",
      outdoorDesc: "Условия хорошо подходят для активностей на улице.",
    },
  };

  const currentText = text[language] || text.en;

  const insights = useMemo(() => {
    if (!city) {
      return [];
    }

    const result = [];

    if ((city.precipitationProbability ?? 0) >= 50) {
      result.push({
        icon: "☔",
        title: currentText.umbrella,
        description: currentText.umbrellaDesc,
        type: "rain",
      });
    }

    if ((city.uvIndex ?? 0) >= 6) {
      result.push({
        icon: "☀️",
        title: currentText.sunscreen,
        description: currentText.sunscreenDesc,
        type: "sun",
      });
    }

    if ((city.temperature ?? 0) >= 28) {
      result.push({
        icon: "💧",
        title: currentText.hydrate,
        description: currentText.hydrateDesc,
        type: "heat",
      });
    }

    if ((city.windSpeed ?? 0) >= 30) {
      result.push({
        icon: "💨",
        title: currentText.wind,
        description: currentText.windDesc,
        type: "wind",
      });
    }

    if ((city.airQuality?.europeanAqi ?? 0) >= 60) {
      result.push({
        icon: "😷",
        title: currentText.air,
        description: currentText.airDesc,
        type: "air",
      });
    }

    if (
      result.length === 0 &&
      (city.precipitationProbability ?? 0) < 30 &&
      (city.windSpeed ?? 0) < 25 &&
      (city.temperature ?? 0) >= 12 &&
      (city.temperature ?? 0) <= 27
    ) {
      result.push({
        icon: "🌿",
        title: currentText.outdoor,
        description: currentText.outdoorDesc,
        type: "good",
      });
    }

    return result.slice(0, 4);
  }, [city, currentText]);

  if (!city) {
    return null;
  }

  return (
    <section className="insights-section section-shell">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{currentText.eyebrow}</p>

            <h2>{currentText.title}</h2>
          </div>

          <p>{currentText.subtitle}</p>
        </div>

        <div className="insights-grid">
          {insights.map((item, index) => (
            <article
              className={`insight-card insight-${item.type}`}
              key={`${item.type}-${index}`}
            >
              <div className="insight-icon">
                {item.icon}
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}