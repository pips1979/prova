import salad from './assets/greek salad.jpg';
import bruschetta from './assets/bruschetta.svg';
import dessert from './assets/lemon dessert.jpg';
import { useNavigate } from 'react-router-dom';
const dishes = [
  { name: 'Greek Salad', img: salad },
  { name: 'Bruschetta', img: bruschetta },
  { name: 'Lemon Dessert', img: dessert },
];

export default function Specials() {
  const navigate = useNavigate();

  return (
    <section className="specials">
      <h2>Specials</h2>
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