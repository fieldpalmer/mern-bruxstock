// dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const passport = require("passport");

const keys = require("../../config/db/keys");
// const ensureAuthenticated = require("../../config/passport/auth");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// get db models / collections
const User = require("../../models/User");
const Image = require("../../models/Image");

// @route      GET /users/test
// @desc       Tests users route
// @access     Public
router.get("/test", (req, res) => res.json({ msg: "User Route Connected" }));

// @route      POST /users/register
// @desc       Register users
// @access     Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route      POST users/login
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
          name: user.name
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

// @route      GET /users/:userId
// @desc       View all images for specific artist
// @access     Public
router.get("/:userId", (req, res) => {
  User.findOne({ _id: req.params.userId }).then(user => {
    let stockArr = [];
    let userStock = user.stock;
    userStock.forEach(el => {
      stockArr.push(el.filename);
    });
    Image.find({ filename: { $in: stockArr } }).then(files => {
      if (!files || files.length === 0) {
        return res.status(400).json({
          msg: "Could not find files"
        });
      } else {
        return res.json(files);
      }
    });
  });
});

// @route      get users/current
// @desc       Get current user data
// @access     Private
router.post(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// logout
// @route get users/logout
// @desc log user out
// @access Private
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.logout();
    // res.redirect("/");
  }
);

module.exports = router;
