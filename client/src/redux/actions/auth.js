import {LOGOUT_USER_SUCCESSFULLY, USER_LOGIN_SUCCESS} from "../actionTypes/actionsTypes";
import {loginUser} from "../../api/userAPI";
import {isLoggedIn, setToken} from "../../utils/authService";

/**
 * Action to pass the logged in boolean to state.
 * @param isLoggedIn
 * @returns {{type, isLoggedIn: *}}
 */
export const login = isLoggedIn => ({
  type: USER_LOGIN_SUCCESS,
  isLoggedIn
});

/**
 * Async action to log the user and update state.
 * @param data
 * @returns {function(*): Promise<{type, isLoggedIn: *}>}
 */
export const userLogin = data => dispatch => loginUser(data)
    .then(response => setToken(response.data.token))
    .then(() => dispatch(login(isLoggedIn())))
    .catch(err => console.log('login error', err));

/**
 * Action to pass the logged in boolean to state at logout
 * @param isLoggedIn
 * @returns {{type, isLoggedIn: *}}
 */
export const logout = isLoggedIn => ({
  type: LOGOUT_USER_SUCCESSFULLY,
  isLoggedIn
});

