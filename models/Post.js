var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    replies: [{
        type: mongoose.Types.ObjectId,
        ref: "Reply",
        required: true,
    }],

    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }],
});

module.exports = mongoose.model("Post", postSchema);