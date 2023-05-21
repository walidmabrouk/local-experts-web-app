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
    bio: "string",
    profilePhoto: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      }
    },
    Localisation: Object ,
    postalcode: "string",
    address: "string",
    price: Number,
    extraInfo: "string",
    
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

module.exports = mongoose.model("profiles", UserProfile);
