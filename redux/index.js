import { combineReducers } from "redux";
import { childReducer } from "./actions/child";
import { eventReducer } from "./actions/event";


export default combineReducers({
  child: childReducer,
  event: eventReducer
})