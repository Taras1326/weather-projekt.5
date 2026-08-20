const cards = [
  { image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80', title: 'Walking your dog safely in hot weather', tag: 'Pets & weather' },
  { image: 'https://images.unsplash.com/photo-1514888286974-6c03b2ca1d?auto=format&fit=crop&w=800&q=80', title: 'Keeping pets comfortable when storms arrive', tag: 'Home guide' },
  { image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', title: 'How to plan a better outdoor day with the forecast', tag: 'Lifestyle' },
  { image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80', title: 'Five weather signals to check before a weekend trip', tag: 'Travel' },
];

export default function News() {
  return (
    <section className="stories-section section-shell">
      <div className="container-wide">
        <div className="section-heading"><div><p className="eyebrow">Weather & lifestyle</p><h2>Useful stories</h2></div><p>Practical ideas for everyday life</p></div>
        <div className="stories-grid">
          {cards.map(card => <article className="story-card" key={card.title}><img src={card.image} alt="" loading="lazy" /><span>{card.tag}</span><h3>{card.title}</h3><button type="button">Read tip →</button></article>)}
        </div>
      </div>
    </section>
  );
}
