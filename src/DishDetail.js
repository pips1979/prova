
import salad from './assets/greek salad.jpg';
import bruschetta from './assets/bruschetta.svg';
import dessert from './assets/lemon dessert.jpg';

import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "./CartContext"; 


const dishes = {
  "Greek Salad": {
    img: salad,
    description: "Fresh lettuce, tomatoes, cucumbers, olives, feta cheese, drizzled with olive oil.",
    hasExtras: true,
  },
  Bruschetta: {
    img: bruschetta,
    description: "Toasted bread topped with garlic, tomatoes, basil, and extra virgin olive oil.",
    hasExtras: true,
  },
  "Lemon Dessert": {
    img: dessert,
    description: "Sweet lemon tart with a buttery crust and zesty lemon filling, topped with cream.",
    hasExtras: false,
  },
};

const extraIngredients = ["Cheese", "Bacon", "Avocado", "Mushrooms"];
const basePrice = 12.99;

export default function DishDetail() {
  const { dishName } = useParams();
  const dish = dishes[dishName];
  const { addToCart } = useCart();
  const [selectedExtras, setSelectedExtras] = useState([]);

  const toggleIngredient = (ingredient) => {
    setSelectedExtras((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const totalPrice = (basePrice + selectedExtras.length).toFixed(2);

  const handleAdd = () => {
    const item = {
      name: dishName,
      extras: dish.hasExtras ? selectedExtras : [],
      price: parseFloat(totalPrice),
      img: dish.img,
    };
    addToCart(item);
    alert(`${dishName} added to cart!`);
  };

  return (
    <section className="dish-detail">
      <h2>{dishName}</h2>
      <img src={dish.img} alt={dishName} style={{ maxWidth: "300px" }} />
      <p>{dish.description}</p>

      {dish.hasExtras && (
        <>
          <h3>Add Ingredients ($1 each)</h3>
          {extraIngredients.map((ingredient) => (
            <label key={ingredient} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={selectedExtras.includes(ingredient)}
                onChange={() => toggleIngredient(ingredient)}
              />{" "}
              {ingredient}
            </label>
          ))}
        </>
      )}

      <button onClick={handleAdd} style={{ marginTop: "1rem" }}>
        Add for {dish.hasExtras ? totalPrice : basePrice}$
      </button>
    </section>
  );
}
