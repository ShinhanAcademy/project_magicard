import { combineReducers } from "redux";

import userSlice from "../slices/user";
import softuiSlice from "../slices/softui";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  layout: softuiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
