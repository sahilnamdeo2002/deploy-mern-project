const express=require("express");
const router=express.Router(); 

const {isAuthenticated , autorizerole }=require("../middleware/auth");
const { 
    newOrder,
    getsingleorder,
    myorders,
    getallorders,
    updateorder,
    deleteorder,
 } = require("../controller/order.controller");

router.route("/order/new").post(isAuthenticated , newOrder);
router.route("/order/:id").get(isAuthenticated , getsingleorder);
router.route("/orders/me").get(isAuthenticated , myorders);
router.route("/admin/orders").get(isAuthenticated ,autorizerole("admin") , getallorders);
router.route("/admin/order/:id").put(isAuthenticated ,autorizerole("admin") , updateorder)
.delete(isAuthenticated ,autorizerole("admin") , deleteorder);

module.exports=router;