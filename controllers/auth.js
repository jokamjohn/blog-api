const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Utils = require('../helpers/token');

//app secret.
const SECRET = process.env.SECRET;

//Route to register a user
router.post('/login', (req, res, next) => {
  User.signIn(req.body['email'], req.body['password'], function (err, user, reason) {
    if (err) return next(err);
    if (user) {
      res.json({
        status: 'success',
        token: Utils.mintToken(user, SECRET)
      });
    }
    const reasons = User.failedLogin;
    switch (reason) {
      case reasons.NOT_FOUND:
        res.status(400).send({
          status: 'failed',
          message: 'User not found'
        });
        break;
      case reasons.PASSWORD_INCORRECT:
        res.status(400).send({
          status: 'failed',
          message: 'Incorrect password'
        });
        break;
      case reasons.MAX_ATTEMPTS:
        res.status(400).send({
          status: 'failed',
          message: 'Account locked'
        });
        break;
    }
  });
});

//route to login a user.
router.post('/register', (req, res, next) => {
  User.register(req.body)
      .then(user => res.status(201).send({
        status: 'success',
        token: Utils.mintToken(user, SECRET)
      }))
      .catch(err => next(err))
});

module.exports = router;