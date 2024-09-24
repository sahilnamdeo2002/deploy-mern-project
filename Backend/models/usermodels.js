
const mongoose = require("mongoose");
const validitor = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require("crypto");





const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "please enter your name"],
        maxLength: [30, "your name cannot exceed 30 characters"],
        minlength: [4, "name should more than 4 letters"]
    },
    email: {
        type: String,
        required: [true, "please enter your  email"],
        unique: true,
        validate: [validitor.isEmail, "please enter valid email address"]
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minlength: [8, "password should be greater than 8 char"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

});



 //JWT token -
const JWT_SECRET="mySuperSecretKey";
const JWT_EXPIRE ="5d";
const COOKIE_EXPIRE="'5";

// console.log("JWT_SECRET:", JWT_SECRET);
// console.log("JWT_EXPIRE:", JWT_EXPIRE);
// console.log("COOKIE_EXPIRE:",COOKIE_EXPIRE);

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id },JWT_SECRET, {
        expiresIn:JWT_EXPIRE,
      
    });
};

// compare password comparePassword
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// generate password reset token
UserSchema.methods.getresetpasswordtoken = function(){
    //generating token
    const resettoken=crypto.randomBytes(20).toString("hex");
    // hashing and addding resetpassword
    this.resetPasswordToken=crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

this.resetPasswordExpire=Date.now() +15 * 60 * 1000; 
return resettoken;

};

module.exports = mongoose.model("User", UserSchema);