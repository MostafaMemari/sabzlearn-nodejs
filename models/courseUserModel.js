const mongoose = require("mongoose");

const courseUserSchema = new mongoose.Schema(
  {
    courseID: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const courseUserModel = mongoose.model("courseUser", courseUserSchema);

module.exports = courseUserModel;
