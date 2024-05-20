const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const passport = require('../passport-config')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')



exports.signup_post = [
    //validate and sanitize data
    body('name', 'Name must be at least 3 characters')
        .trim()
        .isLength({ min: 3 })
        .notEmpty()
        .escape(),
    body('lastName', 'Last Name must be at least 3 characters')
        .trim()
        .isLength({ min: 3 })
        .notEmpty()
        .escape(),
    body('email', 'Insert a valid email with the following format info@info.com')
        .trim()
        .isEmail()
        .escape(),
    body('password', 'Password must be at least 4 characters')
        .trim()
        .isLength({ min: 4 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) {
            //encrypt pssw
            //create new User
            const user = new User({
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                is_pro: req.body.is_pro,
                admin: req.body.admin
            })
            await user.save()
            res.json({ message: 'User Created' })
        } else {
            //set response to 400 in case datas are not valid
            res.status(400).json({ validationErrors })
        }
    })


]

/*get login*/
exports.login_get = (req, res, next) => {
    res.json({ message: 'Welcome to login' })
}
/*post login*/
exports.login_post = [
    passport.authenticate('local', { session: false, failureRedirect: '/blog/login', failureMessage: true }),
    (req, res, next) => {
        jwt.sign({ id: req.user._id }, 'secret', (err, token) => {
            if (err) {
                next(err)
            }
            res.json({ token })
        })
    }
]
