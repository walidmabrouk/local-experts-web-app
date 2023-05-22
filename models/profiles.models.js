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
    rating: Number,
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "profiles",
      },
    ],
    bio: "string",
    profilePhoto: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    Localisation: Object,
    postalcode: "string",
    address: "string",
    price: Number,
    extraInfo: "string",
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
UserProfile.virtual("reservations", {
  ref: "Reservation",
  foreignField: "professionalId",
  localField: "_id",
});
UserProfile.virtual("reviews", {
  ref: "Review",
  foreignField: "professionalId",
  localField: "_id",
});

module.exports = mongoose.model("profiles", UserProfile);
