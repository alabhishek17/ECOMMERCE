const exprees = require("express")
const Ordercontroller = require("../controllers/order")
const Orderrouter = exprees.Router();
 Orderrouter.post("/",Ordercontroller.placeOrder)

 module.exports=Orderrouter