const router = require("express").Router();
const crypto = require("crypto");
const path = require("path");
const passport = require("passport");
const multer = require("multer");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");

const keys = require("../../config/db/keys");

// import file validator
// const validateFileInput = require("../../validation/files");

// User model
const User = require("../../models/User");
// Image model
const Image = require("../../models/Image");

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

// set up storage engine v1 (broken)
const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          bucketName: "files",
          filename: filename
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage: storage }).single("file");

// @route      GET /api/files
// @desc       Gets all public files from db
// @access     Public
router.get("/", (req, res) => {
  Image.find((err, images) => {
    let publicImgArray = [];
    images.map(img => {
      if (img.view === "public") {
        publicImgArray.push(img);
      }
    });
    return res.json(publicImgArray);
  });
});

// @route      GET /api/files/categories
// @desc       Gets all categories from files in db
// @access     Public
router.get("/categories", (req, res) => {
  Image.find((err, images) => {
    let allCategories = [];
    images.forEach(img => {
      allCategories.push(img.category);
    });
    let catArry = Array.from(new Set(allCategories));
    return res.json(catArry);
  });
});

// @route      GET /api/files/category/:cat
// @desc       Gets public files by category
// @access     Public
router.get("/category/:cat", (req, res) => {
  let categoryImgArray = [];
  Image.find((err, images) => {
    images.map(img => {
      if (img.category === req.params.cat) {
        categoryImgArray.push(img);
      }
    });
    return res.json(categoryImgArray);
  });
});

// @route      GET /api/files/:userid
// @desc       Gets public files by user
// @access     Public
router.get("/user/:_id", (req, res) => {
  let userImgArray = [];
  Image.find((err, images) => {
    images.map(img => {
      if (img.uploadedBy === req.params._id && img.view === "public") {
        userImgArray.push(img);
      }
    });
    return res.json(userImgArray);
  });
});

// @route      GET /api/files/:_id
// @desc       Gets public & private images by user
// @access     Private
router.get(
  "/user/private/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let userImgArray = [];
    Image.find((err, images) => {
      images.map(img => {
        if (img.uploadedBy === req.params._id) {
          userImgArray.push(img);
        }
      });
      return res.json(userImgArray);
    });
  }
);

// @route      GET /api/files/:filename
// @desc       View Image
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
  // this is the file being sent to GFS
  upload,
  (req, res) => {
    let reqBodyParsed = JSON.parse(req.body.body);
    const { title, uploadedBy, notes, category, view } = reqBodyParsed;
    const { id, filename, uploadDate, contentType } = req.file;

    // creating image object
    const newImg = new Image({
      gfsId: id,
      uploadedBy: uploadedBy,
      uploadDate: uploadDate,
      filename: filename,
      type: contentType,
      category: category,
      title: title,
      notes: notes,
      view: view
    });

    Image.findOne({ id }).then(img => {
      newImg.save().then(img => {
        User.findOneAndUpdate(
          { _id: uploadedBy },
          { $push: { stock: img.gfsId } },
          (err, doc) => {
            if (err) {
              return console.log(err);
            }
            return res.json({
              success: true,
              msg: "file posted!",
              doc: doc
            });
          }
        );
      });
    });
  }
);

// @route      DELETE /api/files/delete/:id
// @desc       Delete one specific image
// @access     Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    const userId = req.user._id;
    const gfsId = req.params.id;
    // remove from Images collection
    Image.deleteOne({ gfsId: gfsId }).then(() => {
      // remove from user's stock
      User.findOneAndUpdate(
        { _id: userId },
        { $pull: { stock: { file_id: req.params.id } } },
        () => {
          // remove from gridfs (WORKS)
          gfs.remove(
            { _id: req.params.id, root: "files" },
            (err, gridStore) => {
              if (err) return res.status(500).json({ success: false });
              return res.json({
                success: true,
                msg: "file deleted!",
                files: gridStore
              });
            }
          );
        }
      );
    });
  }
);

module.exports = router;
