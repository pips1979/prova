import { useState, useEffect } from "react";

export default function Reservation({ availableTimes, dispatch }) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: 1,
    occasion: ""
  });
  const [reservation, setReservation] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setForm({ ...form, date: newDate });
    // aggiorniamo gli slot disponibili
    dispatch({ type: 'dateChange', date: newDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReservation(form);
    localStorage.setItem("reservation", JSON.stringify(form));
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
        </div>
      ) : (
        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleDateChange} // usa questa
              required
            />
          </div>

          <div className="form-group">
            <label>Hour:</label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            >
              <option value="">Select time</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* ... resto form ... */}

          <button type="submit" className="btn-primary">Book</button>
        </form>
      )}
    </div>
  );
}
