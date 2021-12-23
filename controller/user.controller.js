const express = require("express");
const router = express.Router();

//To encrypt the passsword
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//Validations
const { check, validationResult } = require("express-validator");

//User schema
const User = require("../schema/user.schema.js");

//trycatch block
try{

  //Signup route for new user
  router.post("/users/signup",
    [
      //Checking
      check("email", "Invalid Email format").isEmail(),
      check("password","Password should be consist of minimum 8 and maximum 15 characters").isLength({min: 7, max:15 }),
    ],
    //Validation and creation of new user
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
      {
        return res.status(400).json({errors: errors.errors[0].msg });
      }

      let { name, mobile, email, password } = req.body;

      if(await User.findOne({email})) 
      {
        return res.send({message: "User already exists. Please Login!.",});
      }
      else
      {
        password=bcrypt.hashSync(password, saltRounds);
        let user = await User.create({name,mobile,email,password});
        res.status(200).json({ message: "Successfully Created User", userId: user.id });
      }
    }
  );

  //Login route for existing user
  router.post("/users/login", 
  async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({email});
    if (!user) 
    {
      return res.status(406).json({ message: "Invalid User credentials.Please check!",isAuth: false});
    }
    //Decrypt and comparision
    if (!bcrypt.compareSync(password,user.password))
    {
      return res.status(406).json({ message: "Incorrect Password.Please check!",isAuth: false});
    }
    res.status(200).json({ message: "Success", userData: user, isAuth: true });
  });
}
catch(err)
{
  console.log("Error in User Page!");
}

module.exports = router;
