const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateFileInput(data) {
  // data here is our req.file on image upload
  let errors = {};

  // data.filename = !isEmpty(data.filename) ? data.filename : "";

  // if (Validator.isEmpty(data.filename)) {
  //   errors.filename = "You must select a file to upload a file";
  // }

  if (!Validator.isLength(data.title, { min: 0, max: 100 })) {
    errors.title = "title can't be more than 40 characters";
  }

  if (!Validator.isLength(data.notes, { min: 0, max: 280 })) {
    errors.notes = "notes should be less than 280 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
