var passport = require('passport')
module.exports = function(req, res, next) {
  passport.authenticate(
    'basic',
    { session: false  },
    function(err, user, info){
      console.log(user);
      if( (err) || (!user)){
        res.set("WWW-Authenticate", "Basic realm=\"Restricted\"");
        var message;
        if(err){
          message = error.message;
        }else{
          message = "Not authenticated";
        }
        return res.send({
          message: message,
          user: user
        },401);
      }
      return next(null, user);
      /*
      req.logIn(user, function(err){
        if(err) res.send(err);
        return res.send({
          message: info.message,
          user: user
        });
      });*/
    })(req, res, next);
};
