/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res){
    console.log("User controller create");
    var params = req.params.all();
    console.log("params", params);
    var user = params.user;
    User.create(params).exec(function(err,user){
      console.log("ERROR", err);
      if(err) return res.serverError(err);
      console.log("User created: ", user);
      return res.json({
        user: user,
        jwtToken: user.jwtToken()
      });
    });
  },

};
