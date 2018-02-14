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

/**
 * Function to bypass middleware for a specific route.
 * @param fn middleware
 * @returns {Function}
 */
module.exports.maybe = fn => {
  return (req, res, next) => {
    if (req.path === '/posts/:slug' && req.method === 'GET') {
      next();
    } else {
      fn(req, res, next);
    }
  }
};