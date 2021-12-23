const express = require("express");
const app = express();

//DB connection
const connect = require("./DbConfig/dbConnection.js");

//CORS
const cors = require("cors");
app.use(cors());

//env configurtion
require("dotenv").config();

//PORT definition
const port = process.env.PORT || 8080;

//parsing json
app.use(express.json());

//controllers
const userRouter = require("./controller/user.controller");
const bikeRouter = require("./controller/bike.controller");
const rentalRouter = require("./controller/rental.controller");

//Welcome message 
app.get("/", async (req, res) => {
  res.send("Welcome to the server");
});

//routes
app.use("/", userRouter);
app.use("/", bikeRouter);
app.use("/", rentalRouter);

//First target 
async function start() {
  await connect();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

start();
