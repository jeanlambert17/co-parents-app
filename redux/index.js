import { combineReducers } from "redux";
import { childReducer } from "./actions/child";
import { eventReducer } from "./actions/event";
import { contactReducer } from './actions/contact';
import { messagesReducer } from './actions/messages';
import { userReducer } from "./actions/user";
import { authReducer } from "./actions/auth";
import { coParentReducer } from "./actions/parent";


export default combineReducers({
  child: childReducer,
  event: eventReducer,
  contact: contactReducer,
  messages: messagesReducer,
  user: userReducer,
  auth: authReducer,
  coParent: coParentReducer
});