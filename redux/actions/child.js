import { createReducer } from "../../utils/reduxHelpers";
import { ADD_CHILD, REMOVE_CHILD } from '../const/child';

const INITIAL_STATE = {
  children: [{
    id: 1,
    icon: 'null',
    name: 'Maria'
  }, {
    id: 2,
    icon: null,
    name: 'Peter'
  }]
}

export const childReducer = createReducer(INITIAL_STATE, {
  [ADD_CHILD]: (state,action) => ({...state, children: [...state.children, action.child]}),
  [REMOVE_CHILD]: (state,action) => ({...state, children: state.filter(child => child.id != action.id)})
});

export const addChild = (child) => ({
  type: ADD_CHILD,
  child,
})
export const removeChild = (id) => ({
  type: REMOVE_CHILD,
  id,
})