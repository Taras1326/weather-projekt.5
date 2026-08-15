const STORAGE_KEY = 'weather-cities';

export function getSavedCities() {
  const cities = localStorage.getItem(STORAGE_KEY);

  if (!cities) {
    return [];
  }

  try {
    return JSON.parse(cities);
  } catch {
    return [];
  }
}

export function saveCities(cities) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(cities)
  );
}