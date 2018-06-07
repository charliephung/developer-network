const mongoose = require("mongoose");
const { Schema } = mongoose;

const postCommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  comment: {
    type: String,
    require: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = PostComment = mongoose.model(
  "postcomments",
  postCommentSchema
);
