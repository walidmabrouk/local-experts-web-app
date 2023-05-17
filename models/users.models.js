const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    role: "string",
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Populate Posts That Belongs To This User When he/she Get his/her Profile
UserModel.virtual("posts", {
  ref: "PostModel",
  foreignField: "user",
  localField: "_id",
});

module.exports = mongoose.model("users", UserModel);
