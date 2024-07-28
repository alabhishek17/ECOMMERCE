
const ProductModel = require("../modles/product")
const OrderModel = require("../modles/order");
const placeOrder = async(req,res)=>{

    //1. check if the items are in stock
    const productId = req.body.items.map((product)=>product.product);
    const productlist = await ProductModel.find({_id: productId})
    // console.log(productlist);

    const productsareinStock= req.body.items.every(
        (p)=>productlist.find((product)=>product._id == p.product).stock >= p.qty 
    );
   
   if(!productsareinStock){
    return res.status(400).json({
        success:false,
        message:"out of stack"
    })
   }

   //calculate total amount

   let totalAmount = productlist.reduce((total,product)=>{
   const productQty = req.body.items.find((p) => p.product == product._id).qty;
   return total + product.price * productQty
   },0)
    
   if(totalAmount < 500){
    totalAmount += 50;   //Delivery charges
   }

   //order mathod
   if(req.body.modeofPayment === "ONLINE"){
    //redirect into payment gateway
   }

   const orderDetails = {
    items: req.body.items,
    totalAmount: totalAmount,
    deliveryAddress: req.body.deliveryAddress,
    billingAddress: req.body.deliveryAddress,
    modeofPayment: req.body.modeofPayment,
    orderStatus: "PENDING",
    user: req.user. _id,
   };
   console.log(orderDetails);
   const {_id} = await OrderModel.create(orderDetails)
   
   //todo: send an email with order confirmation

   //to decres the product from stock
   req.body.items.forEach(async (product)=>{
    await ProductModel.findByIdAndUpdate(product.product,{
        $inc: {stock: -product.qty},       //inc
    })
   })
   
   res.json({
        success:true,
        message:"order is placed",
        data: _id,
    })
}

const Ordercontroller = {
    placeOrder
}

module.exports=Ordercontroller;