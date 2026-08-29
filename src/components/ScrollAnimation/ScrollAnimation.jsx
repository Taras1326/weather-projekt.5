import { useEffect } from "react";

export default function ScrollAnimation() {
  useEffect(() => {
    const selector = [
      ".reveal",
      ".reveal-left",
      ".reveal-right",
      ".reveal-scale",
    ].join(", ");

    const elements = document.querySelectorAll(selector);

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("visible");
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            /*
             * Після першої появи перестаємо
             * слідкувати за елементом.
             *
             * Тобто анімація відбувається один раз.
             */
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
