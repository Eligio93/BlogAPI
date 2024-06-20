const Post = require('../models/post')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
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
    if (post) {
        res.json(post)
    } else {
        res.status(404).json({ message: 'Post not Found' })
    }

})

/*POST new post*/
exports.newPost_post = asyncHandler(async (req, res, next) => {
    // here you have req.body containing all datas and req.file containing the image
    try {
        /*upload img on cloudinary*/
        let result = await cloudinary.uploader.upload(req.file.path);
        let imgUrl = result.secure_url
        const post = new Post({
            title: req.body.title,
            date: new Date(),
            description: req.body.description,
            body_text: req.body.body,
            comments: [],
            author: req.body.author,
            published: req.body.published,
            featured: req.body.featured,
            img: imgUrl
        })
        await post.save()
        res.json({ message: 'Post Created' })
    } catch (err) {
        res.json(err.message)
    }
})



/*EDIT SPECIFIC POST*/
exports.editPost = [
    body('title')
        .trim()
        .notEmpty()
        .escape(),
    body('description')
        .trim()
        .notEmpty()
        .escape(),
    body('published')
        .isBoolean()
        .escape(),
    body('featured')
        .isBoolean()
        .escape(),
    body('body_text')
        .trim()
        .notEmpty()
        .escape(),
    asyncHandler(async (req, res, next) => {
        const validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) {
            try {
                const postId = req.params.postId
                const newPost = await Post.findByIdAndUpdate(postId, { title: req.body.title, body_text: req.body.body_text, published: req.body.published, featured: req.body.featured, description: req.body.description })
            } catch (err) {
                return next(err)
            }
            return res.json({ message: 'Post Updated' })
        } else {
            res.status(400).json({ message: validationErrors.errors[0].msg })
        }
    })


]

/*DELETE POST*/
exports.deletePost = asyncHandler(async (req, res, next) => {
    const postId = req.params.postId
    /*process to get the imgPublicId to delete the Img from CLoudinary*/
    const imgUrl = req.body.img
    const lastSegment = imgUrl.split('/').pop();
    const imgPublicId = lastSegment.split('.').slice(0, -1).join('.');
    try {
        /*delete img from cloudinary*/
        await cloudinary.uploader.destroy(imgPublicId)
        /*delete post from DB*/
        await Post.findByIdAndDelete(postId)
        return res.json({ message: 'Post Deleted' })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})
