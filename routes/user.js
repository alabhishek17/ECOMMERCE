const express = require("express")
const Usercontrollers = require("../controllers/user")

const Userrouter=express.Router();

Userrouter.post("/signup",Usercontrollers.signup)
Userrouter.post("/login",Usercontrollers.login)

module.exports=Userrouter