// dependencies
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// routes
const users = require("./routes/users.js");
const images = require("./routes/images.js");

// db config
const db = require("./config/keys").MongoURI;
// const db = process.env.MONGODB_URI;

// connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

const app = express();

// Method Override
app.use(methodOverride("_method"));

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// app.use(passport.session());

// connect Flash
app.use(flash());
// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// ROUTES
app.use("./routes/users.js", users);
app.use("./routes/images.js", images);
// app.use("/gallery", require("./routes/gallery.js"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
