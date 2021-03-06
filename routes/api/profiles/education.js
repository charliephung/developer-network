const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load model
const Profile = require("./../../../models/Profile");

// load MSG
const MSG = require("../../../message/message");
// load Validation
const validateEducationInput = require("./../../../validation/education");

// Verify
const isVerify = require("../../../middleware/isVerify");

// @route POST api/profiles/educations
// @desc ADD education to profile
// @access Private
router.post(
  "/educations",
  passport.authenticate("jwt", { session: false }),
  isVerify,
  (req, res) => {
    let { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.education = MSG.ERR_PRO_NOTFOUND;
          return res.status(400).json(errors);
        } else {
          const inputEducation = ({
            school,
            degree,
            from,
            fieldofstudy,
            to,
            current,
            description
          } = req.body);

          profile.education.unshift(inputEducation);
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => {
        errors.education = MSG.ERR_OOPS;
        return res.status(500).json(errors);
      });
  }
);
// @route POST api/profiles/education/:education_id
// @desc UPDATE education field
// @access Private
router.post(
  "/educations/:education_id",
  passport.authenticate("jwt", { session: false }),
  isVerify,
  (req, res) => {
    // Validate input
    let { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get input
    const inputEducation = ({
      school,
      degree,
      from,
      fieldofstudy,
      to,
      current,
      description
    } = req.body);
    // Find field to update
    Profile.findOneAndUpdate(
      {
        // Ensure user owner
        user: req.user.id,
        // Find with field match
        "education._id": req.params.education_id
      },
      {
        $set: {
          "education.$": inputEducation
        }
      },
      {
        new: true
      }
    )
      .then(profile => {
        if (!profile) {
          errors.education = MSG.ERR_EDU_NOTFOUND;
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => {
        errors.education = MSG.ERR_OOPS;
        return res.status(500).json(errors);
      });
  }
);
// @route DELETE api/profiles/educations/:education_id
// @desc DELETE 1 education field
// @access Private
router.delete(
  "/educations/:education_id",
  passport.authenticate("jwt", { session: false }),
  isVerify,
  (req, res) => {
    const errors = {};
    // findOneUpdate + { new : true} will return newly modified data
    Profile.findOneAndUpdate(
      {
        // Ensure user owner
        user: req.user.id,
        "education._id": req.params.education_id
      },
      {
        $pull: {
          education: { _id: req.params.education_id }
        }
      },
      {
        new: true
      }
    )
      .populate("user", ["name", "avatar", "email"])
      .then(profile => {
        if (!profile) {
          errors.education = MSG.ERR_EDU_NOTFOUND;
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => {
        errors.education = MSG.ERR_OOPS;
        return res.status(500).json(errors);
      });
  }
);

module.exports = router;
