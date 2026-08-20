import { getComfortAdvice } from '../../utils/weather';

export default function ComfortAdvice({ city }) {
  if (!city) return null;
  const advice = getComfortAdvice(city);
  return (
    <section className="advice-section section-shell">
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow">Smart assistant</p><h2>Today’s comfort guide</h2></div><p>Simple tips based on current conditions</p></div>
        <div className="advice-grid">
          {advice.map(item => <article className="advice-card" key={item.title}><span>{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}
