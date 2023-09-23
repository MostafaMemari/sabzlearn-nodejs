const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    free: {
      type: Number,
      required: true,
    },
    video: {
      type: String,
      reqiored: true,
    },
    courseID: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
  },
  { timestamps: true }
);
const sessionModel = mongoose.model("session", sessionSchema);

module.exports = sessionModel;
