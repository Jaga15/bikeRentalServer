const mongoose = require("mongoose");

//Schema for rent
const rentalsSchema = mongoose.Schema({
  bikeId: { type: mongoose.Schema.Types.ObjectId, ref: "bikes" },
  userId: String,
  pickup_date: Date,
  drop_date: Date,
},{versionKey: false});

module.exports = mongoose.model("rentals", rentalsSchema);
