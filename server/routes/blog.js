var express = require('express');
var router = express.Router();
const postController = require('../controller/postController')
const userController = require('../controller/userController');
const passport = require('../passport-config');

/*Get All Posts*/
router.get('/posts',postController.posts)









module.exports = router;