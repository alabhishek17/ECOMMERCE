const exprees = require("express")
const wishlistController = require("../controllers/wishlist")
const wishlistRoute=exprees.Router();
const authmiddleware = require("../middlerware/authMiddleware")

wishlistRoute.get("/",authmiddleware,wishlistController.Getwishlist)
wishlistRoute.post("/add",authmiddleware, wishlistController.Addwishlist)
wishlistRoute.post("/remove",authmiddleware, wishlistController.Removewishlist)

module.exports=wishlistRoute