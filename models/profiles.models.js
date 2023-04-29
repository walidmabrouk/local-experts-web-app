const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfile = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    category: "string",
    tel: "string",
    city: "string",
    bio: "string",
    postalcode: "string",
    address: "string",
    price: Number,
    extraInfo: "string",
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profiles", UserProfile);
