import { useNavigate } from "react-router-dom";

export default function Hero({ token, availableTimes }) {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    // se vuoi gestione login: if(token){...} else navigate("/login")
    navigate("/reservation", { state: { availableTimes } });
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

