import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import WeatherList from "./components/WeatherList/WeatherList";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import ComfortAdvice from "./components/ComfortAdvice/ComfortAdvice";
import News from "./components/News/News";
import Gallery from "./components/Gallery/Gallery";
import SupportChat from "./components/SupportChat/SupportChat";
import Footer from "./components/Footer/Footer";

import MapPage from "./pages/MapPage/MapPage";
import TravelPage from "./pages/TravelPage/TravelPage";

import { getWeatherByCity, getWeatherByCoords } from "./services/weatherApi";

import { getSavedCities, saveCities } from "./services/storage";

import { useLanguage } from "./components/context/LanguageContext.jsx";

import "./styles/global.css";

const THEME_KEY = "weather-theme";
const UNIT_KEY = "weather-unit";
const FAVORITES_KEY = "weather-favorites";

export default function App() {
  const { language } = useLanguage();

  const [page, setPage] = useState(
    () => window.location.hash.replace("#/", "") || "home"
  );

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const [mapLocation, setMapLocation] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light"
  );

  const [unit, setUnit] = useState(() => localStorage.getItem(UNIT_KEY) || "C");

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch {
      return [];
    }
  });

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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(UNIT_KEY, unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const change = () => {
      setPage(window.location.hash.replace("#/", "") || "home");
    };

    window.addEventListener("hashchange", change);

    return () => window.removeEventListener("hashchange", change);
  }, []);

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

        saveCities(refreshed);
      }
    });
  }, []);

  const navigate = (target) => {
    window.location.hash = `/${target}`;

    setPage(target);
  };

  const flash = (messageText) => {
    setMessage(messageText);

    window.setTimeout(() => setMessage(""), 3200);
  };

  const addCity = async (cityOrLocation) => {
    setLoading(true);

    try {
      const weather = await getWeatherByCity(cityOrLocation);

      setCities((prev) => {
        const exists = prev.some((item) => item.id === weather.id);

        const next = exists
          ? prev.map((item) => (item.id === weather.id ? weather : item))
          : [weather, ...prev].slice(0, 8);

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

          setCities((prev) => {
            const next = [
              weather,
              ...prev.filter((item) => item.id !== weather.id),
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

  const refreshCity = async (id) => {
    const city = cities.find((item) => item.id === id);

    if (!city) {
      return;
    }

    try {
      const next = await getWeatherByCity(city);

      setCities((prev) => {
        const updated = prev.map((item) => (item.id === id ? next : item));

        saveCities(updated);

        return updated;
      });

      if (selectedCity?.id === id) {
        setSelectedCity(next);
      }

      flash(currentText.refreshed(next.city));
    } catch {
      flash(currentText.couldNotRefresh);
    }
  };

  const deleteCity = (id) => {
    setCities((prev) => {
      const next = prev.filter((item) => item.id !== id);

      saveCities(next);

      if (selectedCity?.id === id) {
        setSelectedCity(next[0] || null);
      }

      return next;
    });
  };

  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const orderedCities = useMemo(
    () =>
      [...cities].sort(
        (a, b) =>
          Number(favorites.includes(b.id)) - Number(favorites.includes(a.id))
      ),
    [cities, favorites]
  );

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

      {page === "map" ? (
        <MapPage
          selectedCity={mapLocation || selectedCity}
          onSelectCity={selectForMap}
        />
      ) : page === "travel" ? (
        <TravelPage unit={unit} />
      ) : (
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

              setTimeout(
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

          <News />

          <Gallery />
        </main>
        
      )}

      <Footer onNavigate={navigate} />
    </div>
  );
}
