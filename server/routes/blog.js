var express = require('express');
var router = express.Router();
const postController = require('../controller/postController')
const commentController = require ('../controller/commentController')
const userController = require('../controller/userController');
const passport = require('../passport-config');
const multer = require('multer')
// const storage= multer.memoryStorage()
const upload = multer({dest: 'uploads/'})

/*Get All Posts*/
router.get('/posts',postController.posts)

/*GET Specific post*/
router.get('/posts/:postId',postController.post_get);

/*POST new Post *PROTECTED* */
router.post('/posts/newPost',upload.single('img'),postController.newPost_post)

/*POST comment*/
router.post('/posts/:postId/comments/newComment',commentController.comment_post)





module.exports = router;