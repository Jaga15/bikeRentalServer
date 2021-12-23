const mongoose = require("mongoose");

//Schema for a bike
const bikeSchema = new mongoose.Schema({
  bikeName: String,
  bikeImage: String,
  bikecc: String,
  rate: Number,
  limit: Number,
});

module.exports = mongoose.model("bikes", bikeSchema);
