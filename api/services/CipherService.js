var Passwords = require('machinepack-passwords');
var jwt = require('jsonwebtoken');

module.exports = {
  /**
   * Create a token based on the passed user  or object
   * @param object
   */
  generateJwtToken: function(obj, callback){
    console.log("Generating JWT token for obj", obj);
    if(!callback){
      return jwt.sign(obj, sails.config.jwtSecret,
        module.exports.jwtTokenSettings);
    }
    jwt.sign(obj, sails.config.jwtSecret, module.exports.jwtTokenSettings,
        function(token){
          callback(token);
        });
  },

  /**
  * Actually this verifies the token we only decode using verify
  *
  */
  decodeJwtToken: function(token, callback){
    if(!callback){
      try{
        var decoded = jwt.verify(token, sails.config.jwtSecret,
          module.exports.jwtTokenSettings);
        return decoded;
      }catch(err){
        console.log("Error decoding JWT token");
        return null;
      }
    }
    jwt.verify(token, sails.config.jwtSecret, module.exports.jwtTokenSettings,
      function(err, decoded){
        callback(err, decoded);
      });
  },

  /**
   * Encripts password and executes obj callback
   * @param passphrase
   * @param callbackObj
   *   {
   *    success: Success Callback,
   *    error: Error Callback
   *   }
   */
  encryptPassword: function(passphrase, callbackObj){
    Passwords.encryptPassword({
      password: passphrase
    }).exec(callbackObj);
  },

}
