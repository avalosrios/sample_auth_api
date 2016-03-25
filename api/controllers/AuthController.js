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
					console.log("login !! -----");
					console.log(err);
					console.log(user);
					console.log(info);
					if(err) return res.serverError(err);
					if(!user) return res.unauthorized(null, info && info.code, info && info.message);
					return res.ok({
						user: user,
						jwtToken: user.jwtToken()
					});
				})(req, res);
		},

		logout: function(req, res){
			req.logout();
			// TODO I don't think we need logout on this controller
		},

};
