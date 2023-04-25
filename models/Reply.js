var mongoose = require('mongoose');

var replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },

    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Reply", replySchema);