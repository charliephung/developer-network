const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.career = !isEmpty(data.career) ? data.career : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.website = !isEmpty(data.website) ? data.website : "";
  data.facebook = !isEmpty(data.facebook) ? data.facebook : "";
  data.twitter = !isEmpty(data.twitter) ? data.twitter : "";
  data.instagram = !isEmpty(data.instagram) ? data.instagram : "";
  data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : "";
  data.github = !isEmpty(data.github) ? data.github : "";
  data.youtube = !isEmpty(data.youtube) ? data.youtube : "";

  if (/\s/.test(data.handle))
    errors.handle = "Handle cannot contain any whitespace";
  if (!Validator.isLength(data.handle, { min: 2, max: 40 }))
    errors.handle = "Handle needs to be between 2 and 40 characters";
  if (Validator.isEmpty(data.handle))
    errors.handle = "Handle fields is required";
  if (Validator.isEmpty(data.career))
    errors.career = "career fields is required";
  if (Validator.isEmpty(data.skills))
    errors.skills = "skills fields is required";
  if (!Validator.isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) errors.website = "Not a valid URL";
  }
  if (!Validator.isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) errors.facebook = "Not a valid URL";
  }
  if (!Validator.isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) errors.twitter = "Not a valid URL";
  }
  if (!Validator.isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) errors.instagram = "Not a valid URL";
  }
  if (!Validator.isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) errors.linkedin = "Not a valid URL";
  }
  if (!Validator.isEmpty(data.github)) {
    if (!Validator.isURL(data.github)) errors.github = "Not a valid URL";
  }
  if (!Validator.isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) errors.youtube = "Not a valid URL";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
