// routes related to users/artists go in this file

// dependencies
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const keys = require("../../config/db/keys");
// const ensureAuthenticated = require("../../config/passport/auth");

// get db models / collections
const Image = require("../../models/Image");

// const mongoURI = process.env.MONGODB_URI;

// create Mongo connection
const conn = mongoose.createConnection(keys.mongoURI);

// Initialize GridFS Stream
let gfs;

conn.once("open", () => {
  // initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route      POST api/images
// @desc       Tests upload route
// @access     Private
router.post("/", (req, res) => {
  res.send("api/images connected!");
});

// @route      POST api/images/upload
// @desc       Upload image
// @access     Private
router.post("/upload", (req, res) => {});

// @route      GET api/images/all
// @desc       display all image data
// @access     Public
router.get("/all", (req, res) => {});

// @route      get api/images/filename
// @desc       Get single image data
// @access     Public
router.get("/file", (req, res) => {});

module.exports = router;

// logout

// deleteAccount
