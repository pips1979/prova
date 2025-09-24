import salad from './assets/greek salad.jpg';
import bruschetta from './assets/bruschetta.svg';
import dessert from './assets/lemon dessert.jpg';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet"; // 👈 importa Helmet
const dishes = [
  { name: 'Greek Salad', img: salad },
  { name: 'Bruschetta', img: bruschetta },
  { name: 'Lemon Dessert', img: dessert },
];

export default function Specials() {
  const navigate = useNavigate();

  return (
    <section className="specials">
      {/* 👇 Helmet qui dentro: vale solo per questa pagina */}
      <Helmet>
        <title>Specials plates to order at Little Lemon</title>
        <meta 
          name="description" 
          content="Scopri i nostri piatti speciali: Greek Salad, Bruschetta e Lemon Dessert, solo da Little Lemon!" 
        />      
        <meta name="og:title" content="Specials plates to order at Little Lemon"/>
        <meta name="og:description" content="Menù with specials plates highlightened"/>
      </Helmet>
      <h2 style={{ textAlign: "center", color: "#495e57", marginBottom: "2rem" }}>Specials</h2>
      <div className="specials-grid">
        {dishes.map((dish) => (
          <div key={dish.name} className="card">
            <img src={dish.img} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>12.99$</p>
            <button onClick={() => navigate(`/dish/${encodeURIComponent(dish.name)}`)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}