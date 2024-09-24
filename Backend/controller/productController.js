const Product = require("../models/productmodels");
const ErrorHander = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror")
const ApiFeatures = require("../utils/apifeatures");
const cloudinary=require("cloudinary");
// ----------------------------------------------------------------------------------------

// create product - admin
exports.createproduct = catchasyncerror(async (req, res, next) => {

    let images=[];
    if(typeof req.body.images==="string"){
        images.push(req.body.images);
    }else{
        images=req.body.images;
    }

    const imagesLinks=[];

    for(let i=0;i<images.length;i++){
        const result=await cloudinary.v2.uploader.upload(images[i],{
            folder:"products",
        });
    
        imagesLinks.push({
            public_id:result.public_id,
            url:result.secure_url,
        });
    }
    req.body.images=imagesLinks;
    
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    })
});
// ----------------------------------------------------------------------------------------

// Get All Product
exports.getAllproductes = catchasyncerror(async (req, res) => {
    const resultPerPage = 5;
    const productcount = await Product.countDocuments();
    const apifeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter() 
    let products=await apifeatures.query;
    let filterProductsCount=products.length;
    apifeatures.paginaiton(resultPerPage);
     products = await apifeatures.query;
    res.status(200).json({
        success: true,
        products,
        productcount,
        resultPerPage,
        filterProductsCount
    });
});


// ----------------------------------------------------------------------------------------
// Get All Product (Admin)
exports.getAdminProducts = catchasyncerror(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });

// ----------------------------------------------------------------------------------------
// Get All Product 
exports.getproductdetails = catchasyncerror(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("product not found", 404))
    }
    res.status(200).json({
        success: true,
        product,
    })
})
// ----------------------------------------------------------------------------------------
// update product 
exports.updateproduct = catchasyncerror(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("product not found fnsdjfn", 404));
    }

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }

    

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product,
    });
});

// ----------------------------------------------------------------------------------------

// /delete
exports.deleteproduct = catchasyncerror(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("product not found fnsdjfn", 404))
    }


     // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "product Deleted successfully"
    })
});

// create new review
exports.createproductreview = catchasyncerror(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    const isreviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isreviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating),
                (rev.comment = comment);
            
        });
    } else {
        product.reviews.push(review);
        product.numofreviews = product.reviews.length;
    }
    let avg=0;
    product.reviews.forEach((rev) => {
        avg+=rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    });
});


// get all review of the product;
exports.getproductreview = catchasyncerror(async (req, res, next) => {

    const product=await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHander("product not found ", 404));

    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
});


// delete review
exports.deletereview = catchasyncerror(async (req, res, next) => { 

    const product=await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHander("product not found ", 404));

    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString() // Fix here
    );
    

    let avg=0;
    reviews.forEach((rev) => {
        avg+=rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
    const numofreviews=reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numofreviews,
    },{new:true,
        runValidators:true,
        useFindAndModify:false,
    })
     
    res.status(200).json({
        success:true,
    });
});
