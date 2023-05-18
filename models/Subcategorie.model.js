const mongoose = require("mongoose");

const subcategorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Subcategorie = mongoose.model("Subcategorie", subcategorieSchema);

module.exports = Subcategorie;
