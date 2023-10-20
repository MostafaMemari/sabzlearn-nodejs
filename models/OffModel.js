const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
      required: true,
    },
    max: {
      type: Number, // => 2
      required: true,
    },
    uses: {
      type: Number, // => 0
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Off", schema);

module.exports = model;
