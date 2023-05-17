const mongoose = require("mongoose");

// Verification token Schema
const VerificationTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Verification token Model
const VerificationToken = mongoose.model(
  "VerificationToken",
  VerificationTokenSchema
);



module.exports = {
  VerificationToken
};
