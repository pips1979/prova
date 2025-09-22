
import { useNavigate } from "react-router-dom";

export default function Hero({ token }) {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    if (token) {
      // se loggato → vai a reservations
      navigate("/reservation");
    } else {
      // se non loggato → vai a login
      navigate("/login");
    }
  };

  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <button onClick={handleReserveClick}>Reserve Table</button>
      </div>
    </section>
  );
}

