const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("config");
const path = require("path");

const app = express();

// bodyParser middleware
app.use(express.json());

//DB Config
// need to add process env
const db = config.get("mongoURI");
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} else {
  // connect to MongoDB
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
}

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport/passport")(passport);

// use routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/files", require("./routes/api/files"));

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
