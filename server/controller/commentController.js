const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')

/*POST a comment*/
exports.comment_post = async (req,res,next)=>{
    console.log(req.body)
    const messageAuthor = await User.findById(req.body.user._id).exec()
    const comment=  new Comment({
        message:req.body.message,
        author:messageAuthor,
        date:'27 May 2024'
    })
    await comment.save();
    let postId= req.params.postId;
    const updatedPost= await Post.findByIdAndUpdate(postId, {$push:{comments:comment}},{new:true}).populate('comments')
    res.json(updatedPost)
}