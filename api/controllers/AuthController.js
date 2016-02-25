/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

/*
		_config: {
	    actions: false,
	    shortcuts: false,
	    rest: false
	  },
		*/

		login: function(req, res){
			passport.authenticate(
				'basic',
				{session: false},
				function(err, user, info){
					if( (err) || (!user)){
						return res.send({
							message: info.message,
							user: user
						});
					}
					req.logIn(user, function(err){
						if(err) res.send(err);
						return res.send({
							message: info.message,
							user: user
						});
					});
				})(req, res);
		},

		logout: function(req, res){
			req.logout();
			req.redirect('/'); // TODO remove this and do something else as we are using it as an API only

		}



};
