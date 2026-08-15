import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import WeatherList from './components/WeatherList/WeatherList';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import News from './components/News/News';
import Gallery from './components/Gallery/Gallery';
import Footer from './components/Footer/Footer';

import { getWeatherByCity } from './services/weatherApi';

import {
  getSavedCities,
  saveCities,
} from './services/storage';

import './styles/global.css';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCity, setSelectedCity] =
    useState(null);

  useEffect(() => {
    const savedCities = getSavedCities();

    setCities(savedCities);

    if (savedCities.length > 0) {
      refreshSavedCities(savedCities);
    }
  }, []);

  const refreshSavedCities = async savedCities => {
    try {
      const updatedCities =
        await Promise.all(
          savedCities.map(city =>
            getWeatherByCity(city.city)
          )
        );

      setCities(updatedCities);

      saveCities(updatedCities);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async cityName => {
    try {
      setLoading(true);

      const newCity =
        await getWeatherByCity(cityName);

      const alreadyExists = cities.some(
        city => city.id === newCity.id
      );

      if (alreadyExists) {
        console.log(
          `${newCity.city} вже є у списку`
        );

        return;
      }

      const updatedCities = [
        ...cities,
        newCity,
      ];

      setCities(updatedCities);

      saveCities(updatedCities);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async cityId => {
    const city = cities.find(
      item => item.id === cityId
    );

    if (!city) {
      return;
    }

    try {
      const updatedCity =
        await getWeatherByCity(city.city);

      const updatedCities = cities.map(item =>
        item.id === cityId
          ? updatedCity
          : item
      );

      setCities(updatedCities);

      saveCities(updatedCities);

      /*
       * Якщо ця картка зараз відкрита,
       * оновлюємо і детальну інформацію
       */
      if (
        selectedCity &&
        selectedCity.id === cityId
      ) {
        setSelectedCity(updatedCity);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = cityId => {
    const updatedCities = cities.filter(
      city => city.id !== cityId
    );

    setCities(updatedCities);

    saveCities(updatedCities);

    if (
      selectedCity &&
      selectedCity.id === cityId
    ) {
      setSelectedCity(null);
    }
  };

  return (
    <>
      <Header />

      <main>
        <Hero
          onSearch={handleSearch}
          loading={loading}
        />

        <WeatherList
          cities={cities}
          onRefresh={handleRefresh}
          onDelete={handleDelete}
          onOpen={setSelectedCity}
        />

        <WeatherDetails
          city={selectedCity}
        />

        <HourlyForecast
          city={selectedCity}
        />

        <WeeklyForecast
          city={selectedCity}
        />

        <News />

        <Gallery />

        <Footer />
      </main>
    </>
  );
}

export default App;