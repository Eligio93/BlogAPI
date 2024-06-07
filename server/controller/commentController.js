const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler')

/*GET COMMENTS for a specific post*/
exports.comments_get = async (req, res, next) => {
    const postId = req.params.postId;
    const comments = await Comment.find({})
}

/*POST a comment*/
exports.comment_post = [
    body('comment-input')
        .trim()
        .escape(),
    asyncHandler(async (req, res, next) => {
        const validationErrors = validationResult(req)
        if (validationErrors.isEmpty()) {
            const messageAuthor = await User.findById(req.body.user._id).exec()
            const comment = new Comment({
                message: req.body.message,
                author: messageAuthor,
                date: new Date()
            })
            await comment.save();
            let postId = req.params.postId;
            const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { comments: comment } }, { new: true }).populate('comments')
            res.json(comment)
        } else {
            res.statusCode(400).json({ validationErrors })
        }
    })

]