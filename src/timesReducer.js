export function timesReducer(state, action) {
  switch (action.type) {
    case "setTimes":
      return Array.isArray(action.times) ? action.times : state;
    default:
      return state;
  }
}