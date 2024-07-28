const UserSchema = require("../modles/user")


const Addwishlist=async(req,res)=>{
    //
    // console.log(req.body.productId);

    // TOdo: write your code to validate if req.body.productId belongs to products collection
   await UserSchema.findByIdAndUpdate(req.user._id, {
        $push:{ wishlist: req.body.productId },
    });
    res.json({
        sucess:true,
        message:"product is add to wishlist"
    })
}

const Removewishlist=async(req,res)=>{

    await UserSchema.findByIdAndUpdate(req.user._id,{
        $pull:{wishlist:req.body.productId}
    })
    res.json({
        sucess:true,
        message:"product remove from wishlist"
    })
}

const Getwishlist = async(req,res)=>{

    const wishlist = await UserSchema.findById(req.user._id)
    .populate("wishlist")
    .select("wishlist")  //to asscces praticuler postion
    console.log(wishlist);
    res.json({
        sucess:true,
        message:"get thi wishlist",
        results:wishlist,
    });
}

const wishlistController={
    Addwishlist,
    Removewishlist,
    Getwishlist,
}

module.exports=wishlistController;