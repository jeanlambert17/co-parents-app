import { createReducer } from "../../utils/reduxHelpers";
import { SET_USER } from '../const/user';

const INITIAL_STATE = {
  user: {
    // id: 'ntIL4GQ0WAai8L0NHsGrKHfOVcI2',
    // email: "jeeaan1702@gmail.com",
    // icon: "https://graph.facebook.com/10216482590805024/picture",
    // lastSignInTime: 1551926830534,
    // name: "Jean Lambert",
    // phoneNumber: null
  }
}

export const userReducer = createReducer(INITIAL_STATE, {
  [SET_USER]: (state,action) => ({...state, user: action.user })
});

export const setUser = user => ({
  type: SET_USER,
  user
});