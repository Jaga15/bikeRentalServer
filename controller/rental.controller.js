const express = require("express");
const router = express.Router();
const Rentals = require("../schema/rental.schema.js");

//trycatch block
try
{
  //Get the rental details by id
  router.get("/rentals/:id",
  async (req, res) => {
    const rentals = await Rentals.find({ userId: req.params.id }).populate("bikeId").exec();
    res.status(200).json(rentals);
  });

  //Create a rental detail
  router.post("/rentals", async (req, res) => {
    //console.log(req.body);
    const {pickup_date,drop_date}= req.body;
    const rentals = await Rentals.create({pickup_date,drop_date});
    res.status(201).json(rentals);
  });
}
//Catch block
catch(err)
{
  console.log("Error in Rental Page!");
}
module.exports = router;
