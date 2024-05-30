const Post = require('../models/post')
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
})



/*GET all posts*/
exports.posts = asyncHandler(async (req, res, next) => {
    let posts = await Post.find({ published: true });
    res.json(posts)
})

/*Get Specific post*/
exports.post_get = asyncHandler(async (req, res, next) => {
    let postId = req.params.postId
    let post = await Post.findById(postId).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    })
    res.json(post)
})

/*POST new post*/
exports.newPost_post = async (req, res, next) => {
    console.log(req)
    cloudinary.uploader.upload(req.file.path).then(result => {
        console.log(result)
    })
}
// asyncHandler(async (req, res, next) => {
//     // const post = new Post({
//     //     title: req.body.title,
//     //     date: req.body.date,
//     //     body_text: req.body.body_text,
//     //     comments: req.body.comments,
//     //     author: req.body.author,
//     //     published: req.body.published
//     // })
//     // await post.save()
//     // res.json({ message: 'Post Created' })
//     console.log(req)
// })



