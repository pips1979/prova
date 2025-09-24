import { useCart } from "./CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <section className="reservation-page">
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item, index) => (
            <li
              key={index}
              className="card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
                padding: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }}
                />
                <div>
                  <strong style={{ color: "#ffeb3b" }}>{item.name}</strong>
                  <p style={{ margin: 0 }}>
                    ${item.price.toFixed(2)}
                  </p>
                  {item.extras.length > 0 && (
                    <p style={{ margin: 0, fontSize: "0.9rem" }}>Extras: {item.extras.join(", ")}</p>
                  )}
                </div>
              </div>
              <button className="btn-danger" onClick={() => removeFromCart(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <h3 style={{ textAlign: "center", marginTop: "1.5rem" }}>Total: ${total}</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <button className="btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn-primary">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
