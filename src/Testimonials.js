import t1 from './assets/testimonial1.png';
import t2 from './assets/testimonial2.png';

export default function Testimonials() {
  const testimonials = [
    {
      img: t1,
      name: "David Semper",
      stars: 5,
      comment: "Excellent! Impeccable service and delicious dishes. Will definitely return."
    },
    {
      img: t2,
      name: "Julia Ross",
      stars: 4,
      comment: "Very good, welcoming atmosphere. Minor service improvements needed, but recommended."
    }
  ];

  return (
    <section className="testimonials" style={{ padding: "2rem" }} aria-label="Customer testimonials">
      <h2 style={{ textAlign: "center", color: "#495e57", marginBottom: "2rem" }}>Testimonials</h2>
      <div
        className="testimonials-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="card testimonials-card"
            style={{ padding: "1.5rem", textAlign: "center", backgroundColor: "#495e57", color: "#ffffff", borderRadius: "12px" }}
            aria-label={`Testimonial from ${t.name}, rated ${t.stars} stars`}
          >
            <img
              src={t.img}
              alt={`Photo of ${t.name}`}
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "1rem" }}
              role="img"
              aria-label={`Photo of ${t.name}`}
            />
            <h3 style={{ color: "#ffeb3b", marginBottom: "0.5rem" }}>{t.name}</h3>
            <p style={{ marginBottom: "1rem", fontSize: "1.1rem" }} aria-label={`${t.stars} out of 5 stars`}>
              {"⭐".repeat(t.stars)}
            </p>
            <p style={{ fontStyle: "italic", fontSize: "1rem" }}>{t.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
