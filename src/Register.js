import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ handleRegister, setToken, setUser }) {
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      setMessage("Le password non coincidono");
      return;
    }

    const newUser = { ...form };
    delete newUser.password2; // non serve salvare password2

    const success = handleRegister(newUser);
    if (success) {
      setMessage("Registrazione avvenuta con successo!");
      navigate("/"); // vai alla home
    } else {
      setMessage("Email o username già registrati");
    }
  };

  return (
    <div className="reservation-page">
      <form className="reservation-form" onSubmit={handleSubmit} aria-label="Registration form">
        <h2>Registrazione</h2>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="first_name">Nome:</label>
          <input
            id="first_name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Cognome:</label>
          <input
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Indirizzo:</label>
          <input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password2">Conferma Password:</label>
          <input
            id="password2"
            type="password"
            name="password2"
            value={form.password2}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          aria-label="Submit registration"
        >
          Registrati
        </button>

        {message && (
          <p role="status" aria-live="polite" style={{ marginTop: "1rem" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
