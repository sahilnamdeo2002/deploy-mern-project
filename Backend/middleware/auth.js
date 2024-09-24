
// const JWT_SECRET="mySuperSecretKey";
// const JWT_EXPIRE = "5d";
// const COOKIE_EXPIRE="5";
require('dotenv').config();

const user = require("../models/usermodels");
const Errorhandler = require("../utils/errorhandler");
const catchasyncerror = require("./catchasyncerror");
const jwt=require("jsonwebtoken")

exports.isAuthenticated=catchasyncerror(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new Errorhandler("please login to access ",401));
    }
    const JWT_SECRET="mySuperSecretKey";
    const decodedDate=jwt.verify(token,JWT_SECRET);
   req.user= await user.findById(decodedDate.id);
next();
}); 


exports.autorizerole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
         return next(   new Errorhandler(`Role: ${req.user.role} is  not allowed to access this resoruce`
                , 403
            )
        );
            
    
    }

    next();
};
};