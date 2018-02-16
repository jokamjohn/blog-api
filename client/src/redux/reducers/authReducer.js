import initialState from "../initialState";
import {USER_LOGIN_SUCCESS} from "../actionTypes/actionsTypes";

export default function (state = initialState.auth, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    default:
      return state;
  }
};