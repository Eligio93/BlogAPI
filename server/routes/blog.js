var express = require('express');
var router = express.Router();
const postController = require ('../controller/postController')

/* GET  blog home page. */
router.get('/', function(req, res, next) {
  res.json({message:'Welcome to my blog'});
});

router.get('/newPost',function(req,res,next){
  res.json({message:'Get Form to create a post'})
})
router.post('/newPost',postController.newPost_post)
module.exports = router;
