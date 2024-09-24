// import { configureStore } from '@reduxjs/toolkit';
// import { newProductReducer, newReviewsReducer, productdetailsreducer, productReducer, productReviewsReducer, productsreducer, reviewReducer  } from "./reducers/productreducer";
// import {allUsersReducer, ForgetPasswordReducer, ProfileReducer, userDetailsReducer, UserReducer} from './reducers/UserReducer.js';
// import { cartReducer } from './reducers/cartReducer.js';
// import { allOrderReducer, MyOrdersReducer, newOrderReducer , orderDetailsReducer, orderReducer } from './reducers/OrderReducer.js';


// const reducer={
//     products:productsreducer,
//     productdetails:productdetailsreducer,
//     user:UserReducer,
//     profile:ProfileReducer,
//     forgetPassword:ForgetPasswordReducer,
//     cart:cartReducer,
//     newOrder:newOrderReducer,
//     myOrders:MyOrdersReducer,
//     orderDetails:orderDetailsReducer,
//     newReview:newReviewsReducer,
//     newProduct:newProductReducer,
//     product:productReducer,
//     allOrders:allOrderReducer,
//     order:orderReducer,
//     allUsers:allUsersReducer,
//     userDetails:userDetailsReducer,
//     productReviews:productReviewsReducer,
//     review:reviewReducer

// };
 

// let initialState={
//     cart:{
//         cartItems:localStorage.getItem("cartItems")
//         ? JSON.parse(localStorage.getItem("cartItems"))
//         : [],
//         shippingInfo:localStorage.getItem("shippingInfo")
//         ? JSON.parse(localStorage.getItem("shippingInfo"))
//         : [],
//     },
    
// };


// const Store = configureStore({
//     reducer,
//     preloadedState: initialState,
//     devTools: process.env.NODE_ENV !== 'production',
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         serializableCheck: false,
//         immutableCheck: true,    
//     }),
// });
// export default Store;


import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { newProductReducer, newReviewsReducer, productdetailsreducer, productReducer, productReviewsReducer, productsreducer, reviewReducer  } from "./reducers/productreducer";
import {allUsersReducer, ForgetPasswordReducer, ProfileReducer, userDetailsReducer, UserReducer} from './reducers/UserReducer.js';
import { cartReducer } from './reducers/cartReducer.js';
import { allOrderReducer, MyOrdersReducer, newOrderReducer , orderDetailsReducer, orderReducer } from './reducers/OrderReducer.js';


const reducer=combineReducers ({
    products:productsreducer,
    productdetails:productdetailsreducer,
    user:UserReducer,
    profile:ProfileReducer,
    forgetPassword:ForgetPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:MyOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewsReducer,
    newProduct:newProductReducer,
    product:productReducer,
    allOrders:allOrderReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer

});
 

let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo:localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : [],
    },
    
};


const middleware=[thunk];

const Store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;