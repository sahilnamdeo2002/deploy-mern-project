const Order=require("../models/order.models");
const Product = require("../models/productmodels");
const ErrorHander = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");



exports.newOrder=catchasyncerror(async(req,res,next)=>{
const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
} = req.body;

const order =await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id,
});
res.status(201).json({
    success:true,
    order,
});
});

// single user
exports.getsingleorder=catchasyncerror(async(req,res,next)=>{
const order=await Order.findById(req.params.id).populate(
    "user",
    "name email"
);
if(!order){
    return next(new ErrorHander("No order found with this ID",404));
}
res.status(200).json({
    success:true,
    order,
});
});




// logged in user
exports.myorders=catchasyncerror(async(req,res,next)=>{
const orders=await Order.find({user:req.user._id});

res.status(200).json({
    success:true,
    orders,
});
});




// GET ALL ORDERS - ADMIN 
exports.getallorders=catchasyncerror(async(req,res,next)=>{
    const orders=await Order.find();
    
    let totalammount=0;
    orders.forEach((order)=>{
totalammount+=order.totalprice;
    });

    res.status(200).json({
        success:true,
        totalammount,
        orders,
    });
    });

    





    // update ORDERS status- ADMIN 
exports.updateorder=catchasyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
  
    
    if(!order){
        return next(new ErrorHander("No order found with this ID",404));
    }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHander("product is Delivered" ,400));
    }
    if (req.body.status === "Shipped") {
    order.orderitems.forEach(async(o)=>{
        await updateStock(o.product,o.quantity);
    });
}
    order.orderStatus=req.body.status;
   
    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();

    }
 await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        });
    });

    async function  updateStock (id,quantity){
const product=await Product.findById(id);
product.stock-= quantity;
await product.save({validateBeforeSave:false});

    };










    // delete ORDERS - ADMIN 
exports.deleteorder=catchasyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);


    if(!order){
        return next(new ErrorHander("No order found with this ID",404));
    }
   await order.remove();

    res.status(200).json({
        success:true,
    });
    });