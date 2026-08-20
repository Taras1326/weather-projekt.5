const images = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
];

export default function Gallery() {
  return (
    <section className="nature-section section-shell">
      <div className="container-wide"><div className="section-heading"><div><p className="eyebrow">Inspiration</p><h2>Beautiful nature</h2></div></div>
        <div className="nature-collage">{images.map((src, index) => <img key={src} src={src} alt={`Nature ${index + 1}`} loading="lazy" />)}</div>
      </div>
    </section>
  );
}
