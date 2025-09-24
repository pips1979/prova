import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReservationForm from "./ReservationForm";
import * as api from "./apiesterna"; // importa tutto per spyOn

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

// ---------------------------
// Test HTML5 validation
// ---------------------------
test("applica gli attributi HTML5 corretti", () => {
  render(<ReservationForm initialTimes={["18:00"]} />);

  const dateInput = screen.getByLabelText(/date/i);
  const timeSelect = screen.getByLabelText(/hour/i);
  const guestsInput = screen.getByLabelText(/guests number/i);
  const occasionSelect = screen.getByLabelText(/occasion/i);

  expect(dateInput).toHaveAttribute("required");
  expect(timeSelect).toHaveAttribute("required");
  expect(guestsInput).toHaveAttribute("min", "1");
  expect(guestsInput).toHaveAttribute("max", "10");
  expect(occasionSelect).toHaveAttribute("required");
});

// ---------------------------
// Test salvataggio su localStorage
// ---------------------------


// ---------------------------
// Test caricamento prenotazione salvata
// ---------------------------
test("mostra prenotazione salvata da localStorage", () => {
  localStorage.setItem(
    "reservation",
    JSON.stringify({
      date: "2025-09-23",
      time: "19:00",
      guests: 3,
      occasion: "Anniversary",
    })
  );

  render(<ReservationForm initialTimes={["18:00", "19:00"]} />);

  expect(screen.getByText(/Booking management/i)).toBeInTheDocument();
  expect(screen.getByText(/Anniversary/i)).toBeInTheDocument();
});

// ---------------------------
// Test cancellazione prenotazione
// ---------------------------
test("cancella prenotazione quando si clicca delete", () => {
  localStorage.setItem(
    "reservation",
    JSON.stringify({
      date: "2025-09-23",
      time: "19:00",
      guests: 3,
      occasion: "Anniversary",
    })
  );

  render(<ReservationForm initialTimes={["18:00", "19:00"]} />);
  const deleteBtn = screen.getByRole("button", { name: /delete reservation/i });
  fireEvent.click(deleteBtn);

  expect(localStorage.getItem("reservation")).toBeNull();
  expect(screen.getByRole("button", { name: /book/i })).toBeInTheDocument();
});
