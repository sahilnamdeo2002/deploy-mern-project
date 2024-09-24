import React, { Fragment, useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductdetails, newReview } from "../../actions/productaction";

import { clearErrors } from "../../actions/productaction.js";
import Loader from '../layout/Loader/Loader.js';

import MetaData from '../layout/MetaData.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Carousel } from 'react-responsive-carousel';
import ReviewCard from "./ReviewCard.js";

import {  addItemsToCart } from "../../actions/cartAction.js";
import {
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Button





} from "@material-ui/core";

import { Rating } from "@material-ui/lab";
import {NEW_REVIEW_RESET} from "../../constants/productconstant.js";





const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product = {}, loading, error } = useSelector(state => state.productdetails || {}); // kch ni to khali ajayega
  const { error:  reviewError, success} = useSelector(state => state.newReview); 



  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity,setQuantity]=useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  //FIRST FUNCTION
const increaseQuantity=()=>{
  if(product.stock <= quantity) return;
  const qty=quantity+1;
  setQuantity(qty);
};

  //seccond FUNCTION
const decreaseQuantity=()=>{
  if(1>=quantity)return;
  const qty=quantity-1;
  setQuantity(qty);
};
  //third FUNCTION
  const addToCartHandler=()=>{
    dispatch(addItemsToCart(id,quantity));
    toast.success("items added to cart")
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId",id);

    dispatch(newReview(myForm));

    setOpen(false);
  };


  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if(success){
      toast.success("Review submitted successfully");
      dispatch({type:NEW_REVIEW_RESET});
    }
    window.scrollTo(0,0);
    dispatch(getProductdetails(id))
  }, [dispatch, id, error , reviewError ,  success]);



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className='ProductDetails'>
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span"  >
                  {" "}
                  ({product.numofreviews} reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button  onClick={increaseQuantity} >+</button>
                  </div>
                  

                  <button
                   disabled={product.stock <1 ? true : false}
                  onClick={addToCartHandler} className='addtocart'
                  >
                  Add to Cart
                  </button>
                
                </div>
                <p>
                  status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description:<p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">Submit review</button>

            </div>
          </div>

          <h2 className='reviewsHeading'>Reviews</h2>



          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>




          {product.reviews &&
            product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className='noreviews'>No reviews yet</p>
          )}


        </Fragment>
      )}
    </Fragment>
  );
}


export default ProductDetails;
