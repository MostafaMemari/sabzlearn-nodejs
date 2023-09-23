const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});

const categorieModel = mongoose.model("categorie", categorieSchema);

module.exports = categorieModel;
