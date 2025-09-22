import aboutImg from '../assets/about.png';

export default function About() {
  return (
    <section className="about">
      <h2>Little Lemon</h2>
      <h3>Chicago</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <img src={aboutImg} alt="About Little Lemon" />
    </section>
  );
}