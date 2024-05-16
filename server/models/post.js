const mongoose = require ('mongoose');
const Schema= mongoose.Schema;

const PostSchema= new Schema({
    title:{type:String, required:true},
    date:{type:String, required:true},
    body_text:{type:String,required:true},
    comments:[{type:Schema.Types.ObjectId, ref:'Comment', required:true}],
    author:{type:Schema.Types.ObjectId, ref:'User', required:true},
    published:{type:Boolean, required:true}
})

PostSchema.virtual('url').get(function(){
    return `/blog/posts/${this._id}`
})