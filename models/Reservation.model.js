const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  title: String,
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "profiles",
    required: true,
  },
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: "profiles",
    required: true,
  },
  status: {
    type: String,
    default: "pending"
  },
});


module.exports = mongoose.model("Reservation", reservationSchema);
