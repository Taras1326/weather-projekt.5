import { getComfortAdvice } from "../../utils/weather";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function ComfortAdvice({ city }) {
  const { language } = useLanguage();

  if (!city) {
    return null;
  }

  const advice = getComfortAdvice(city);

  const text = {
    en: {
      eyebrow: "Smart assistant",
      title: "Today’s comfort guide",
      subtitle: "Simple tips based on current conditions",

      titles: {
        "What to wear": "What to wear",
        Umbrella: "Umbrella",
        Sunscreen: "Sunscreen",
        Hydration: "Hydration",
        "Outdoor activity": "Outdoor activity",
        Jacket: "Jacket",
      },

      phrases: {
        "Take a jacket": "Take a jacket",
        "Light clothes are enough": "Light clothes are enough",
        "Take an umbrella": "Take an umbrella",
        "No umbrella needed": "No umbrella needed",
        "Use sunscreen": "Use sunscreen",
        "Low UV risk": "Low UV risk",
        "Good conditions for outdoor activities":
          "Good conditions for outdoor activities",
        "Outdoor conditions are not ideal": "Outdoor conditions are not ideal",
        "Remember to drink enough water": "Remember to drink enough water",
      },
    },

    de: {
      eyebrow: "Intelligenter Assistent",
      title: "Komfort-Tipps für heute",
      subtitle: "Einfache Tipps basierend auf den aktuellen Bedingungen",

      titles: {
        "What to wear": "Was anziehen",
        Umbrella: "Regenschirm",
        Sunscreen: "Sonnenschutz",
        Hydration: "Flüssigkeitszufuhr",
        "Outdoor activity": "Aktivitäten draußen",
        Jacket: "Jacke",
      },

      phrases: {
        "Take a jacket": "Nimm eine Jacke mit",
        "Light clothes are enough": "Leichte Kleidung reicht aus",
        "Take an umbrella": "Nimm einen Regenschirm mit",
        "No umbrella needed": "Kein Regenschirm nötig",
        "Use sunscreen": "Sonnenschutz verwenden",
        "Low UV risk": "Geringes UV-Risiko",
        "Good conditions for outdoor activities":
          "Gute Bedingungen für Aktivitäten draußen",
        "Outdoor conditions are not ideal":
          "Die Bedingungen draußen sind nicht ideal",
        "Remember to drink enough water":
          "Vergiss nicht, genug Wasser zu trinken",
      },
    },

    uk: {
      eyebrow: "Розумний помічник",
      title: "Поради для комфорту на сьогодні",
      subtitle: "Прості поради на основі поточних погодних умов",

      titles: {
        "What to wear": "Що одягнути",
        Umbrella: "Парасоля",
        Sunscreen: "Сонцезахисний крем",
        Hydration: "Вода",
        "Outdoor activity": "Активність надворі",
        Jacket: "Куртка",
      },

      phrases: {
        "Take a jacket": "Візьміть куртку",
        "Light clothes are enough": "Легкого одягу буде достатньо",
        "Take an umbrella": "Візьміть парасолю",
        "No umbrella needed": "Парасоля не потрібна",
        "Use sunscreen": "Використовуйте сонцезахисний крем",
        "Low UV risk": "Низький рівень UV",
        "Good conditions for outdoor activities":
          "Хороші умови для активності надворі",
        "Outdoor conditions are not ideal":
          "Умови для активності надворі не найкращі",
        "Remember to drink enough water": "Не забувайте пити достатньо води",
      },
    },

    ru: {
      eyebrow: "Умный помощник",
      title: "Советы для комфорта на сегодня",
      subtitle: "Простые советы на основе текущих погодных условий",

      titles: {
        "What to wear": "Что надеть",
        Umbrella: "Зонт",
        Sunscreen: "Солнцезащитный крем",
        Hydration: "Вода",
        "Outdoor activity": "Активность на улице",
        Jacket: "Куртка",
      },

      phrases: {
        "Take a jacket": "Возьмите куртку",
        "Light clothes are enough": "Лёгкой одежды будет достаточно",
        "Take an umbrella": "Возьмите зонт",
        "No umbrella needed": "Зонт не нужен",
        "Use sunscreen": "Используйте солнцезащитный крем",
        "Low UV risk": "Низкий уровень UV",
        "Good conditions for outdoor activities":
          "Хорошие условия для активности на улице",
        "Outdoor conditions are not ideal":
          "Условия для активности на улице не идеальны",
        "Remember to drink enough water": "Не забывайте пить достаточно воды",
      },
    },
  };

  const currentText = text[language] || text.en;

  const translateTitle = (value) => currentText.titles[value] || value;

  const translatePhrase = (value) => currentText.phrases[value] || value;

  return (
    <section className="advice-section section-shell">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{currentText.eyebrow}</p>

            <h2>{currentText.title}</h2>
          </div>

          <p>{currentText.subtitle}</p>
        </div>

        <div className="advice-grid">
          {advice.map((item) => (
            <article className="advice-card" key={`${item.title}-${item.text}`}>
              <span>{item.icon}</span>

              <div>
                <h3>{translateTitle(item.title)}</h3>

                <p>{translatePhrase(item.text)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
