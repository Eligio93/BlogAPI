const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    message: { type: String, required: true },
    date: { type: Date, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Comment', CommentSchema)