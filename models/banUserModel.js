const mongoose = require("mongoose");

const banUserSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const banUserModel = mongoose.model("banUser", banUserSchema);

module.exports = banUserModel;
