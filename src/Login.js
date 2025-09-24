import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ handleLogin, setToken, setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = handleLogin(form.email, form.password);
    if (success) {
      setMessage("✅ Successful Login");
      navigate("/"); // vai alla home
    } else {
      setMessage("❌ Email or password not valid");
    }
  };

  return (
    <section className="reservation-page" aria-label="Login Section">
      <form
        className="reservation-form"
        onSubmit={handleSubmit}
        aria-label="Login Form"
      >
        <h2>Login</h2>
        <fieldset>
          <legend>Accesso utente</legend>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              aria-label="Inserisci la tua email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              aria-label="Insert your password"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            aria-label="On Click"
          >
            Login
          </button>

          {message && (
            <p role="status" aria-live="polite" className="message">
              {message}
            </p>
          )}
        </fieldset>
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </section>
  );
}
