import { useMemo, useState } from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { searchCities } from '../../services/weatherApi';

const layers = [
  { id: 'rain', label: 'Rain radar' },
  { id: 'wind', label: 'Wind' },
  { id: 'temp', label: 'Temperature' },
  { id: 'clouds', label: 'Clouds' },
];

export default function MapPage({ selectedCity, onSelectCity }) {
  const [layer, setLayer] = useState('rain');
  const [query, setQuery] = useState('');
  const lat = selectedCity?.lat ?? 48.2;
  const lon = selectedCity?.lon ?? 16.37;

  const overlay = layer === 'temp' ? 'temp' : layer === 'clouds' ? 'clouds' : layer;
  const mapUrl = useMemo(() => `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=1200&height=650&zoom=5&level=surface&overlay=${overlay}&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=true&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`, [lat, lon, overlay]);

  const submit = async event => {
    event.preventDefault();
    if (!query.trim()) return;
    const result = await searchCities(query.trim(), 1);
    if (result[0]) onSelectCity(result[0]);
    setQuery('');
  };

  return (
    <main className="subpage map-page">
      <section className="subpage-hero">
        <div className="container-wide">
          <p className="eyebrow">Live weather layers</p>
          <h1>Weather map</h1>
          <p>Explore rain, wind, temperature and cloud movement around your selected location.</p>
        </div>
      </section>
      <section className="map-section section-shell">
        <div className="container-wide">
          <div className="map-toolbar">
            <form onSubmit={submit} className="compact-search"><FiSearch /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Jump to a city" /><button className="accent-button">Find</button></form>
            <div className="layer-tabs">{layers.map(item => <button className={layer === item.id ? 'active' : ''} onClick={() => setLayer(item.id)} key={item.id}>{item.label}</button>)}</div>
          </div>
          <div className="map-frame-wrap">
            <div className="map-location-badge"><FiMapPin /><span>{selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : 'Central Europe'}</span></div>
            <iframe key={mapUrl} className="weather-map-frame" title="Interactive weather map" src={mapUrl} loading="lazy" referrerPolicy="no-referrer" />
          </div>
          <div className="map-info-grid">
            <article><span>🌧️</span><h3>Rain radar</h3><p>Track precipitation systems and see how rain is moving.</p></article>
            <article><span>💨</span><h3>Wind field</h3><p>Inspect wind speed and direction before travel or outdoor activities.</p></article>
            <article><span>🌡️</span><h3>Temperature</h3><p>Compare warm and cool regions at a glance.</p></article>
            <article><span>☁️</span><h3>Cloud cover</h3><p>See cloud patterns and changing sky conditions.</p></article>
          </div>
        </div>
      </section>
    </main>
  );
}
