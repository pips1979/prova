import { timesReducer, initializeTimes } from "./timesReducer";

test("initializeTimes returns the correct initial times", () => {
  const times = initializeTimes();
  expect(times).toEqual(["17:00", "18:00", "19:00", "20:00"]);
});

test("timesReducer returns the same state when action type is unknown", () => {
  const initialState = ["17:00", "18:00"];
  const newState = timesReducer(initialState, { type: "UNKNOWN" });
  expect(newState).toEqual(initialState);
});

test("timesReducer returns updated times when dateChange is dispatched", () => {
  const initialState = [];
  const newState = timesReducer(initialState, { type: "dateChange", date: "2025-09-23" });
  expect(newState).toEqual(["17:00", "18:00", "19:00", "20:00"]);
});
