const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const UserSchema = require("../modles/user")

const signup= async (req,res)=>{
    // console.log(req.body);
    //todo:validation

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password,salt)
    console.log(req.body.password);
    console.log(hashedPassword);
    
    const newlyInsertedUser = await UserSchema.create(
       { ...req.body,
        password:hashedPassword,
        role:"SELLER",
       })
    console.log(newlyInsertedUser._id);
    res.json({
        sucess:true,
        message:"registion completed login place"
    })
}

const login= async (req,res)=>{
    const user = await UserSchema.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({
            success:false,
            message:"invalid email id"
        })
    }
       console.log("dtatbase stored password", user.password);
        console.log("user enterd password", req.body.password);    
       
       const isPasswordSame= await bcrypt.compare(req.body.password, user.password)
       console.log(isPasswordSame);
          if(!isPasswordSame){
        return res.status(404).json({
            success:false,
            message:"invalid password"
        })
    }
   
    //save token in DB
    // const token = uuidv4();
    const currentTimeInSecond=Math.floor(new Date().getTime()/1000);
    const expiryTimeInSecond = currentTimeInSecond+3600; //1hr from now
    const jwtPayload={
        userId:user._id,
        role:user.role,
        mobilNo:user.mobailNo,
        exp:expiryTimeInSecond,
    }
    const token = jwt.sign(jwtPayload,"MY_SERCTE_KEY")

    await UserSchema.findByIdAndUpdate(user._id,{$set:{token}})
    res.json({
        sucess:true,
        message:"api is get",
        token:token
    })
}


const Usercontrollers={
    login,
    signup
}

module.exports = Usercontrollers;