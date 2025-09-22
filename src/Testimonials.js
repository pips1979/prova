import t1 from './assets/testimonial1.png';
import t2 from './assets/testimonial2.png';

export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <div className="testimonial-grid">
        <div className="testimonial-card">
          <img src={t1} alt="User 1" />
          <h3>Name 1</h3>
          <p>⭐⭐⭐⭐⭐</p>
        </div>
        <div className="testimonial-card">
          <img src={t2} alt="User 2" />
          <h3>Name 2</h3>
          <p>⭐⭐⭐⭐</p>
        </div>
      </div>
    </section>
  );
}