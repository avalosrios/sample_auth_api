var passport = require('passport')
module.exports = function(req, res, next) {
  passport.authenticate(
    'basic',
    { session: false  },
    function(err, user, info){
      if( (err) || (!user)){
        if(err){
          return res.send({
            error: err,
            user: user
          },500);
        }else{
          res.set("WWW-Authenticate", "Basic realm=\"Restricted\"");
          return res.send({
            message: "Not authenticated",
            user: user
          },401);
        }

      }
      return next(null, user);
    })(req, res, next);
};
