import { useState } from "react";
import axios from "axios";

export default function Register() {
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      setMessage("Le password non coincidono");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Registrazione avvenuta con successo!");
      console.log(res.data); // eventuali dati restituiti da Django
    } catch (err) {
      console.error(err.response?.data);
      if (err.response && err.response.data) {
        // Mostra gli errori precisi restituiti da Django
        const errors = err.response.data;
        let errorMsg = "";
        for (let key in errors) {
          errorMsg += `${key}: ${errors[key]} \n`;
        }
        setMessage(errorMsg);
      } else {
        setMessage("Errore nella registrazione");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrazione</h2>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        name="first_name"
        placeholder="Nome"
        value={form.first_name}
        onChange={handleChange}
      />
      <input
        name="last_name"
        placeholder="Cognome"
        value={form.last_name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Indirizzo"
        value={form.address}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <input
        name="password2"
        type="password"
        placeholder="Conferma Password"
        value={form.password2}
        onChange={handleChange}
      />
      <button type="submit">Registrati</button>
      <p style={{ whiteSpace: "pre-line" }}>{message}</p>
    </form>
  );
}
