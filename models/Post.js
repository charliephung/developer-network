const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "postcomments"
        }
    ]
});

module.exports = Post = mongoose.model("posts", postSchema);