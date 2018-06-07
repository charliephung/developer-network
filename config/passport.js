const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("./../models/User");
const config = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

// This will run when using middleware: 
// passport.authenticate("jwt", { session: false })
// Extract token from header then find user associated with this token
// then return user if found
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            // find user associate with this token
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        // user can be access in req.user
                        return done(null, user);
                    }
                    return done(null, false);
                }).catch(err => console.log(err))
        })
    );
}