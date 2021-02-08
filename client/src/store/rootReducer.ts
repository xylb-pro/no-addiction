import { combineReducers } from "redux";
import { usersReducer } from "./users/usersReducer";
import { timersReducer } from "./timers/timersReducer";

export const rootReducer = combineReducers({
  users: usersReducer,
  timers: timersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
