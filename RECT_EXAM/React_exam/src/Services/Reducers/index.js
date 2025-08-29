import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { studentReducer } from "./studentReducer";

const rootReducer = combineReducers({
  userReducer,
  studentReducer,
});

export default rootReducer;
