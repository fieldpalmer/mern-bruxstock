// dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/db/keys");
// const ensureAuthenticated = require("../../config/passport/auth");

// get input validation
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

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      // create new user object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // hash password before saving
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
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
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
              token: "Bearer " + token,
              payload: payload
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
router.get("/:userid", (req, res) => {
  User.findOne({ _id: req.params.userid }).then(user => {
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

module.exports = router;
