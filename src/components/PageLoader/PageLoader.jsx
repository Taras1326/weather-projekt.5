import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setHide(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={`page-loader ${hide ? "page-loader-hide" : ""}`}>
      <div className="page-loader-content">
        <div className="weather-loader-animation">
          <div className="weather-loader-sun" />

          <div className="weather-loader-cloud">
            <span />
            <span />
            <span />
          </div>
        </div>

        <h2 className="page-loader-title">
          Weather
        </h2>

        <p className="page-loader-text">
          Preparing your forecast...
        </p>

        <div className="page-loader-progress">
          <span />
        </div>
      </div>
    </div>
  );
}