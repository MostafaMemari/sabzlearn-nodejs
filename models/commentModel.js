const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    courseID: {
      type: mongoose.Types.ObjectId,
      ref: "course",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isAccept: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
    },
    isAnswer: {
      type: Number,
      required: true,
    },
    mainCommentID: {
      type: mongoose.Types.ObjectId,
      ref: "comment",
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
