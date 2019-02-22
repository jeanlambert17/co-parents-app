import { combineReducers } from "redux";
import { childReducer } from "./actions/child";
import { eventReducer } from "./actions/event";
import { contactReducer } from './actions/contact'
import { messageReducer } from './actions/message'


export default combineReducers({
  child: childReducer,
  event: eventReducer,
  contact: contactReducer,
  message: messageReducer
})