var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')
const passport = require('../passport-config');

/*Get the user*/
router.get('/',passport.authenticate('jwt', { session: false }),userController.user_get)

module.exports = router;
