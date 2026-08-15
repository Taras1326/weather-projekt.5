import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import './Hero.css';

function Hero({ onSearch, loading }) {
  const [search, setSearch] = useState('');

  const currentDate = new Date();

  const month = currentDate.toLocaleDateString('en-US', {
    month: 'long',
  });

  const day = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const date = currentDate.getDate();

  const year = currentDate.getFullYear();

  const getOrdinal = number => {
    if (number % 100 >= 11 && number % 100 <= 13) {
      return 'th';
    }

    switch (number % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const city = search.trim();

    if (!city || loading) {
      return;
    }

    onSearch(city);

    setSearch('');
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Weather dashboard
        </h1>

        <div className="hero-info">
          <p className="hero-description">
            Create your personal list of
            <br />
            favorite cities and always be
            <br />
            aware of the weather.
          </p>

          <div className="hero-divider"></div>

          <div className="hero-date">
            <span>
              {month} {year}
            </span>

            <strong>
              {day}, {date}
              <sup>{getOrdinal(date)}</sup>
            </strong>
          </div>
        </div>

        <form
          className="hero-search"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search location..."
            value={search}
            onChange={event =>
              setSearch(event.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            aria-label="Search"
          >
            {loading ? '...' : <FiSearch />}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Hero;