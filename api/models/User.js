/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var passport = require('passport');
module.exports = {
  // TODO do a confirm password validation
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
      //var jwtToken = CipherService.generateJwtToken(obj);
      //obj.jwtToken = jwtToken;
      return obj;
    },
    jwtToken: function(){
      return CipherService.generateJwtToken(this.toJSON());
    },
    verifyPassword: function(password, callback){ // callback needs to have error, incorrect and success
      // Compare a plaintext password attempt against an already-encrypted version.
      var obj = this.toObject();
      CipherService.verifyPassword(password, obj.password,{
        error: callback.error, // An unexpected error occurred.
        incorrect: callback.incorrect, // Password attempt does not match already-encrypted version
        success: callback.success, // OK.
      });
    },// End of verifyPassword function
  },
  beforeValidate: function(user, next){
    // TODO nothing
    console.log('Before validation');
    next();
  },
  beforeCreate: function(user, next) {
    console.log('Before create', user);
    CipherService.encryptPassword(user.password, {
      error: function(err){
        next(err);
      },
      success: function(result){
        user.password = result;
        next();
      },
    });
  }
};
