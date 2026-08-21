import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function News() {
  const { language } = useLanguage();

  const content = {
    en: {
      eyebrow: "Weather & lifestyle",
      title: "Useful stories",
      subtitle: "Practical ideas for everyday life",
      readTip: "Read tip",
      seeMore: "See more stories",

      cards: [
        {
          image:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
          title: "Walking your dog safely in hot weather",
          tag: "Pets & weather",
          url: "https://www.rspca.org.uk/adviceandwelfare/pets/general/hotweather",
        },
        {
          image:
            "https://images.unsplash.com/photo-1514888286974-6c03b2ca1d?auto=format&fit=crop&w=800&q=80",
          title: "Keeping pets comfortable when storms arrive",
          tag: "Home guide",
          url: "https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness",
        },
        {
          image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
          title: "How to plan a better outdoor day with the forecast",
          tag: "Lifestyle",
          url: "https://weather.com/",
        },
        {
          image:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
          title: "Five weather signals to check before a weekend trip",
          tag: "Travel",
          url: "https://www.accuweather.com/",
        },
      ],
    },

    de: {
      eyebrow: "Wetter & Alltag",
      title: "Nützliche Artikel",
      subtitle: "Praktische Ideen für den Alltag",
      readTip: "Tipp lesen",
      seeMore: "Mehr Artikel",

      cards: [
        {
          image:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
          title: "Mit dem Hund sicher bei heißem Wetter spazieren gehen",
          tag: "Haustiere & Wetter",
          url: "https://www.rspca.org.uk/adviceandwelfare/pets/general/hotweather",
        },
        {
          image:
            "https://images.unsplash.com/photo-1514888286974-6c03b2ca1d?auto=format&fit=crop&w=800&q=80",
          title: "So bleiben Haustiere bei Gewitter entspannt",
          tag: "Ratgeber für Zuhause",
          url: "https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness",
        },
        {
          image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
          title:
            "So planst du mit der Wettervorhersage einen besseren Tag im Freien",
          tag: "Lifestyle",
          url: "https://weather.com/",
        },
        {
          image:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
          title: "Fünf Wetterzeichen vor einem Wochenendausflug",
          tag: "Reisen",
          url: "https://www.accuweather.com/",
        },
      ],
    },

    uk: {
      eyebrow: "Погода та стиль життя",
      title: "Корисні матеріали",
      subtitle: "Практичні ідеї для повсякденного життя",
      readTip: "Читати пораду",
      seeMore: "Більше матеріалів",

      cards: [
        {
          image:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
          title: "Як безпечно гуляти з собакою у спекотну погоду",
          tag: "Домашні тварини та погода",
          url: "https://www.rspca.org.uk/adviceandwelfare/pets/general/hotweather",
        },
        {
          image:
            "https://images.unsplash.com/photo-1514888286974-6c03b2ca1d?auto=format&fit=crop&w=800&q=80",
          title: "Як допомогти домашнім тваринам під час грози",
          tag: "Поради для дому",
          url: "https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness",
        },
        {
          image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
          title: "Як краще спланувати день на природі за прогнозом",
          tag: "Стиль життя",
          url: "https://weather.com/",
        },
        {
          image:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
          title: "П’ять погодних сигналів перед поїздкою на вихідні",
          tag: "Подорожі",
          url: "https://www.accuweather.com/",
        },
      ],
    },

    ru: {
      eyebrow: "Погода и образ жизни",
      title: "Полезные материалы",
      subtitle: "Практические идеи для повседневной жизни",
      readTip: "Читать совет",
      seeMore: "Больше материалов",

      cards: [
        {
          image:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
          title: "Как безопасно гулять с собакой в жаркую погоду",
          tag: "Домашние животные и погода",
          url: "https://www.rspca.org.uk/adviceandwelfare/pets/general/hotweather",
        },
        {
          image:
            "https://images.unsplash.com/photo-1514888286974-6c03b2ca1d?auto=format&fit=crop&w=800&q=80",
          title: "Как помочь домашним животным во время грозы",
          tag: "Советы для дома",
          url: "https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness",
        },
        {
          image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
          title: "Как лучше спланировать день на природе по прогнозу",
          tag: "Образ жизни",
          url: "https://weather.com/",
        },
        {
          image:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
          title: "Пять погодных сигналов перед поездкой на выходные",
          tag: "Путешествия",
          url: "https://www.accuweather.com/",
        },
      ],
    },
  };

  const current = content[language] || content.en;

  return (
    <section className="stories-section section-shell">
      <div className="container-wide">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{current.eyebrow}</p>

            <h2>{current.title}</h2>
          </div>

          <p>{current.subtitle}</p>
        </div>

        <div className="stories-grid">
          {current.cards.map((card) => (
            <article className="story-card" key={card.title}>
              <img src={card.image} alt={card.title} loading="lazy" />

              <span>{card.tag}</span>

              <h3>{card.title}</h3>

              <a
                className="story-read-button"
                href={card.url}
                target="_blank"
                rel="noreferrer"
              >
                {current.readTip}
                <FiExternalLink />
              </a>
            </article>
          ))}
        </div>

        <div className="stories-more-wrap">
          <a
            className="stories-more-button"
            href="https://news.google.com/search?q=weather%20climate%20travel"
            target="_blank"
            rel="noreferrer"
          >
            {current.seeMore}
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
