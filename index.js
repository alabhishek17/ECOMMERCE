const express = require("express")
const mongoose = require("mongoose");
const authmiddleware = require("../project/middlerware/authmiddlware")
const dotenv = require("dotenv")

const Userrouter= require("../project/routes/user");
const productRouter = require("../project/routes/product")
const wishlistRoute = require("../project/routes/wishlist");
const Orderrouter = require("../project/routes/order")
//env config
dotenv.config();


const app=express()

//middlewares
app.use(express.json());

//DB Connection
mongoose
.connect(process.env.DATABASE_URI)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log("erro to connect DB",err))

//api router
app.use("/api/v1/user",Userrouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/wishlist",wishlistRoute)
app.use("/api/v1/order",authmiddleware, Orderrouter)
app.listen(40000,()=>console.log(`server is connected succesfully with port 40000`))