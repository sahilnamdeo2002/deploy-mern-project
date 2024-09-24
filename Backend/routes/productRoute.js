const express=require("express");
const {
     getAllproductes ,
      createproduct,
      updateproduct, 
      deleteproduct,
       getproductdetails,
       createproductreview,
       getproductreview,
       deletereview,
       getAdminProducts
    } = require("../controller/productController");
const { isAuthenticated , autorizerole} = require("../middleware/auth");
const router=express.Router();

router.route("/products").get( getAllproductes);
router.route("/admin/products").get( isAuthenticated , autorizerole("admin") , getAdminProducts );
router.route("/admin/product/new").post(isAuthenticated,autorizerole("admin"),createproduct);
router.route("/admin/product/:id")
.put( isAuthenticated ,autorizerole("admin"),updateproduct)
.delete(isAuthenticated ,autorizerole("admin"), deleteproduct);
router.route("/product/:id").get(getproductdetails);

router.route("/review").put( isAuthenticated , createproductreview);

router.route("/reviews")
.get( getproductreview)
.delete(isAuthenticated , deletereview);

module.exports=router;
