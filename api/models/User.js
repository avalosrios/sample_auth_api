/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var Passwords = require('machinepack-passwords');
var passport = require('passport');
module.exports = {

  attributes: {
    name:{
      type: 'string',
      required: true
    },
    email:{
      type: 'email',
      required: true,
      unique: true
    },
    password:{
      type: 'string',
      //minLength: 6,
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },
    verifyPassword: function(password, callback){ // callback needs to have error, incorrect and success
      // Compare a plaintext password attempt against an already-encrypted version.
      var obj = this.toObject();
      Passwords.checkPassword({
        passwordAttempt: password,
        encryptedPassword: obj.password,
      }).exec({
        // An unexpected error occurred.
        error: callback.error,
        // Password attempt does not match already-encrypted version
        incorrect: callback.incorrect,
        // OK.
        success: callback.success,
      });
    },// End of verifyPassword function

  },
  beforeCreate: function(user, cb) {
    Passwords.encryptPassword({
      password: user.password
    }).exec({
      error: function(err){
        console.log(err);
        cb(err);
      },
      // OK
      success: function(result){
        user.password = result;
        cb();
      },
    })
  }
};
