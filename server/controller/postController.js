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
    let posts = await Post.find({});
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
exports.newPost_post = asyncHandler(async (req, res, next) => {
    // here you have req.body containing all datas and req.file containing the image
    try {
        let result = await cloudinary.uploader.upload(req.file.path);
        let imgUrl=result.secure_url
        const post = new Post({
            title:req.body.title,
            date: '30/05/2024',
            description:req.body.description,
            body_text: req.body.body,
            comments: [],
            author: req.body.author,
            published: req.body.published,
            featured: req.body.featured,
            img:imgUrl
        })
        await post.save()
    res.json({ message: 'Post Created' })
    } catch (err) {
        res.json(err.message)
    }
})
