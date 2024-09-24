const Errorhandler=require("../utils/errorhandler")
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "internal server Error"

//wrong mongodb error
if(err.name === "CastError"){
    const message=`resource not found.invalid ${err.path}`;
    err=new Errorhandler(message,400);
}


// mongoose duplicated key error - 
if(err.code === 11000){
    const message=`duplicate ${Object.keys(err.keyValue)} entered`;
    err=new Errorhandler(message,400);
}

// json web token error - 
if(err.code === "jsonwebtokenerror"){
    const message=`json web token expire try again later `;
    err=new Errorhandler(message,400);
}

// jwt web token error - 
if(err.code === "tokenexirederror"){
    const message=`json web token expired try again later `;
    err=new Errorhandler(message,400);
} 

res.status(err.statusCode ).json({
        success:false,
        error:err.message,
    });

};