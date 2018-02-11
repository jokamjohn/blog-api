'use strict';
const Utils = require('../helpers/token');

/**
 * Middleware to require a token for protected routes and then set the decoded
 * information onto the req.
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  const SECRET = process.env.SECRET;
  if (token) {
    Utils.decodeToken(token, SECRET, function (err, decode) {
      if (err) {
        res.status(400).send({
          status: 'failed',
          message: 'Failed to authenticate the token'
        })
      } else {
        req.decode = decode;
        return next();
      }
    })
  } else {
    res.status(403).send({
      status: 'failed',
      message: 'No token provided'
    });
  }
};