import { useEffect, useMemo, useState } from "react";

/* ==========================================
   COMPONENTS
========================================== */

import Header from "./components/Header/Header";

import Hero from "./components/Hero/Hero";

import WeatherList from "./components/WeatherList/WeatherList";

import WeatherDetails from "./components/WeatherDetails/WeatherDetails";

import HourlyForecast from "./components/HourlyForecast/HourlyForecast";

import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";

import ComfortAdvice from "./components/ComfortAdvice/ComfortAdvice";

import WeatherInsights from "./components/WeatherInsights/WeatherInsights";

import News from "./components/News/News";

import Gallery from "./components/Gallery/Gallery";

import WeatherAlerts from "./components/WeatherAlerts/WeatherAlerts";

import SupportChat from "./components/SupportChat/SupportChat";

import Footer from "./components/Footer/Footer";

/* ==========================================
   GAME
========================================== */

import WeatherGame from "./components/WeatherGame/WeatherGame";

/* ==========================================
   PAGES
========================================== */

import MapPage from "./pages/MapPage/MapPage";

import TravelPage from "./pages/TravelPage/TravelPage";

import ProfilePage from "./pages/ProfilePage/ProfilePage";

import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

import AlertsPage from "./pages/AlertsPage/AlertsPage";

import SettingsPage from "./pages/SettingsPage/SettingsPage";

import TermsPage from "./pages/TermsPage";

import PrivacyPage from "./pages/PrivacyPage";

/* ==========================================
   API
========================================== */

import { getWeatherByCity, getWeatherByCoords } from "./services/weatherApi";

/* ==========================================
   STORAGE
========================================== */

import { getSavedCities, saveCities } from "./services/storage";

/* ==========================================
   LANGUAGE
========================================== */

import { useLanguage } from "./components/context/LanguageContext.jsx";

/* ==========================================
   GLOBAL CSS
========================================== */

import "./styles/global.css";

/* ==========================================
   LOCAL STORAGE KEYS
========================================== */

const THEME_KEY = "weather-theme";

const UNIT_KEY = "weather-unit";

const FAVORITES_KEY = "weather-favorites";

/* ==========================================
   APP
========================================== */

export default function App() {
  const { language } = useLanguage();

  /* ==========================================
     PAGE LOADER
  ========================================== */

  const [pageLoading, setPageLoading] = useState(true);

  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    const hideLoaderTimer = window.setTimeout(() => {
      setLoaderVisible(false);
    }, 950);

    const removeLoaderTimer = window.setTimeout(() => {
      setPageLoading(false);
    }, 1250);

    return () => {
      window.clearTimeout(hideLoaderTimer);

      window.clearTimeout(removeLoaderTimer);
    };
  }, []);

  /* ==========================================
     CURRENT PAGE
  ========================================== */

  const [page, setPage] = useState(
    () => window.location.hash.replace("#/", "") || "home"
  );

  /* ==========================================
     WEATHER
  ========================================== */

  const [cities, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);

  const [mapLocation, setMapLocation] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  /* ==========================================
     THEME
  ========================================== */

  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light"
  );

  /* ==========================================
     UNIT
  ========================================== */

  const [unit, setUnit] = useState(() => localStorage.getItem(UNIT_KEY) || "C");

  /* ==========================================
     FAVORITES
  ========================================== */

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch {
      return [];
    }
  });

  /* ==========================================
     TEXT
  ========================================== */

  const text = {
    en: {
      added: (city) => `${city} added to your dashboard`,

      couldNotLoadCity: "Could not load this city",

      geolocationUnsupported: "Geolocation is not supported in this browser",

      myLocation: "My location",

      locationLoaded: "Current location loaded",

      couldNotLoadLocation: "Could not load weather for your location",

      locationPermission: "Location permission was not granted",

      refreshed: (city) => `${city} refreshed`,

      couldNotRefresh: "Could not refresh this city",

      couldNotOpenMap: "Could not open that location on the map",
    },

    de: {
      added: (city) => `${city} wurde zu deiner Wetterübersicht hinzugefügt`,

      couldNotLoadCity: "Diese Stadt konnte nicht geladen werden",

      geolocationUnsupported:
        "Standortbestimmung wird von diesem Browser nicht unterstützt",

      myLocation: "Mein Standort",

      locationLoaded: "Aktueller Standort wurde geladen",

      couldNotLoadLocation:
        "Das Wetter für deinen Standort konnte nicht geladen werden",

      locationPermission: "Die Standortfreigabe wurde nicht erteilt",

      refreshed: (city) => `${city} wurde aktualisiert`,

      couldNotRefresh: "Diese Stadt konnte nicht aktualisiert werden",

      couldNotOpenMap: "Dieser Ort konnte nicht auf der Karte geöffnet werden",
    },

    uk: {
      added: (city) => `${city} додано до вашої панелі погоди`,

      couldNotLoadCity: "Не вдалося завантажити це місто",

      geolocationUnsupported: "Цей браузер не підтримує геолокацію",

      myLocation: "Моє місцезнаходження",

      locationLoaded: "Поточне місцезнаходження завантажено",

      couldNotLoadLocation:
        "Не вдалося завантажити погоду для вашого місцезнаходження",

      locationPermission: "Доступ до місцезнаходження не надано",

      refreshed: (city) => `${city} оновлено`,

      couldNotRefresh: "Не вдалося оновити це місто",

      couldNotOpenMap: "Не вдалося відкрити це місце на карті",
    },

    ru: {
      added: (city) => `${city} добавлен на вашу панель погоды`,

      couldNotLoadCity: "Не удалось загрузить этот город",

      geolocationUnsupported: "Этот браузер не поддерживает геолокацию",

      myLocation: "Моё местоположение",

      locationLoaded: "Текущее местоположение загружено",

      couldNotLoadLocation:
        "Не удалось загрузить погоду для вашего местоположения",

      locationPermission: "Доступ к местоположению не предоставлен",

      refreshed: (city) => `${city} обновлён`,

      couldNotRefresh: "Не удалось обновить этот город",

      couldNotOpenMap: "Не удалось открыть это место на карте",
    },
  };

  const currentText = text[language] || text.en;

  /* ==========================================
     LOADER TEXT
  ========================================== */

  const loaderText = {
    en: {
      title: "Weather",
      subtitle: "Loading your weather...",
    },

    de: {
      title: "Weather",
      subtitle: "Wetter wird geladen...",
    },

    uk: {
      title: "Weather",
      subtitle: "Завантажуємо погоду...",
    },

    ru: {
      title: "Weather",
      subtitle: "Загружаем погоду...",
    },
  };

  const currentLoaderText = loaderText[language] || loaderText.en;

  /* ==========================================
     THEME EFFECT
  ========================================== */

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  /* ==========================================
     UNIT EFFECT
  ========================================== */

  useEffect(() => {
    localStorage.setItem(UNIT_KEY, unit);
  }, [unit]);

  /* ==========================================
     FAVORITES EFFECT
  ========================================== */

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  /* ==========================================
     HASH NAVIGATION
  ========================================== */

  useEffect(() => {
    const change = () => {
      const hashPage = window.location.hash.replace("#/", "") || "home";

      setPage(hashPage);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("hashchange", change);

    return () => {
      window.removeEventListener("hashchange", change);
    };
  }, []);

  /* ==========================================
     LOAD SAVED CITIES
  ========================================== */

  useEffect(() => {
    const saved = getSavedCities();

    if (!saved.length) {
      return;
    }

    setCities(saved);

    setSelectedCity(saved[0]);

    setMapLocation(saved[0]);

    Promise.allSettled(
      saved.slice(0, 6).map((city) =>
        getWeatherByCity({
          city: city.city,

          country: city.country,

          admin1: city.admin1,

          lat: city.lat,

          lon: city.lon,
        })
      )
    ).then((results) => {
      const refreshed = results
        .filter((item) => item.status === "fulfilled")
        .map((item) => item.value);

      if (refreshed.length) {
        setCities(refreshed);

        setSelectedCity(
          (current) =>
            refreshed.find((item) => item.id === current?.id) || refreshed[0]
        );

        setMapLocation(
          (current) =>
            refreshed.find((item) => item.id === current?.id) || refreshed[0]
        );

        saveCities(refreshed);
      }
    });
  }, []);

  /* ==========================================
     NAVIGATION
  ========================================== */

  const navigate = (target) => {
    window.location.hash = `/${target}`;

    setPage(target);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==========================================
     TOAST
  ========================================== */

  const flash = (messageText) => {
    setMessage(messageText);

    window.setTimeout(() => {
      setMessage("");
    }, 3200);
  };

  /* ==========================================
     ADD CITY
  ========================================== */

  const addCity = async (cityOrLocation) => {
    setLoading(true);

    try {
      const weather = await getWeatherByCity(cityOrLocation);

      setCities((previous) => {
        const exists = previous.some((item) => item.id === weather.id);

        const next = exists
          ? previous.map((item) => (item.id === weather.id ? weather : item))
          : [weather, ...previous].slice(0, 8);

        saveCities(next);

        return next;
      });

      setSelectedCity(weather);

      setMapLocation(weather);

      flash(currentText.added(weather.city));
    } catch (error) {
      flash(error?.message || currentText.couldNotLoadCity);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
     GEO LOCATION
  ========================================== */

  const useLocation = () => {
    if (!navigator.geolocation) {
      flash(currentText.geolocationUnsupported);

      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const weather = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude,
            {
              city: currentText.myLocation,

              country: "",
            }
          );

          setCities((previous) => {
            const next = [
              weather,

              ...previous.filter((item) => item.id !== weather.id),
            ].slice(0, 8);

            saveCities(next);

            return next;
          });

          setSelectedCity(weather);

          setMapLocation(weather);

          flash(currentText.locationLoaded);
        } catch {
          flash(currentText.couldNotLoadLocation);
        } finally {
          setLoading(false);
        }
      },

      () => {
        setLoading(false);

        flash(currentText.locationPermission);
      },

      {
        enableHighAccuracy: true,

        timeout: 10000,
      }
    );
  };

  /* ==========================================
     REFRESH CITY
  ========================================== */

  const refreshCity = async (id) => {
    const city = cities.find((item) => item.id === id);

    if (!city) {
      return;
    }

    try {
      const next = await getWeatherByCity(city);

      setCities((previous) => {
        const updated = previous.map((item) => (item.id === id ? next : item));

        saveCities(updated);

        return updated;
      });

      if (selectedCity?.id === id) {
        setSelectedCity(next);
      }

      if (mapLocation?.id === id) {
        setMapLocation(next);
      }

      flash(currentText.refreshed(next.city));
    } catch {
      flash(currentText.couldNotRefresh);
    }
  };

  /* ==========================================
     DELETE CITY
  ========================================== */

  const deleteCity = (id) => {
    setCities((previous) => {
      const next = previous.filter((item) => item.id !== id);

      saveCities(next);

      if (selectedCity?.id === id) {
        setSelectedCity(next[0] || null);
      }

      if (mapLocation?.id === id) {
        setMapLocation(next[0] || null);
      }

      return next;
    });

    setFavorites((previous) => previous.filter((item) => item !== id));
  };

  /* ==========================================
     FAVORITE
  ========================================== */

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  /* ==========================================
     SORT CITIES
  ========================================== */

  const orderedCities = useMemo(
    () =>
      [...cities].sort(
        (a, b) =>
          Number(favorites.includes(b.id)) - Number(favorites.includes(a.id))
      ),

    [cities, favorites]
  );

  /* ==========================================
     MAP
  ========================================== */

  const selectForMap = async (location) => {
    try {
      const weather =
        location.temperature != null
          ? location
          : await getWeatherByCity(location);

      setMapLocation(weather);
    } catch {
      flash(currentText.couldNotOpenMap);
    }
  };

  /* ==========================================
     OPEN FAVORITE CITY
  ========================================== */

  const openFavoriteCity = (city) => {
    setSelectedCity(city);

    setMapLocation(city);

    navigate("home");

    window.setTimeout(() => {
      document.querySelector(".details-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  };

  /* ==========================================
     PAGE CONTENT
  ========================================== */

  const renderPage = () => {
    /* ==========================================
       MAP
    ========================================== */

    if (page === "map") {
      return (
        <MapPage
          selectedCity={mapLocation || selectedCity}
          onSelectCity={selectForMap}
        />
      );
    }

    /* ==========================================
       TRAVEL
    ========================================== */

    if (page === "travel") {
      return <TravelPage unit={unit} />;
    }

    /* ==========================================
       GAMES
    ========================================== */

    if (page === "games") {
      return <WeatherGame onNavigate={navigate} />;
    }

    /* ==========================================
       PROFILE
    ========================================== */

    if (page === "profile") {
      return <ProfilePage />;
    }

    /* ==========================================
       FAVORITES
    ========================================== */

    if (page === "favorites") {
      return (
        <FavoritesPage
          cities={orderedCities}
          favorites={favorites}
          unit={unit}
          onFavorite={toggleFavorite}
          onDelete={deleteCity}
          onOpen={openFavoriteCity}
        />
      );
    }

    /* ==========================================
       ALERTS
    ========================================== */

    if (page === "alerts") {
      return <AlertsPage cities={orderedCities} />;
    }

    /* ==========================================
       SETTINGS
    ========================================== */

    if (page === "settings") {
      return (
        <SettingsPage
          theme={theme}
          setTheme={setTheme}
          unit={unit}
          setUnit={setUnit}
        />
      );
    }

    /* ==========================================
       TERMS
    ========================================== */

    if (page === "terms") {
      return <TermsPage />;
    }

    /* ==========================================
       PRIVACY
    ========================================== */

    if (page === "privacy") {
      return <PrivacyPage />;
    }

    /* ==========================================
       HOME
    ========================================== */

    return (
      <main>
        <Hero
          onSearch={addCity}
          onUseLocation={useLocation}
          loading={loading}
        />

        <WeatherList
          cities={orderedCities}
          unit={unit}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onRefresh={refreshCity}
          onDelete={deleteCity}
          onOpen={(city) => {
            setSelectedCity(city);

            setMapLocation(city);

            window.setTimeout(
              () =>
                document.querySelector(".details-section")?.scrollIntoView({
                  behavior: "smooth",
                }),

              40
            );
          }}
        />

        <WeatherDetails city={selectedCity} unit={unit} />

        <ComfortAdvice city={selectedCity} />

        <HourlyForecast city={selectedCity} unit={unit} />

        <WeeklyForecast city={selectedCity} unit={unit} />

        <WeatherInsights city={selectedCity} />

        <News />

        <Gallery />
      </main>
    );
  };

  /* ==========================================
     PAGE LOADER
  ========================================== */

  if (pageLoading) {
    const isDark = theme === "dark";

    return (
      <>
        <style>
          {`
            @keyframes loaderCloudMove {
              0% {
                transform: translateX(-10px);
              }

              100% {
                transform: translateX(10px);
              }
            }

            @keyframes loaderSunPulse {
              0% {
                transform: scale(0.9) rotate(0deg);
              }

              50% {
                transform: scale(1.08) rotate(12deg);
              }

              100% {
                transform: scale(0.9) rotate(0deg);
              }
            }

            @keyframes loaderFloat {
              0% {
                transform: translateY(0);
              }

              50% {
                transform: translateY(-8px);
              }

              100% {
                transform: translateY(0);
              }
            }

            @keyframes loaderDot {
              0%,
              100% {
                opacity: 0.25;
                transform: translateY(0);
              }

              50% {
                opacity: 1;
                transform: translateY(-5px);
              }
            }

            @keyframes loaderProgress {
              0% {
                transform: scaleX(0);
              }

              100% {
                transform: scaleX(1);
              }
            }

            @keyframes loaderBackground {
              0% {
                background-position: 0% 50%;
              }

              50% {
                background-position: 100% 50%;
              }

              100% {
                background-position: 0% 50%;
              }
            }
          `}
        </style>

        <div
          style={{
            position: "fixed",

            inset: 0,

            zIndex: 999999,

            display: "flex",

            flexDirection: "column",

            justifyContent: "center",

            alignItems: "center",

            overflow: "hidden",

            opacity: loaderVisible ? 1 : 0,

            transform: loaderVisible ? "scale(1)" : "scale(1.03)",

            transition: "opacity 300ms ease, transform 300ms ease",

            background: isDark
              ? "linear-gradient(135deg, #080b14 0%, #101827 50%, #151021 100%)"
              : "linear-gradient(135deg, #e9f5ff 0%, #ffffff 45%, #f0eaff 100%)",

            backgroundSize: "300% 300%",

            animation: "loaderBackground 5s ease infinite",
          }}
        >
          {/* LEFT DECORATION */}

          <div
            style={{
              position: "absolute",

              width: "420px",

              height: "420px",

              borderRadius: "50%",

              top: "-180px",

              left: "-150px",

              background: isDark
                ? "rgba(63, 124, 255, 0.08)"
                : "rgba(91, 160, 255, 0.14)",

              filter: "blur(10px)",
            }}
          />

          {/* RIGHT DECORATION */}

          <div
            style={{
              position: "absolute",

              width: "450px",

              height: "450px",

              borderRadius: "50%",

              right: "-180px",

              bottom: "-190px",

              background: isDark
                ? "rgba(159, 79, 255, 0.08)"
                : "rgba(176, 113, 255, 0.14)",

              filter: "blur(12px)",
            }}
          />

          {/* WEATHER ICON */}

          <div
            style={{
              position: "relative",

              width: "150px",

              height: "115px",

              animation: "loaderFloat 2s ease-in-out infinite",
            }}
          >
            {/* SUN */}

            <div
              style={{
                position: "absolute",

                width: "64px",

                height: "64px",

                borderRadius: "50%",

                top: 0,

                right: 5,

                background: "linear-gradient(135deg, #ffd75b, #ffad26)",

                boxShadow: "0 0 25px rgba(255, 190, 42, 0.45)",

                animation: "loaderSunPulse 1.5s ease-in-out infinite",
              }}
            />

            {/* CLOUD */}

            <div
              style={{
                position: "absolute",

                width: "118px",

                height: "46px",

                left: 3,

                bottom: 6,

                borderRadius: "50px",

                background: isDark ? "#e8ecf4" : "#ffffff",

                boxShadow: isDark
                  ? "0 14px 35px rgba(0,0,0,0.35)"
                  : "0 14px 35px rgba(59,81,112,0.16)",

                animation:
                  "loaderCloudMove 1.4s ease-in-out infinite alternate",
              }}
            >
              <span
                style={{
                  position: "absolute",

                  width: "50px",

                  height: "50px",

                  borderRadius: "50%",

                  left: "14px",

                  top: "-25px",

                  background: isDark ? "#e8ecf4" : "#ffffff",
                }}
              />

              <span
                style={{
                  position: "absolute",

                  width: "68px",

                  height: "68px",

                  borderRadius: "50%",

                  left: "43px",

                  top: "-40px",

                  background: isDark ? "#e8ecf4" : "#ffffff",
                }}
              />
            </div>
          </div>

          {/* TITLE */}

          <h1
            style={{
              margin: "24px 0 5px",

              fontSize: "clamp(30px, 5vw, 42px)",

              fontWeight: 800,

              letterSpacing: "-1.5px",

              color: isDark ? "#ffffff" : "#13151c",
            }}
          >
            {currentLoaderText.title}
          </h1>

          {/* SUBTITLE */}

          <p
            style={{
              margin: 0,

              fontSize: "15px",

              color: isDark ? "#a6adbd" : "#7b8190",

              fontWeight: 500,
            }}
          >
            {currentLoaderText.subtitle}
          </p>

          {/* DOTS */}

          <div
            style={{
              display: "flex",

              gap: "7px",

              marginTop: "18px",
            }}
          >
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                style={{
                  width: "7px",

                  height: "7px",

                  borderRadius: "50%",

                  background: isDark ? "#ffffff" : "#293242",

                  animation: `loaderDot 1s ease-in-out ${dot * 0.15}s infinite`,
                }}
              />
            ))}
          </div>

          {/* PROGRESS */}

          <div
            style={{
              width: "180px",

              height: "3px",

              borderRadius: "20px",

              overflow: "hidden",

              marginTop: "24px",

              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(27,44,70,0.08)",
            }}
          >
            <div
              style={{
                width: "100%",

                height: "100%",

                transformOrigin: "left",

                borderRadius: "20px",

                background: "linear-gradient(90deg, #4d9cff, #9d66ff)",

                animation: "loaderProgress 1.05s ease forwards",
              }}
            />
          </div>
        </div>
      </>
    );
  }

  /* ==========================================
     RETURN
  ========================================== */

  return (
    <div className="app-shell">
      <Header
        page={page}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={() =>
          setTheme((value) => (value === "dark" ? "light" : "dark"))
        }
        unit={unit}
        onToggleUnit={() => setUnit((value) => (value === "C" ? "F" : "C"))}
      />

      {message && <div className="toast-message">{message}</div>}

      {renderPage()}

      <Footer onNavigate={navigate} />

      <WeatherAlerts weather={selectedCity} />

      <SupportChat />
    </div>
  );
}
