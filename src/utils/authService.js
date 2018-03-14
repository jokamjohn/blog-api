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
export const getTokenConfig = () => ({headers: {'x-access-token': getToken()}});

/**
 * Clear the token in local storage.
 * @returns {*}
 */
export const signout = () => clearToken();

/**
 * True if the user is an admin.
 * @returns {*}
 */
const isAdmin = () => {
  if (isLoggedIn()) return decode(getToken()).admin;
  return false;
};

/**
 * Find the author of a blog post.
 * @param postOwnerId
 * @returns {boolean}
 */
const isPostAuthor = postOwnerId => {
  if (isLoggedIn()) return decode(getToken()).userId === postOwnerId;
  return false
};

/**
 * Find the comment author.
 * @param commentAuthorId
 * @returns {boolean}
 */
const isCommentOwner = commentAuthorId => {
  if (isLoggedIn()) return decode(getToken()).userId === commentAuthorId;
  return false;
};

/**
 * User can edit or delete a blog post.
 * @param postOwnerId
 * @returns {*|boolean}
 */
export const userCanEditOrDeletePost = postOwnerId => isAdmin() || isPostAuthor(postOwnerId);

/**
 * User can edit or delete a blog comment.
 * @param postOwnerId
 * @param commentOwnerId
 * @returns {*|boolean}
 */
export const userCanEditORDeleteComment = (postOwnerId, commentOwnerId) => isAdmin() || isPostAuthor(postOwnerId) || isCommentOwner(commentOwnerId);

/**
 * Get the name of the current user.
 * @returns {*}
 */
export const getUsername = () => {
  if (isLoggedIn()) return decode(getToken()).name;
  return '';
};

/**
 * Get the current user email.
 * @returns {*}
 */
export const getEmail = () => {
  if (isLoggedIn()) return decode(getToken()).email;
  return '';
};