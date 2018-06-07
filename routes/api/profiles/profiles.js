const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load routes
const experienceRoute = require("./experience");
const educationRoute = require("./education");

// load model
const User = require("./../../../models/User")
const Profile = require("./../../../models/Profile");

// load MSG
const MSG = require("../../../message/message");

// load Validation
const validateProfileInput = require("./../../../validation/profile");

// @route GET api/profiles/all
// @desc GET all users profile
// @access Public
router.get("/all", (req, res) => {
    Profile.find()
        // populate(" name of the collection but in singular form ", [ fields ])
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = MSG.ERR_PRO_NOTFOUND;
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => {
            errors.noprofile = MSG.ERR_PRO_NOTFOUND;
            res.status(404).json(errors)
        });
});
// @route GET api/profiles/handle/:handle
// @desc GET user profile by handle
// @access Public
router.get("/handle/:handle", (req, res) => {
    let errors = {};
    Profile.findOne({ handle: req.params.handle })
        // populate(" name of the collection but in singular form ", [ fields ])
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = MSG.ERR_PRO_NOTFOUND;
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => {
            errors.noprofile = MSG.ERR_PRO_NOTFOUND;
            res.status(404).json(errors)
        });
});
// @route GET api/profiles/user/:user_id
// @desc GET user profile by user_id
// @access Public
router.get("/user/:user_id", (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.params.user_id })
        // populate(" name of the collection but in singular form ", [ fields ])
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = MSG.ERR_PRO_NOTFOUND;
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => {
            errors.noprofile = MSG.ERR_PRO_NOTFOUND;
            res.status(404).json(errors)
        });
});
// @route GET api/profiles/
// @desc GET user profile
// @access Private require jwt
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
        // populate(" name of the collection but in singular form ", [ fields ])
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = MSG.ERR_PRO_NOTFOUND;
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(error => res.status(404).json(error));
});
// @route POST api/profiles/
// @desc CREATE or EDIT user profile
// @access Private require jwt
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    // Error object
    let { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    const {
        handle, company, website,
        location, bio, status,
        github, skills, youtube,
        instagram, facebook, twitter,
        linkedin } = req.body;


    profileFields.user = req.user.id;

    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (github) profileFields.github = github;
    // Skills
    if (typeof skills !== "undefined")
        profileFields.skills = skills.split(',');
    // Social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;

    // Check if profile is already exist
    Profile.findOne({ user: profileFields.user })
        .then(profile => {
            // Update
            if (profile) {
                Profile.findOneAndUpdate(
                    { user: profileFields.user },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            }
            else {
                // Check for exist handle
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = MSG.ERR_HAD_ALREADY;
                            return res.status(400).json(errors);
                        }
                        // Save profile to database
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    })
            }
        })
});

// @route EXPERIENCE
// @desc ADD EDIT DELETE experience fields
// @access Private require jwt
router.use(experienceRoute);

// @route EDUCATION
// @desc ADD EDIT DELETE education fields
// @access Private require jwt
router.use(educationRoute);

module.exports = router;