import { useState, useEffect } from "react";
import { getReservation, createReservation, updateReservation, deleteReservation } from "./Api";
import { Helmet } from "react-helmet"; 

export default function Reservation({ token }) {
  const [reservation, setReservation] = useState(null);
  const [form, setForm] = useState({ date: "", time: "", guests: 1, occasion: "" });
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
        .catch(() => setMessage("Errore"));
    } else {
      createReservation(token, form)
        .then(res => { setReservation(res.data); setMessage("Prenotazione creata"); })
        .catch(() => setMessage("Errore"));
    }
  };

  const handleDelete = () => {
    deleteReservation(token)
      .then(() => { setReservation(null); setMessage("Prenotazione cancellata"); })
      .catch(() => setMessage("Errore"));
  };

  return (
    <div className="reservation-page">
      <Helmet>
        <title>Table reservation</title>
        <meta 
          name="description" 
          content="In this page you can reserve a table at Little lemon for you, your family or your friends!" 
        />
        <meta name="og:title" content="Page to reserve a table at Little Lemon" />
        <meta name="og:description" content="In this page you can reserve a table at Little lemon for you, your family or your friends!"/>
      </Helmet>

      <h2>Booking management</h2>

      {reservation ? (
        <div className="reservation-card">
          <p><strong>Date:</strong> {reservation.date}</p>
          <p><strong>Hour:</strong> {reservation.time}</p>
          <p><strong>Guests number:</strong> {reservation.guests}</p>
          <p><strong>Occasion:</strong> {reservation.occasion || "—"}</p>
          <button onClick={handleDelete} className="btn-danger">Delete reservation</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input 
              type="date" 
              id="date"
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Hour:</label>
            <input 
              type="time" 
              id="time"
              name="time" 
              value={form.time} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="guests">Guests number:</label>
            <input 
              type="number" 
              id="guests"
              name="guests" 
              min="1" 
              max="10" 
              value={form.guests} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="occasion">Occasion:</label>
            <select 
              id="occasion" 
              name="occasion" 
              value={form.occasion} 
              onChange={handleChange}
            >
              <option value="">Select occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business">Business Dinner</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            {reservation ? "Update" : "Book"}
          </button>
        </form>
      )}
      <p className="message">{message}</p>
    </div>
  );
}
