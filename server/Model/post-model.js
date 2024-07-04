const {Schema, model} = require("mongoose");


const createPost = new Schema({
    user_id:{type:String,required:true},
    user_name:{type:String,required:true},
    content:{type:String,required:true},
    likes:{type:Number,required:true},
});

const Post = new model("Post", createPost);

module.exports=Post;