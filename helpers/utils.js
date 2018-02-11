'use strict';

/**
 * Return an error object.
 * @param message Error message
 * @param status Response status code.
 * @returns {Error}
 */
module.exports.Error = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};