const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config();

///---SETUP LOCAL STRATEGY FOR AUTHENTICATION---///
passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect Email' })
            };
            const matchPassword = await bcrypt.compare(password, user.password)
            if (!matchPassword) {
                return done(null, false, { message: 'Incorrect Password' })
            };
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    }

    )
)
///--SET UP JWT STRATEGY FOR JWT ASSIGNMENT---///
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findOne({ id: jwt_payload.sub });
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (err) {
        return done(err, false)
    }
}))


/// DONT CREATE SERIALIZATION AS THERE S NO SESSION WITH JWT///

// passport.serializeUser((user, done) => {
//     return done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         return done(null, user);
//     } catch (err) {
//         return done(err);
//     };
// });

module.exports = passport