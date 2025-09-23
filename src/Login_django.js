import { useState } from "react";
//import { loginUser } from "./Api";
import { Link } from "react-router-dom";

export default function Login({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      setToken(res.data.access);
      setMessage("Login effettuato!");
    } catch (err) {
      setMessage("Email o password non validi");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input 
          name="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
        />
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>
      <p>
        Non sei ancora registrato?{" "}
        <Link to="/register">Clicca qui per registrarti</Link>
      </p>
    </div>
  );
}
