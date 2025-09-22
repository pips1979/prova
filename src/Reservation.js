import { useState, useEffect } from "react";
import { getReservation, createReservation, updateReservation, deleteReservation } from "./Api";

export default function Reservation({ token }) {
  const [reservation, setReservation] = useState(null);
  const [form, setForm] = useState({ date: "", time: "", guests: 1 });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      getReservation(token)
        .then(res => setReservation(res.data))
        .catch(() => setReservation(null));
    }
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (reservation) {
      updateReservation(token, form)
        .then(res => { setReservation(res.data); setMessage("Prenotazione aggiornata"); })
        .catch(err => setMessage("Errore"));
    } else {
      createReservation(token, form)
        .then(res => { setReservation(res.data); setMessage("Prenotazione creata"); })
        .catch(err => setMessage("Errore"));
    }
  };

  const handleDelete = () => {
    deleteReservation(token)
      .then(() => { setReservation(null); setMessage("Prenotazione cancellata"); })
      .catch(err => setMessage("Errore"));
  };

  return (
    <div>
      <h2>Gestione Prenotazione</h2>
      {reservation ? (
        <div>
          <p>Data: {reservation.date}</p>
          <p>Ora: {reservation.time}</p>
          <p>Numero clienti: {reservation.guests}</p>
          <button onClick={handleDelete}>Cancella prenotazione</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Data: <input type="date" name="date" value={form.date} onChange={handleChange} required /></label>
          <label>Ora: <input type="time" name="time" value={form.time} onChange={handleChange} required /></label>
          <label>Numero clienti: <input type="number" name="guests" min="1" value={form.guests} onChange={handleChange} required /></label>
          <button type="submit">{reservation ? "Aggiorna" : "Prenota"}</button>
        </form>
      )}
      <p>{message}</p>
    </div>
  );
}
