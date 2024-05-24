var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')
const passport = require('../passport-config');

/*Get the user*/
router.get('/',passport.authenticate('jwt', { session: false }),userController.user_get)

/*Post Login*/
router.post('/login', userController.login_post)

/*Post SignUp*/
router.post('/signup', userController.signup_post)

module.exports = router;
