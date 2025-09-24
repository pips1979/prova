import { render, screen } from "@testing-library/react";
import ReservationForm from "./ReservationForm";

const mockTimes = ["17:00", "18:00", "19:00", "20:00"];

describe("ReservationForm", () => {
  test("renders the Date input", () => {
    render(<ReservationForm initialTimes={mockTimes} />);
    expect(screen.getByLabelText(/Date:/i)).toBeInTheDocument();
  });

  test("renders the Book button", () => {
    render(<ReservationForm initialTimes={mockTimes} />);
    const buttonElement = screen.getByRole("button", { name: /Book/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders available time options", () => {
    render(<ReservationForm initialTimes={mockTimes} />);
    mockTimes.forEach(time => {
      expect(screen.getByRole("option", { name: time })).toBeInTheDocument();
    });
  });
});
