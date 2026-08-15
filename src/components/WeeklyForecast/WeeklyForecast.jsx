import './WeeklyForecast.css';

function WeeklyForecast({ city }) {
  if (!city || !city.forecast) {
    return null;
  }

  return (
    <section className="weekly-forecast">
      <div className="container weekly-forecast-container">
        <h2 className="weekly-forecast-title">
          7 days forecast
        </h2>

        <div className="weekly-list">
          {city.forecast.map(day => {
            const date = new Date(day.date);

            const dayName = date.toLocaleDateString(
              'en-US',
              {
                weekday: 'short',
              }
            );

            return (
              <div
                className="weekly-card"
                key={day.date}
              >
                <p className="weekly-day">
                  {dayName}
                </p>

                <p className="weekly-date">
                  {date.toLocaleDateString(
                    'en-GB'
                  )}
                </p>

                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="weekly-icon"
                />

                <strong className="weekly-max">
                  {Math.round(day.day.maxtemp_c)}°
                </strong>

                <span className="weekly-min">
                  {Math.round(day.day.mintemp_c)}°
                </span>

                <p className="weekly-description">
                  {day.day.condition.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WeeklyForecast;