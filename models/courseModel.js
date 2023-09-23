const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    support: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    categorieID: {
      type: mongoose.Types.ObjectId,
      ref: "categorie",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.virtual("sessions", {
  ref: "session",
  localField: "_id",
  foreignField: "courseID",
});
modelSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "courseID",
});

const courseModel = mongoose.model("course", modelSchema);

module.exports = courseModel;
