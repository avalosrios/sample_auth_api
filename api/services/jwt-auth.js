//var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
//var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;

passport.use(new JwtStrategy(sails.config.JwtStrategySettings,
  function(jwt_payload, done){
    console.log("JWT strategy", jwt_payload);
    var usr = jwt_payload.user;
    console.log(usr);
    console.log("id?", jwt_payload.id);
    User.findOne({id: jwt_payload.id}, function(err, user){
      if(err){return done(err, false);}
      if(!user){ return done(null, false, {message: "User not found"});}
      done(null, user);
    });
  }
));
