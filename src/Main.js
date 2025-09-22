import Hero from './Hero';
import Specials from './Specials';
import Testimonials from './Testimonials';

export default function Main({ token }) {
  return (
    <main>
      <Hero token={token} />
      <Specials />
      <Testimonials />
    </main>
  );
}