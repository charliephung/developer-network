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
const gravatar = require("gravatar");

// Hash password
const bcrypt = require("bcryptjs");

// Generate hashstring
const seedId = () => {
  return Math.floor(Math.random() * 0x1000000).toString(16);
};
const generateId = () => {
  return seedId() + seedId() + seedId() + seedId() + seedId() + seedId();
};

// mailing
// DB config
const mail = require("../../../config/keys").MAIL;
const pass = require("../../../config/keys").MAIL_PASS;
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mail,
    pass: pass
  }
});

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
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      // Check for avatar
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      // Create new user
      const hashString = generateId();
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        hash: hashString
      });
      // Hasing password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          // Save to db
          newUser
            .save()
            .then(user => {
              // Send verify email
              const mailOptions = {
                from: "developernetwork2018@gmail.com",
                to: newUser.email.toString(),
                subject: "Verify code",
                text: newUser.hash.toString()
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return res.status(400).json(error);
                } else {
                  return res.json({ msg: "Email sent" });
                }
              });

              return res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    } else {
      errors.email = "Email is already taken";
      return res.status(400).json(errors);
    }
  });
});

// Validation
const validateLoginInput = require("./../../../validation/login");

// @route GET api/user/login
// @desc login account
// @access Public
router.post("/login", (req, res) => {
  let { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found!";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          verify: user.verify
        };
        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 3600 * 24 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect!";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/user/current
// @desc return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, name, email, avatar, date } = req.user;
    res.json({ _id, name, email, avatar, date });
  }
);

// @route GET api/user/verify/:hash
// @desc activate user account
// @access Private
router.post(
  "/sentcode",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      const mailOptions = {
        from: "developernetwork2018@gmail.com",
        to: req.user.email.toString(),
        subject: "Verify code",
        text: user.hash.toString()
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(400).json(error);
        } else {
          return res.json({ msg: "Email sent" });
        }
      });
    });
  }
);

// @route GET api/user/verify/:hash
// @desc activate user account
// @access Private
router.post(
  "/verify/:hash_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      // Check verify code
      if (req.params.hash_id.toString() === user.hash) {
        user.verify = true;

        user
          .save()
          .then(() => {
            return res.json({ msg: "Verify success" });
          })
          .catch(err => {
            console.log(err);

            return res
              .status(500)
              .json({ msg: "Oop somthing bad happen, Please try again!" });
          });
      } else {
        return res.status(400).json({ msg: "Verify code not match" });
      }
    });
  }
);

module.exports = router;
