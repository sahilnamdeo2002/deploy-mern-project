const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchasyncerror");
const User = require("../models/usermodels");
const Errorhandler = require("../utils/errorhandler");
const sendtoken = require("../utils/jwttoken");
const sendEmail=require("../utils/sendemail");
const crypto  = require("crypto");
const cloudinary=require("cloudinary");



// REGITER USER
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{

    const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    })
    const {name,email,password}=req.body;

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        },
    });
    sendtoken(user,201,res);
});



// LOGIN USER
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
 

    const {email,password} = req.body;
    if(!email || !password){
        return next(new Errorhandler("please enter email and password",400));
    }
    const user=await User.findOne({ email }).select("+password");

    if(!user){
        return next(new Errorhandler("invalid email or password",401));
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new Errorhandler("invalid  email or password",401));
    }
   sendtoken(user,200,res);
});





//LOGOUT -
exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"logged out"
    });
});




// FORGET PASSWORD
exports.forgetpassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHander("user not found",404));
    }
    //get reset password token - 
   const resettoken= user.getresetpasswordtoken()

   await user.save({validBeforeSave : false});
   const resetpasswordurl=`http://localhost:3001/password/reset/${resettoken}`

   const message=`your password reset token is : \n\n ${resetpasswordurl} \n\n if you have req this email then please ignore it .` ;

   try {
    await sendEmail({
        email:user.email,
        subject:"Ecommerce password recovery",
        message
    });
    res.status(200).json({
        success:true,
        message:`email sent to ${user.email} successfully`
    })
   } catch (error) {
    user.resetpasswordurl=undefined;
    user.getresetpasswordexpire=undefined;

    await user.save({validBeforeSave : false});

    return next(new ErrorHander(error.message,500))
    
   }
}) ;


// resetpassword password -
exports.resetpassword=catchAsyncErrors(async(req,res,next)=>{

    // creating token hash 
   const resetPasswordToken=crypto
   .createHash("sha256")
    .update(req.params.token )
    .digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now() },
    });
    if(!user){
        return next(new ErrorHander("reset password token in invalid or has been expire ",400));
    }
    if( req.body.password !== req.body.confirmpassword){

return next(new ErrorHander("password doesnt match ",404));
    }
    user.password= req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    sendtoken(user,200,res);
    });


exports.getuserdetail=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id); // after login
    res.status(200).json({
        success:true,
        user,
    });
});


//update password
exports.updatepassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password"); // after login


    
    const isPasswordMatched=await user.comparePassword(req.body.oldpassword);

    if(!isPasswordMatched){
        return next(new Errorhandler("old password is incorrect ",400));
    }

    if( req.body.newpassword !== req.body.confirmpassword){
     
        return next(new ErrorHander("password doesnt match ",400));
            }

            user.password=req.body.newpassword;
            await user.save();
            sendtoken(user,200,res);
  
});

//update userprofile
exports.updateprofile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };
   if(req.body.avatar !== ""){
    const user=await User.findById(req.user.id);
    const imageId=user.avatar.public_id;

    // delete the old avatar
    await cloudinary.v2.uploader.destroy(imageId);
    
    // upload the new avatar
    const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    });

    newUserData.avatar={
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
    };
   }

    const user=await User.findByIdAndUpdate(req.user.id , newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        
    });
  
});



// get all user (admin)
exports.getalluser=catchAsyncErrors(async(req,res,next)=>{
const users=await User.find();
res.status(200).json({
    success:true,
    users,
})
});


// get single user (admin)
exports.getsingleuser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHander(`user doesnot existwith id  ${req.params.id}`,400));
    }
    res.status(200).json({
        success:true,
        user,
    })
    });


// update role -
    exports.updaterole=catchAsyncErrors(async(req,res,next)=>{
        const newuserdata={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
        };
    
    await User.findByIdAndUpdate(req.params.id , newuserdata,{
            new:true,
            runValidators:true,
            userFindAndModify:false,
        });
        res.status(200).json({
            success:true,
        });
      
    });
    

    // delete user role -
    exports.deleteuser=catchAsyncErrors(async(req,res,next)=>{
   
        const user=await User.findById(req.params.id);




        if(!user){
            return next(new ErrorHander(`user doesnot existwith id  ${req.params.id}`,400));

        }

        const imageId=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        await user.remove();



        res.status(200).json({
            success:true,
            message:"user deleted successfully."
        });
      
    });