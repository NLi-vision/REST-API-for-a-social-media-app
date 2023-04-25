var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
    }],
    replies: [{
        type: mongoose.Types.ObjectId,
        ref: "Reply",
        required: true,
    }],
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "Like",
        required: true,
    }],
});

module.exports = mongoose.model("User", userSchema);