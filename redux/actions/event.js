import { createReducer } from "../../utils/reduxHelpers";
import { ADD_EVENT, UPDATE_EVENT, REMOVE_EVENT, SET_EVENT, SET_EVENTS } from '../const/event';

const INITIAL_STATE = {
  events:[],
  event:{},
}

export const eventReducer = createReducer(INITIAL_STATE, {
  [ADD_EVENT]: (state,action) => ({...state, events: [...state.events, state.event], event:{}}),
  [UPDATE_EVENT]: (state,action) => ({...state, events: state.events.map((evt) => evt.id === state.event.id ? state.event : evt)}),
  [REMOVE_EVENT]: (state,action) => ({...state, events: state.events.filter((evt) => evt.id !== action.id)}),
  [SET_EVENT]: (state,action) => ({...state, event: action.event}),
  [SET_EVENTS]: (state,action) => ({...state, events:action.events})
});

export const setEvent = (event) => ({
  type: SET_EVENT,
  event
});

export const addEvent = (event) => ({ // (event)
  type: ADD_EVENT,
  event,
});
export const removeEvent = (id) => ({
  type: REMOVE_EVENT,
  id,
});
export const updateEvent = () => ({ // (i,event)
  type: UPDATE_EVENT,
  // i,
  // event
});
export const setEvents = (events) => ({
  type: SET_EVENTS,
  events
});