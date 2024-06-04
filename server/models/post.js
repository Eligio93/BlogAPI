const mongoose = require ('mongoose');
const Schema= mongoose.Schema;

const PostSchema= new Schema({
    title:{type:String, required:true},
    date:{type:String, required:true},
    description:{type:String, required:true},
    body_text:{type:String,required:true},
    comments:[{type:Schema.Types.ObjectId, ref:'Comment'}],
    author:/*{type:Schema.Types.ObjectId, ref:'User'},*/ {type:String, required:true},
    published:{type:Boolean, required:true},
    featured:{type:Boolean, required:true},
    img:{type:String, required:true}
})

PostSchema.virtual('url').get(function(){
    return `/blog/posts/${this._id}`
})

module.exports = mongoose.model('Post', PostSchema)