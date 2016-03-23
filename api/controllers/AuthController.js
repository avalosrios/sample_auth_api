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
					console.log(err);
					console.log(user);
					console.log(info);
					/*if( (err) || (!user)){
						return res.send({
							message: err,
							info: info,
							user: user
						});
					}*/
					req.logIn(user, function(err){
						console.log(cosa);
						console.log(caca);
						if(err){
							return res.send({
								error: err,
								user: user
							}, 500);
						}else{
							return res.send({
								message: "Not authenticated",
								user: user
							}, 401);
						}
						return res.send({
							message: info,
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
