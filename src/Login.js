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
      setMessage("Login effettuato con successo!");
      navigate("/"); // vai alla home
    } else {
      setMessage("Email o password non validi");
    }
  };

  return (
    <div className="reservation-page">
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Login</button>
        {message && <p className="message">{message}</p>}
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Non sei ancora registrato? <Link to="/register">Registrati qui</Link>
      </p>
    </div>
  );
}
