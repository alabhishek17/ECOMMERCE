
const ProductModel = require("../modles/product")
const ProductList = async(req,res)=>{
    //token validation
    const pageSize=10; //no of iteams per page  //query => pagesize=req.query.pageSize
    const pageNo=1; //the current page no  //query => pageNo=req.query.pageNo
    const miniPrice = req.query.miniPrice || 0;
    const sortBy=req.query.sort==="ASC"?1:-1;   //DESC
    const productList = await ProductModel.find({
        price:{
            $gte:miniPrice,
        },
        isActive:true,  // to delete in lest but show in database
    })
    .sort({price: sortBy})  //1 for ascending, -1 for descending
    .limit(pageSize)
    .skip((pageNo-1) * pageSize)
    res.status(200).json({
        success:true,
        message:"api is get it",
        result:productList,
    })
}

const CreateProduct= async(req,res)=>{
    //todo add product validation
    const newlyInsertedProduct = await ProductModel.create(req.body)
    res.json({
        success:true,
        message:"create api",
        data:newlyInsertedProduct._id,
    })
}

const editProduct = async(req,res)=>{
    const productId = req.params.productId;
    await ProductModel.findByIdAndUpdate(productId,{$set:req.body})
     res.json({
        success:true,
        message:"product edited successfully"
     })
}

const deleteProduct = async(req,res)=>{
    //await ProductModule.findByIdAndDelete(req.params.productId)
    await ProductModel.findByIdAndUpdate(req.params.productId, {
        $set: {isActive:false},
    })
    res.json({
        success:true,
        message:"product delete successfully"
    })
}
const ProductContriller={
    ProductList,
    CreateProduct,
    editProduct,
    deleteProduct,
}
module.exports=ProductContriller;