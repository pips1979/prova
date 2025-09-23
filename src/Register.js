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
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2>Registrazione</h2>

        <div className="form-group">
          <label>Username:</label>
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Nome:</label>
          <input name="first_name" value={form.first_name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Cognome:</label>
          <input name="last_name" value={form.last_name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Indirizzo:</label>
          <input name="address" value={form.address} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Conferma Password:</label>
          <input type="password" name="password2" value={form.password2} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn-primary">Registrati</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
