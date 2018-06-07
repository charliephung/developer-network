const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load model
const Profile = require("./../../../models/Profile");

// load MSG
const MSG = require("../../../message/message");
// load Validation
const validateExperienceInput = require("./../../../validation/experience");

// @route POST api/profiles/experience
// @desc ADD experience to profile
// @access Private
router.post("/experience", passport.authenticate("jwt", { session: false }), (req, res) => {
    let { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.profile = MSG.ERR_PRO_NOTFOUND;
                return res.status(404).json(errors);
            } else {
                const inputExperience = {
                    title, company, location,
                    from, to, current,
                    description
                } = req.body;

                profile.experience.unshift(inputExperience);
                profile.save().then(profile => res.json(profile));
            }
        })
        .catch(err => {
            errors.profile = MSG.ERR_OOPS;
            json.status(400).json(errors)
        })

});
// @route POST api/profiles/experience/:experience_id
// @desc UPDATE experience field
// @access Private
router.post("/experience/:experience_id", passport.authenticate("jwt", { session: false }), (req, res) => {
    let { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const inputExperience = {
        title, company, location,
        from, to, current,
        description
    } = req.body;

    Profile.findOneAndUpdate(
        {
            user: req.user.id,
            "experience._id": req.params.experience_id
        },
        {
            $set: {
                "experience.$": inputExperience
            }
        },
        {
            new: true
        }
    )
        .then(profile => {
            if (!profile) {
                errors.experience = MSG.ERR_EXP_NOTFOUND;
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => {
            errors.experience = MSG.ERR_OOPS;
            return res.status(400).json(errors);
        });
});
// @route DELETE api/profiles/experience/:experience_id
// @desc DELETE 1 experience field
// @access Private
router.delete("/experience/:experience_id", passport.authenticate("jwt", { session: false }), (req, res) => {
    const errors = {};
    // findOneUpdate + { new : true} will return newly modified data
    Profile.findOneAndUpdate(
        {
            user: req.user.id,
            "experience._id": req.params.experience_id
        },
        {
            $pull: {
                "experience": { _id: req.params.experience_id }
            }
        },
        {
            new: true
        })
        .then(profile => {
            if (!profile) {
                errors.experience = MSG.ERR_EXP_NOTFOUND;
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => {
            errors.experience = MSG.ERR_OOPS;
            return res.status(400).json(errors);
        });

});


module.exports = router;