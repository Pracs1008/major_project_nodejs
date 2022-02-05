const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required:true
    },
    //user id of user who made the comment
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // for post id of post on which the comment is being made
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},  {
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;