import { useEffect, useMemo, useState } from 'react';
import { FiCrosshair, FiSearch, FiX } from 'react-icons/fi';
import { searchCities } from '../../services/weatherApi';

export default function Hero({ onSearch, onUseLocation, loading }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return undefined;
    }
    const timer = setTimeout(async () => {
      try {
        setSearching(true);
        setSuggestions(await searchCities(query.trim(), 6));
      } catch {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const choose = location => {
    setQuery('');
    setSuggestions([]);
    onSearch(location);
  };

  const submit = event => {
    event.preventDefault();
    if (suggestions[0]) choose(suggestions[0]);
    else if (query.trim()) onSearch(query.trim());
  };

  return (
    <section className="hero" id="about">
      <div className="hero-overlay" />
      <div className="hero-content container-wide">
        <p className="hero-kicker">Your weather. Your cities. Your day.</p>
        <h1>Weather dashboard</h1>
        <div className="hero-info">
          <p>Create your personal list of favorite cities and always be aware of the weather.</p>
          <div className="hero-divider" />
          <div className="hero-date">
            <span>{now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            <strong>{now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}</strong>
          </div>
        </div>

        <div className="hero-search-wrap">
          <form className="hero-search" onSubmit={submit}>
            <FiSearch className="search-leading" />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search location..." aria-label="Search location" />
            {query && <button className="clear-search" type="button" onClick={() => setQuery('')} aria-label="Clear"><FiX /></button>}
            <button className="search-submit" type="submit" disabled={loading}>{loading ? '...' : <FiSearch />}</button>
          </form>
          <button className="location-button" type="button" onClick={onUseLocation}><FiCrosshair /> Use my location</button>

          {(suggestions.length > 0 || searching) && (
            <div className="search-suggestions glass-panel">
              {searching && <div className="suggestion-status">Searching…</div>}
              {!searching && suggestions.map(item => (
                <button type="button" key={`${item.id}-${item.lat}`} onClick={() => choose(item)}>
                  <span><strong>{item.city}</strong>{item.admin1 ? `, ${item.admin1}` : ''}</span>
                  <small>{item.country}</small>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
