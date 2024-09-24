import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from '../../actions/productaction.js';
import { useSelector , useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.js';
import { toast } from 'react-toastify';





const Home = () => {

    // const styled={
    //     color: 'red',
    // };
    

    const dispatch = useDispatch();

    const {loading , error,products}=useSelector (state=>state.products)


    useEffect(()=>{
       if(error){
        toast.error(error);
       dispatch(clearErrors());
       }
        dispatch(getProduct());
        window.scrollTo(0,0);
    }, [dispatch , error] );

    
 

  
  return (
<Fragment>
    {loading ? (
        <Loader/>
        ) : (
             <Fragment>
    <MetaData title="Buy Best Products Online"/>
    
    <div className="banner">
      
        <p>WELCOME TO ECOMMERCE</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">  
        <button> 
            Scroll <CgMouse/>
        </button>
        </a>
    </div>
    <h2 className='homeHeading'>Featured Products</h2>
    <div className="container" id="container">
        {products && 
        products.map((product , index)=>(
    <ProductCard key={index} product={product}/>
        ))} 
     </div>
  </Fragment>
   )}
</Fragment>

  );

};
export default Home;

