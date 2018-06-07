const Validator = require("validator");
const isEmpty = require("./isEmpty");


module.exports = function validatePostInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.text = !isEmpty(data.text) ? data.text : "";

    if (Validator.isEmpty(data.title)) { errors.title = "Title is required"; }
    if (Validator.isEmpty(data.text)) { errors.text = "Text is required"; }

    if (!Validator.isLength(data.title, { min: 2, max: 100 })) { errors.title = "Title must be between 2 and 100 characters"; }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}