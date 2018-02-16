import decode from 'jwt-decode';

const AUTH_TOKEN_KEY = 'token';

/**
 * Add a token to local storage.
 * @param token
 */
export const setToken = token => localStorage.setItem(AUTH_TOKEN_KEY, token);

/**
 * Get the auth token from local storage
 * @returns {string | null}
 */
export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

/**
 * Remove the token from local storage.
 */
export const clearToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

/**
 * Get the expiration date for the current token.
 * @param encodedToken
 * @returns {*}
 */
const getTokenExpirationDate = encodedToken => {
  const token = decode(encodedToken);
  if (!token.exp) return null;
  const date = new Date(0);
  return date.setUTCSeconds(token.exp);
};

/**
 * Check whether the token is expired.
 * @param token
 * @returns {boolean}
 */
const isTokenExpired = token => getTokenExpirationDate(token) < new Date();

/**
 * Check whether the user is logged in.
 * @returns {boolean}
 */
export const isLoggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

/**
 * Get object to be used in axios as the token config.
 * @returns {{"x-access-token": string}}
 */
export const getTokenConfig = () => ({'x-access-token': getToken()});