const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    departmentID: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    departmentSubID: {
      type: mongoose.Types.ObjectId,
      ref: "DepartmentSub",
      required: true,
    },
    priority: {
      type: Number, // 1, 2, 3
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    answer: {
      type: Number, // 0 - 1
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "course",
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "tiket",
      required: false,
    },
    isAnswer: {
      type: Number, // 0 - 1
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("ticket", schema);

module.exports = model;
