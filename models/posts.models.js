const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: String,
  address: String,
  photos: [String],
  description: String,
  extraInfo: String,
  price: Number,
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
