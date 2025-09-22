import { useCart } from "./CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <section>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <img src={item.img} alt={item.name} style={{ width: "80px" }} />
              <strong>{item.name}</strong> - ${item.price.toFixed(2)}
              {item.extras.length > 0 && (
                <p>Extras: {item.extras.join(", ")}</p>
              )}
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ${total}</h3>

      {cart.length > 0 && (
        <>
          <button onClick={clearCart}>Clear Cart</button>
          <button style={{ marginLeft: "1rem" }}>Proceed to Checkout</button>
        </>
      )}
    </section>
  );
}
