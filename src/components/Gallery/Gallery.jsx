import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext.jsx";

const images = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    alt: "Ocean sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    alt: "Mountain lake",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
    alt: "Lake house in mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    alt: "Road through mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
    alt: "Forest path",
  },
];

export default function Gallery() {
  const { language } = useLanguage();

  const textMap = {
    en: {
      eyebrow: "Inspiration",
      title: "Beautiful nature",
      open: "Open image",
      previous: "Previous",
      next: "Next",
      close: "Close",
    },
    de: {
      eyebrow: "Inspiration",
      title: "Schöne Natur",
      open: "Bild öffnen",
      previous: "Zurück",
      next: "Weiter",
      close: "Schließen",
    },
    uk: {
      eyebrow: "Натхнення",
      title: "Прекрасна природа",
      open: "Відкрити зображення",
      previous: "Попереднє",
      next: "Наступне",
      close: "Закрити",
    },
    ru: {
      eyebrow: "Вдохновение",
      title: "Прекрасная природа",
      open: "Открыть изображение",
      previous: "Предыдущее",
      next: "Следующее",
      close: "Закрыть",
    },
  };

  const t = textMap[language] || textMap.en;

  const [currentIndex, setCurrentIndex] = useState(2);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (lightboxIndex === null) return;

      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") prevLightbox();
      if (event.key === "ArrowRight") nextLightbox();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <section className="nature-section section-shell">
        <div className="container-wide">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h2>{t.title}</h2>
            </div>
          </div>

          <div className="nature-slider-wrap">
            <button
              type="button"
              className="nature-arrow nature-arrow-left"
              onClick={prevSlide}
              aria-label={t.previous}
            >
              <FiChevronLeft />
            </button>

            <div className="nature-slider">
              {images.map((image, index) => {
                const offset = index - currentIndex;
                const normalizedOffset =
                  offset < -2
                    ? offset + images.length
                    : offset > 2
                    ? offset - images.length
                    : offset;

                const isActive = index === currentIndex;

                return (
                  <button
                    type="button"
                    key={image.src}
                    className={`nature-card ${
                      isActive ? "is-active" : ""
                    } offset-${normalizedOffset}`}
                    onClick={() => openLightbox(index)}
                    aria-label={t.open}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="nature-arrow nature-arrow-right"
              onClick={nextSlide}
              aria-label={t.next}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="gallery-lightbox" onClick={closeLightbox}>
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={closeLightbox}
            aria-label={t.close}
          >
            <FiX />
          </button>

          <button
            type="button"
            className="gallery-lightbox-arrow left"
            onClick={(event) => {
              event.stopPropagation();
              prevLightbox();
            }}
            aria-label={t.previous}
          >
            <FiChevronLeft />
          </button>

          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
            />
          </div>

          <button
            type="button"
            className="gallery-lightbox-arrow right"
            onClick={(event) => {
              event.stopPropagation();
              nextLightbox();
            }}
            aria-label={t.next}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </>
  );
}
