// function to see if our user is Authenticated already,
// if note, make them login in order to access sensitive data
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  }
};
