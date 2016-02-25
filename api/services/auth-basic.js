var passport = require('passport'),
BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){
    console.log("basic strategy email", email);
    User.findOne({ email: email}, function(err, user){
      console.log('find one', user);
      if (err){ return done(err); }
      if (!user){ return done(null, false, { message: "User not found."}); }
      user.verifyPassword(password, {
        error: function(err){
          return done(err);
        },
        incorrect: function(){
          return done(null,false, { message: "Wrong password"});
        },
        success: function(){
          return done(null, user);
        }
      });

      //var verification = user.verifyPassword(password);
      //console.log("auth-basic - verification", verification)
      //if (!verification.valid){ ); }

    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});
