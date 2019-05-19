const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const users = require("./routes/users");
// const images = require("./routes/images");
// const profiles = require("./routes/profiles");

const app = express();

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys.js").mongoURI;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  // connect to MongoDB
  mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
}

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// use routes
app.use("/routes/users", users);
// app.use("/routes/profiles", profiles);
// app.use("/routes/images", images);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
