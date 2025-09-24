import { useState, useEffect } from "react";
import { submitAPI, fetchAPI } from "./apiesterna";

export default function ReservationForm({ initialTimes = [] }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "",
    guests: 1,
    occasion: ""
  });
  const [availableTimes, setAvailableTimes] = useState(initialTimes || []);
  const [reservation, setReservation] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");

  // Carica prenotazione salvata
  useEffect(() => {
    const saved = localStorage.getItem("reservation");
    if (saved) setReservation(JSON.parse(saved));
  }, []);

  // Validazione lato React
  useEffect(() => {
    validateForm();
  }, [form]);

  const validateForm = () => {
    const { date, time, guests } = form;
    const today = new Date().toISOString().split("T")[0];

    const valid =
      date >= today &&
      time !== "" &&
      guests >= 1 &&
      guests <= 10;

    setIsValid(valid);
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setForm((prev) => ({ ...prev, date: dateValue, time: "" }));

    const date = new Date(dateValue);
    const times = fetchAPI(date);
    setAvailableTimes(times);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = submitAPI(form);
    if (success) {
      setReservation(form);
      localStorage.setItem("reservation", JSON.stringify(form));
      setMessage("✅ Reservation successful!");
    } else {
      setMessage("❌ Reservation failed. Please try another time.");
    }
  };

  const handleDelete = () => {
    setReservation(null);
    localStorage.removeItem("reservation");
  };

  return (
    <section className="reservation-page" aria-label="Reservation Section">
      {reservation ? (
        <article aria-label="Booking Management">
          <h2>Booking management</h2>
          <p><strong>Date:</strong> {reservation.date}</p>
          <p><strong>Hour:</strong> {reservation.time}</p>
          <p><strong>Guests number:</strong> {reservation.guests}</p>
          <p><strong>Occasion:</strong> {reservation.occasion || "—"}</p>
          <button
            className="btn-danger"
            onClick={handleDelete}
            aria-label="On Click"
          >
            Delete reservation
          </button>
        </article>
      ) : (
        <form
          className="reservation-form"
          onSubmit={handleSubmit}
          data-testid="reservation-form"
          aria-label="Reservation Form"
        >
          <fieldset>
            <legend>Reservation Details</legend>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                id="date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleDateChange}
                required
                aria-label="Select reservation date"
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
                aria-label="Select reservation hour"
              >
                <option value="">Select time</option>
                {(availableTimes || []).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
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
                aria-label="Number of guests"
              />
            </div>

            <div className="form-group">
              <label htmlFor="occasion">Occasion:</label>
              <select
                id="occasion"
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
                required
                aria-label="Select occasion"
              >
                <option value="">—</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={!isValid}
              aria-label="On Click"
            >
              Book
            </button>

            {message && (
              <p role="status" aria-live="polite">
                {message}
              </p>
            )}
          </fieldset>
        </form>
      )}
    </section>
  );
}
