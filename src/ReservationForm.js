import { useState, useEffect } from "react";
import { submitAPI } from "./apiesterna";
import { fetchAPI } from "./apiesterna";

export default function ReservationForm({ initialTimes = [] }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0], // default oggi
    time: "",
    guests: 1,
    occasion: ""
  });
  const [availableTimes, setAvailableTimes] = useState(initialTimes);
  const [reservation, setReservation] = useState(null);

  // carica prenotazione salvata
  useEffect(() => {
    const saved = localStorage.getItem("reservation");
    if (saved) setReservation(JSON.parse(saved));
  }, []);

  // aggiorna gli orari disponibili quando cambia la data
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setForm(prev => ({ ...prev, date: dateValue, time: "" }));

    const date = new Date(dateValue);
    const times = fetchAPI(date);
    setAvailableTimes(times);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = submitAPI(form);
    if (success) {
      setReservation(form);
      localStorage.setItem("reservation", JSON.stringify(form));
      alert("Reservation successful!");
    } else {
      alert("Reservation failed. Please try another time.");
    }
  };

  const handleDelete = () => {
    setReservation(null);
    localStorage.removeItem("reservation");
  };

  return (
    <div className="reservation-page">
      {reservation ? (
        <div>
          <h2>Booking management</h2>
          <p><strong>Date:</strong> {reservation.date}</p>
          <p><strong>Hour:</strong> {reservation.time}</p>
          <p><strong>Guests number:</strong> {reservation.guests}</p>
          <p><strong>Occasion:</strong> {reservation.occasion || "—"}</p>
          <button className="btn-danger" onClick={handleDelete}>
            Delete reservation
          </button>
        </div>
      ) : (
        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleDateChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Hour:</label>
            <select
              id="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            >
              <option value="">Select time</option>
              {availableTimes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Guests number:</label>
            <input
              id="guests"
              type="number"
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
              <option value="">—</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Book
          </button>
        </form>
      )}
    </div>
  );
}
