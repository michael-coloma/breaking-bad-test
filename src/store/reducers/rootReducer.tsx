import { combineReducers } from "redux";
import { userActionsReducer } from "./userActions";

const rootReducer = combineReducers({
  userActions: userActionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
