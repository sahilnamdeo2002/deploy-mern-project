const mongoose = require("mongoose");
const { trim } = require("validator");
const usermodels = require("./usermodels");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxlength:[8,"price cannot 8 characters"]
    },
    ratings :{
        type:String,
        default:0
    },
    images:[
       {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
       },
    ],
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxlength:[4,"stock cannot exceed 4 char"],
        default:1
    },
    numofreviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
              },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
        },
    },
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAT:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("Product",productSchema)