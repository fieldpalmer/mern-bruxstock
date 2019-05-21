// routes related to images

// dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const keys = require("../../config/db/keys");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

// Image model
const Image = require("../../models/Image");

// set up connection to db for file storage
const mongoUri = keys.mongoURI;
const conn = mongoose.createConnection(mongoUri);

// initialize gfs stream
let gfs;
conn.once("open", () => {
  // initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("files");
});

// set up storage engine
const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, res) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename =
          buf.renderToString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "files"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route      GET api/images/passport
// @desc       Tests images route
// @access     Private
router.get(
  "/passport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json("api/images works!\n" + req.user);
  }
);

// @route      GET api/images/files/:filename
// @desc       get individual file
// @access     Public
router.get("/files/:filename", (req, res) => {
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "Could not find file"
      });
    }
    // res.send(files[0].filename)
    var readstream = gfs.createReadStream({
      filename: files[0].filename
    });
    res.set("Content-Type", files[0].contentType);
    return readstream.pipe(res);
  });
});

// @route      get api/images/files
// @desc       get all file s
// @access     Public
router.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "Could not find files"
      });
    }
    return res.json(files);
  });
});

// @route      POST api/images/files
// @desc       upload individual file
// @access     Private
router.post(
  "/files",
  passport.authenticate("jwt", { session: true }),
  upload.single("file"),
  (req, res) => {
    // getting the info we need for the image model from the post request
    let { file_id, fileName, contentType } = req.file;
    let { img_title, img_notes, public, uploadDate } = req.body;
    let uploadedBy = req.user.id;

    // make sure required properties exist
    if (!file_id || !fileName || !contentType) {
      return res
        .status(400)
        .json({ msg: "can't find necessary image data from req.file" });
    }

    // create new image and send to db
    Image.findOne({ file_id: id }).then(img => {
      if (img) {
        res.status(400).json({ msg: "This image already exists in the db" });
      } else {
        return res.json({
          success: true,
          file: req.file
        });
      }
    });
  }
);

/// @route     DELETE api/images/files/:id
// @desc       delete individual file
// @access     Private
router.delete(
  "/files/:id",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    gfs.remove({ _id: req.params.id }, err => {
      if (err) {
        return res.status(500).json({ success: false });
      }
      return res.json({ success: true });
    });
  }
);

module.exports = router;
