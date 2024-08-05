const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv")

const authmiddlware = require("./middlerware/authMiddleware")
const Userrouter= require("./routes/user");
const productRouter = require("./routes/product")
const wishlistRoute = require("./routes/wishlist");
const Orderrouter = require("./routes/order")
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

app.use("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
//api router
app.use("/api/v1/user",Userrouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/wishlist",wishlistRoute)
app.use("/api/v1/order",authmiddlware, Orderrouter)
app.listen(40000,()=>console.log(`server is connected succesfully with port 40000`))