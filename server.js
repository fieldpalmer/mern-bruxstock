const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("config");
const path = require("path");
const cors = require("cors");

const app = express();

/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) {
  //allow cross origin requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// bodyParser middleware
app.use(express.json());

// cors config
const corsOptions = {
  origin: "*",
  originSuccessStatus: 200
};
app.use(cors(corsOptions));

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
