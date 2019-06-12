const router = require("express").Router();
// const crypto = require("crypto");
// const path = require("path");
const passport = require("passport");
const multer = require("multer");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");

const keys = require("../../config/db/keys");

// import file validator
const validateFileInput = require("../../validation/files");

// Image model
const Image = require("../../models/Image");
const User = require("../../models/User");

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

// @route      GET /api/files/test
// @desc       Tests files route
// @access     Public
router.get("/test", (req, res) => res.json({ msg: "Files Route Connected" }));

// @route      GET /api/files
// @desc       Gets all files from db
// @access     Public
router.get("/", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    return res.json(files);
  });
});

// @route      GET /api/files/:filename
// @desc       View one specific image
// @access     Public
router.get("/:filename", (req, res) => {
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

// @route      POST /api/files/upload
// @desc       Posts or edits files
// @access     Private
router.post(
  "/upload",
  upload,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateFileInput(req.body);

    // check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (req.user && req.file) {
      const { _id, email } = req.user;
      const { filename, contentType, uploadDate, id } = req.file;
      const { title, notes, public } = req.body;

      Image.findOne({ id }).then(img => {
        const newImg = new Image({
          uploadedBy: _id,
          filename: filename,
          file_id: id,
          file_type: contentType,
          img_title: title,
          img_notes: notes,
          public: public,
          uploadDate: uploadDate
        });
        newImg
          .save()
          .then(img => {
            User.findOneAndUpdate(
              { email: email },
              { $push: { stock: img } },
              (err, doc) => {
                if (err) {
                  return console.log(err);
                } else {
                  return res.json({
                    success: true,
                    msg: "file posted!",
                    file: req.file,
                    image: img
                  });
                }
              }
            );
          })
          .catch(err => console.log(err));
      });
    } else {
      res.send({ success: false });
    }
  }
);

// @route      PUT /api/files/:id
// @desc       Edit one specific image
// @access     Private
// router.put("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
//   Image.findOneAndUpdate({file_id: req.params.id}, {})
// })

// @route      DELETE /api/files/delete/:id
// @desc       Delete one specific image
// @access     Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;

    // remove from user's stock
    User.findOneAndUpdate(
      { _id: userId },
      { $pull: { stock: { file_id: req.params.id } } },
      (err, doc) => {
        if (err) {
          return console.log(err);
        }
      }
    );
    // remove from images collection
    Image.findOneAndDelete({ file_id: req.params.id }, (err, doc) => {
      if (err) {
        return console.log(err);
      }
    });
    // remove from gridfs
    gfs.remove({ _id: req.params.id, root: "files" }, (err, gridStore) => {
      if (err) return res.status(500).json({ success: false });
      return res.json({
        success: true,
        msg: "file deleted!",
        files: gridStore
      });
    });
  }
);

module.exports = router;
