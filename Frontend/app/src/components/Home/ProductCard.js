import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material';




const Product = ({product}) => {


  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  }
useEffect(()=>{
  window.scrollTo(0,0);
});
  return (
   <Link className="productCard" to={`/product/${product._id}`}>
    <img src={product.images[0]?.url } alt={product.name}/>
    {/* <img src={imgg} alt="imgg" /> */}
    <p>{product.name}</p>
    <div>
        <Rating {...options}/> 
        <span  className="productCardSpan">({product.numofreviews})</span>
    </div>
    <span>{`${product.price}`}</span>
   </Link> 
  )
}

export default Product;
