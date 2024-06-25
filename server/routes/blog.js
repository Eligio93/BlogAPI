var express = require('express');
var router = express.Router();
const postController = require('../controller/postController')
const commentController = require ('../controller/commentController')
const userController = require('../controller/userController');
const passport = require('../passport-config');
const multer = require('multer')
const upload = multer({dest: 'uploads/'})




/*-----POST RELATED ROUTES -----*/
/*Get All Posts*/
router.get('/posts',postController.posts)

/*GET Specific post*/
router.get('/posts/:postId',postController.post_get);

/*POST new Post *PROTECTED* */
router.post('/posts/newPost',/*passport.authenticate('jwt', { session: false }),*/upload.single('img'),postController.newPost_post)

/*EDIT POST*/
router.put('/posts/edit/:postId',postController.editPost)

/*DELETE POST*/
router.delete('/posts/delete/:postId',postController.deletePost)


/*-----COMMENTS RELATED ROUTES-----*/

/*POST comment*/
router.post('/posts/:postId/comments/newComment',commentController.comment_post)
/*DELETE comment*/
router.delete('/posts/:postId/comments/delete/:commentId',passport.authenticate('jwt', { session: false }), commentController.comment_delete)






module.exports = router;