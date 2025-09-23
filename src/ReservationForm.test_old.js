import { render, screen } from "@testing-library/react";
import ReservationForm from "./ReservationForm";

test("renders the Date label in the ReservationForm", () => {
  render(<ReservationForm availableTimes={[]} />);
  const labelElement = screen.getByText(/Date:/i);
  expect(labelElement).toBeInTheDocument();
});

test("renders the Book button in the ReservationForm", () => {
  render(<ReservationForm availableTimes={[]} />);
  const buttonElement = screen.getByRole("button", { name: /Book/i });
  expect(buttonElement).toBeInTheDocument();
});
