// routes related to users/artists go in this file

// dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/db/keys");
// const ensureAuthenticated = require("../../config/passport/auth");

// get db models / collections
const User = require("../../models/User");

// @route      POST api/users
// @desc       Tests users route
// @access     Public
router.post("/", (req, res) => {
  res.send("api/users works!");
});

// @route      POST api/users/register
// @desc       Register users
// @access     Public
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

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
            .then(user => {
              // Sign token
              jwt.sign(
                { id: user.id },
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route      POST api/users/login
// @desc       login user / return JWT
// @access     Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      // Sign token
      jwt.sign(
        { id: user.id },
        keys.secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @route      get api/users/current
// @desc       Get current user data
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
