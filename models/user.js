const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Utils = require('../helpers/token');

//mongoose schema
const Schema = mongoose.Schema;

//secret
const SECRET = process.env.SECRET;

//salt is to defeat rainbow table attacks and to resist brute-force attacks
// in the event that someone has gained access to your database.
const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000; //Two hour lock

/**
 * User Database schema.
 */
const UserSchema = Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  loginAttempts: {type: Number, required: true, default: 0},
  lockUntil: Number,
  admin: {type: Boolean, default: false}
});

/**
 * Enum user login failures.
 * @type {{NOT_FOUND: number, PASSWORD_INCORRECT: number, MAX_ATTEMPTS: number}}
 */
const reasons = UserSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
};

/**
 * Virtual attribute to determine if a user's account is locked or not.
 */
UserSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

/**
 * Virtual attribute to determine whether the lock on the user has expired
 * or not.
 */
UserSchema.virtual('isLockExpired').get(function () {
  return !!(this.lockUntil && this.lockUntil < Date.now())
});

/**
 * Virtual attribute to determine whether there is no lock or failed login
 * attempts.
 */
UserSchema.virtual('isNotLocked').get(function () {
  return (!this.loginAttempts && !this.lockUntil);
});

/**
 * Virtual attribute to check whether a user has reached their max login
 * attempts and that their accounts are not yet locked.
 */
UserSchema.virtual('hasExceedLoginAttempts').get(function () {
  return (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked);
});

/**
 * Mongoose middleware to hash the user password before the User details are
 * saved.
 * Only new passwords or updated ones are hashed.
 */
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) return next(error);
      user.password = hash;
      next();
    })
  })
});

/**
 * Instance method to compare the supplied password with that in the database
 * @param candidatePassword
 * @param cb
 */
UserSchema.methods.decryptPassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//Increment the login attempts for the user and lock time.
/**
 * Instance method to restart the login attempts and lock if the lock on the
 * user account is expired.
 * It also increments the login attempts and sets the lock on the account if
 * the maximum number of attempts is reached.
 * @param cb
 * @returns {Query|void|*|IDBRequest|Promise<void>}
 */
UserSchema.methods.incrementLoginAttempts = function (cb) {
  const user = this;
  //If the previous lock has expired restart to 1.
  if (user.isLockExpired) {
    return user.update({
      $set: {loginAttempts: 1},
      $unset: {lockUntil: 1}
    }, cb)
  }
  //lock the account if it has reached the maximum number of attempts and it is not yet locked.
  let updates = {$inc: {loginAttempts: 1}};
  if (user.hasExceedLoginAttempts) {
    updates.$set = {lockUntil: Date.now() + LOCK_TIME};
  }
  return user.update(updates, cb);
};

/**
 * Function to authenticate a user using their email and password.
 * The user is returned only if there is no lock and the passwords match.
 * @param email User's email address
 * @param password User's password
 * @param cb callback function
 */
UserSchema.statics.signIn = function (email, password, cb) {
  this.findOne({email: email})
      .exec()
      .then(user => {
        //Check for a user
        if (!user) {
          return cb(null, null, reasons.NOT_FOUND);
        }
        //Check is account is currently locked.
        if (user.isLocked) {
          return user.incrementLoginAttempts(function (error) {
            if (error) return cb(error);
            return cb(null, null, reasons.MAX_ATTEMPTS);
          });
        }

        user.decryptPassword(password, function (error, isMatch) {
          if (error) return cb(error);
          if (isMatch) {
            if (user.isNotLocked) return cb(null, user);
            //Reset attempts and lock info
            const updates = {
              $set: {loginAttempts: 0},
              $unset: {lockUntil: 1}
            };
            return user.update(updates, function (error) {
              if (error) return cb(error);
              return cb(null, user);
            })
          }
          //incorrect password, increment login attempts, then respond.
          user.incrementLoginAttempts(function (error) {
            if (error) return cb(error);
            return cb(null, null, reasons.PASSWORD_INCORRECT)
          })
        })
      })
      .catch(error => cb(error));
};

/**
 * Static method to register a user.
 * @param userCredentials email, name and password
 */
UserSchema.statics.register = function (userCredentials) {
  const user = new User(userCredentials);
  return user.save();
};

//User model
const User = mongoose.model('User', UserSchema);

module.exports.User = User;

