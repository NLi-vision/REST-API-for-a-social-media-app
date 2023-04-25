var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Like", likeSchema);