import { timesReducer } from "./timesReducer";

describe("timesReducer", () => {
  test("returns the same state for unknown action", () => {
    const initialState = ["17:00", "18:00"];
    const newState = timesReducer(initialState, { type: "UNKNOWN" });
    expect(newState).toEqual(initialState);
  });

  test("updates times when setTimes is dispatched", () => {
    const initialState = [];
    const newTimes = ["17:00", "18:00", "19:00", "20:00"];
    const newState = timesReducer(initialState, { type: "setTimes", times: newTimes });
    expect(newState).toEqual(newTimes);
  });
});
