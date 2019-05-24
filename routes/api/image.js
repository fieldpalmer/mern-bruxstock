const router = require("express").Router();
// const crypto = require("crypto");
// const path = require("path");
const passport = require("passport");
const multer = require("multer");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");

const keys = require("../../config/db/keys");

// Image model
// const Image = require("../../models/Image");

// set up connection to db for file storage
const mongoUri = keys.mongoURI;
const conn = mongoose.createConnection(mongoUri);

// initialize gfs stream
Grid.mongo = mongoose.mongo;
let gfs;
conn.once("open", function() {
  gfs = Grid(conn.db);
  gfs.collection("files");
});

// set up storage engine
const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "files"
    };
  }
});
const upload = multer({ storage: storage }).single("file");

// test route
router.get("/", (req, res) => {
  res.json("api/image works!");
});

// test passport route
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

router.get("/files/:filename", (req, res) => {
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(400).json({
        msg: "Could not find file"
      });
    }

    let readstream = gfs.createReadStream({
      filename: files[0].filename
    });
    res.set("Content-Type", files[0].contentType);
    return readstream.pipe(res);
  });
});

router.get(
  "/files",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    gfs.files.find().toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          message: "Could not find files"
        });
      }
      return res.json(files);
    });
  }
);

router.post("/files", upload, (req, res) => {
  if (req.file) {
    return res.json({
      success: true,
      msg: "file posted?",
      file: req.file
    });
  }
  res.send({ success: false });
});

router.delete("/files/:id", (req, res) => {
  gfs.remove({ _id: req.params.id }, err => {
    if (err) return res.status(500).json({ success: false });
    return res.json({ success: true });
  });
});

module.exports = router;
