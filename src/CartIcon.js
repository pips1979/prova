import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function CartIcon() {
  const { cart } = useCart();

  const itemCount = cart.length;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#f4f4f4",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
        🛒
        {itemCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {itemCount}
          </span>
        )}
      </Link>
    </div>
  );
}
