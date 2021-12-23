const express = require("express");
const router = express.Router();

//Bike schema
const Bikes = require("../schema/bike.schema.js");

//trycatch block
try
{
  //Read allbike data from DB
  router.get("/bikes",
  async (req, res) => {
    const bike = await Bikes.find({}).lean().exec();
    res.status(200).json({ data: bike });
  });

  //Read the specific bike details by ID from DB
  router.get("/bikes/:id",
  async (req, res) => {
    const bikeId = req.params.id;
    const bike = await Bikes.findById(bikeId).lean().exec();
    res.status(200).json({ data: bike });
  });
}
//Catch block
catch(err)
{
  console.log("Error in Bike Page!");
}
module.exports = router;
