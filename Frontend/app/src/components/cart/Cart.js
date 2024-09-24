
import React, { Fragment, useEffect } from 'react';
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard.js";
import { addItemsToCart ,removeItemsFromCart} from '../../actions/cartAction.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';




const Cart = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    const deleteCartItems=(id)=>{
        dispatch(removeItemsFromCart(id));
    }
    const { cartItems } = useSelector((state) => state.cart);
    

 

    const increaseQuantity=(id,quantity,stock)=>{
        toast.success("added item");
        const newqty=quantity+1;
        if(stock <=quantity){
            return;
        }
        dispatch(addItemsToCart(id,newqty));
    };
    const decreaseQuantity=(id,quantity)=>{
        toast.success("remove item");
        const newqty=quantity-1;
        if(1 >=quantity){
            return;
        }
        dispatch(addItemsToCart(id,newqty));
    };

    
    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => {
            if (item.quantity && item.price) {
                return acc + (item.quantity * item.price);
            }
            return acc;
        }, 0);
    
    };


const checkOutHandler=()=>{
    navigate("/login?redirect=shipping");
};


    return (
       <Fragment>
        {cartItems.length === 0 ? 
        (
            <div className='emptyCart'>
                <RemoveShoppingCartIcon/>
                <Typography>NO PRODUCT IN YOUR CART</Typography>
                <Link to="/products">VIEW PRODUCT</Link>
            </div>
        ) : ( <Fragment>
            <MetaData title={"CART ITEMS"} />
            <div className='cartPage'>
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SUbTotal</p>

                </div>
  

                {cartItems
                 && cartItems.map((item) => (
                    <div className="cartContainer" key={item.product}>
                        <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
                        <div className="cartInput"> 
                            <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                            <input type="number" value={item.quantity} readOnly />
                            <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                        </div>
                        <p className="cartSubtotal">{`$${item.price * item.quantity}`}</p>
                  
                    </div>
                ))}



                <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                        <p>Gross Profit</p>

                        <p>{`$${calculateTotal().toFixed(2)}`}</p>

                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button onClick={checkOutHandler}>Check Out</button>
                    </div>
                </div>
            </div>
        </Fragment>)
        }
       </Fragment>
    )
}

export default Cart;
