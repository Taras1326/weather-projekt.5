import { useEffect, useState } from 'react';
import { FiArrowRight, FiMapPin, FiSearch } from 'react-icons/fi';
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';
import { getWeatherByCity, searchCities } from '../../services/weatherApi';
import { formatTemperature, formatWind, scoreTravelWeather } from '../../utils/weather';

function CityPicker({ label, value, onChange }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); return undefined; }
    const timer = setTimeout(async () => {
      try { setResults(await searchCities(query.trim(), 5)); } catch { setResults([]); }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="travel-picker">
      <label>{label}</label>
      <div className="travel-search"><FiSearch /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search city" /></div>
      {results.length > 0 && <div className="travel-results glass-panel">{results.map(item => <button key={`${item.id}-${item.lat}`} onClick={() => { onChange(item); setQuery(''); setResults([]); }}><span>{item.city}</span><small>{item.country}</small></button>)}</div>}
      {value && <div className="selected-location"><FiMapPin /> {value.city}, {value.country}</div>}
    </div>
  );
}

function CompareCard({ data, unit }) {
  if (!data) return <div className="compare-placeholder">Choose a city to compare weather.</div>;
  const score = scoreTravelWeather(data);
  return (
    <article className="compare-card">
      <div className="compare-top"><div><p>{data.country}</p><h2>{data.city}</h2></div><div className="trip-score"><strong>{score}</strong><span>trip score</span></div></div>
      <WeatherIcon type={data.weatherIcon} size={96} title={data.description} />
      <div className="compare-temp">{formatTemperature(data.temperature, unit)}</div>
      <p className="compare-condition">{data.description}</p>
      <dl>
        <div><dt>Feels like</dt><dd>{formatTemperature(data.feelsLike, unit)}</dd></div>
        <div><dt>Rain chance</dt><dd>{Math.round(data.precipitationProbability ?? 0)}%</dd></div>
        <div><dt>Wind</dt><dd>{formatWind(data.windSpeed, unit)}</dd></div>
        <div><dt>UV</dt><dd>{Math.round(data.uvIndex ?? 0)}</dd></div>
        <div><dt>Humidity</dt><dd>{Math.round(data.humidity)}%</dd></div>
        <div><dt>Air quality</dt><dd>{data.airQuality?.europeanAqi != null ? Math.round(data.airQuality.europeanAqi) : '—'}</dd></div>
      </dl>
    </article>
  );
}

export default function TravelPage({ unit }) {
  const [leftLocation, setLeftLocation] = useState({ city: 'Ljubljana', country: 'Slovenia', lat: 46.0569, lon: 14.5058 });
  const [rightLocation, setRightLocation] = useState({ city: 'Split', country: 'Croatia', lat: 43.5081, lon: 16.4402 });
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const [a, b] = await Promise.all([getWeatherByCity(leftLocation), getWeatherByCity(rightLocation)]);
        if (active) { setLeft(a); setRight(b); }
      } finally { if (active) setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, [leftLocation, rightLocation]);

  const leftScore = scoreTravelWeather(left);
  const rightScore = scoreTravelWeather(right);
  const winner = left && right ? (leftScore >= rightScore ? left : right) : null;

  return (
    <main className="subpage travel-page">
      <section className="subpage-hero"><div className="container-wide"><p className="eyebrow">Plan smarter</p><h1>Travel weather planner</h1><p>Compare two destinations using temperature, rain, wind, UV and air quality.</p></div></section>
      <section className="travel-section section-shell"><div className="container-wide">
        <div className="travel-pickers"><CityPicker label="Destination A" value={leftLocation} onChange={setLeftLocation} /><FiArrowRight className="travel-arrow" /><CityPicker label="Destination B" value={rightLocation} onChange={setRightLocation} /></div>
        {loading && <div className="loading-banner">Updating live weather…</div>}
        <div className="compare-grid"><CompareCard data={left} unit={unit} /><div className="versus">VS</div><CompareCard data={right} unit={unit} /></div>
        {winner && <div className="winner-banner"><span>🏆</span><div><p className="eyebrow">Best conditions right now</p><h2>{winner.city}</h2><p>Based on a simple comfort score that balances temperature, rain, wind, UV and air quality.</p></div></div>}
        <div className="travel-features"><article><span>🧳</span><h3>Packing helper</h3><p>Use the dashboard comfort guide to decide whether you need a jacket, umbrella or sunscreen.</p></article><article><span>📅</span><h3>14-day outlook</h3><p>Open either destination on the dashboard to inspect the long-range forecast.</p></article><article><span>🗺️</span><h3>Map check</h3><p>Use the weather map before departure to check rain and wind systems.</p></article></div>
      </div></section>
    </main>
  );
}
