// routes related to users/artists go in this file

// dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// get db models / collections
const User = require("../../models/User");

// @route      POST api/users
// @desc       Tests users route
// @access     Public
router.post("/", (req, res) => {
  res.send("register");
});

// @route      GET api/users/test
// @desc       Tests users route
// @access     Public
router.get("/test", (req, res) => console.log("User Route Connected"));

// @route      POST api/users/register
// @desc       Register users
// @access     Public
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const { isValid } = validateRegisterInput(req.body);

  // check Validation
  if (!isValid) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res.json({
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route      POST api/login
// @desc       login user / return JWT
// @access     Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route      GET api/current
// @desc       Return current user
// @access     Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;

// logout

// deleteAccount
