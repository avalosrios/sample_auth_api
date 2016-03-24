/**
* Passport config file
*/
var ExtractJwt = require('passport-jwt').ExtractJwt;
// Configuring secret token for JWT
var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET = process.env.tokenSecret || "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM";
var ALGORITHM = "HS256";
var ISSUER; // TODO change this
var AUDIENCE; // TODO change this

var JWT_STRATEGY_CONFIG = {
  algorithm: ALGORITHM,
  secretOrKey: SECRET,
  issuer: ISSUER, // If defined the token issuer (iss) will be verified against this value.
  audience: AUDIENCE, //If defined, the token audience (aud) will be verified against this value.
  jwtFromRequest: ExtractJwt.fromAuthHeader(), //Function that accepts a request as the only parameter and returns either the JWT as a string or null
};

var JWT_TOKEN_CONFIG = {
  algorithm: ALGORITHM,
  issuer: ISSUER,
  audience: AUDIENCE,
  expires: EXPIRES_IN_MINUTES
};

module.exports.jwtSecret =  SECRET
module.exports.JwtStrategySettings = JWT_STRATEGY_CONFIG;
module.exports.jwtTokenSettings = JWT_TOKEN_CONFIG;
