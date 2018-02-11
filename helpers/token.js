'use strict';

const jwt = require('jsonwebtoken');

/**
 * Mint a Json Web Token for the current user.
 * @param user User
 * @param secret App secret
 * @returns {*}
 */
const mintToken = (user, secret) => {
  const payload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    admin: user.admin
  };
  return jwt.sign(payload, secret, {expiresIn: '24h'});
};

/**
 * Verify and decode the user token.
 * @param token JWT
 * @param secret App secret
 * @param cb callback
 * @returns {*}
 */
const decodeToken = (token, secret, cb) => {
  return jwt.verify(token, secret, cb);
};

module.exports.mintToken = mintToken;
module.exports.decodeToken = decodeToken;