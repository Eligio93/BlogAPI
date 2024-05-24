const Post = require('../models/post')
const asyncHandler = require('express-async-handler')

/*GET all posts*/
exports.posts=asyncHandler(async (req,res,next)=>{
    let posts = await Post.find({published:true});
   res.json(posts)
})





/*POST new post*/
exports.newPost_post=asyncHandler(async (req,res,next)=>{
    const post= new Post({
        title:req.body.title,
        date:req.body.date,
        body_text:req.body.body_text,
        comments:req.body.comments,
        author:req.body.author,
        published:req.body.published
    })
    await post.save()
    res.json({message:'Post Created'})
})