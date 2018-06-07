const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");


// Validation
const validateRegisterInput = require("./../../../validation/register");
// Load User model
const User = require("../../../models/User");

// SecretOrKey
const config = require("./../../../config/keys");

// Gravatar
const gravatar = require("gravatar")

// Hash password
const bcrypt = require("bcryptjs");


// @route GET api/user/register
// @desc register account
// @access Public
router.post("/register", (req, res) => {
    // If input is invalid
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Find exist email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                // Check for avatar
                const avatar = gravatar.url(req.body.email, {
                    s: "200",
                    r: "pg",
                    d: "mm"
                });
                // Create new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                });
                // Hasing password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        // Save to db
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            } else {
                errors.email = "Email is already taken";
                res.json(errors);
            }
        });
});

// Validation
const validateLoginInput = require("./../../../validation/login");

// @route GET api/user/register
// @desc register account
// @access Public
router.post("/login", (req, res) => {
    let { error, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.json(error);
    }

    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                error.email = "User not found!"
                return res.status(404).json(error);
            }
            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(
                            payload,
                            config.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            });
                    } else {
                        error.password = "Password incorrect!";
                        return res.json(error);
                    }
                });
        })

});

// @route GET api/user/current
// @desc return current user
// @access Private
router.get("/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { _id, name, email, avatar, date } = req.user;
        res.json({ _id, name, email, avatar, date });
    });

module.exports = router;