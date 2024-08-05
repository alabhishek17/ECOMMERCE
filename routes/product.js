const express = require("express")
const UserSchema = require("../modles/user")

const ProductContriller = require("../controllers/product")

const authmiddleware = require("../middlerware/authMiddleware")
const roleMiddleware = require("../middlerware/rolemiddlware")

const productRouter=express.Router()

productRouter.get("/list",authmiddleware,ProductContriller.ProductList)


productRouter.post("/create",authmiddleware, roleMiddleware(["SELLER","ADMIN"]), ProductContriller.CreateProduct)

productRouter.post("/edit/:productId",authmiddleware,roleMiddleware(["SELLER","ADMIN"]),ProductContriller.editProduct)

productRouter.delete("/delete/:productId",authmiddleware,roleMiddleware(["SELLER","ADMIN"]),ProductContriller.deleteProduct)
module.exports=productRouter;