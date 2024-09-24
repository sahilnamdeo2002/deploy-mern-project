import "./App.css";
import React, { useState } from "react";
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Footer/Footer.js"
import Home from "./components/Home/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import Products from "./components/product/Products.js";
import ProductDetails from "./components/product/ProductDetails.js"
import Search from "./components/product/Search.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginSignUp from "./components/users/LoginSignUp.js";
import Store from "./Store";
import { loadUser } from "./actions/UserAction.js";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/users/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/users/UpdateProfile.js";
import UpdatePassword from "./components/users/UpdatePassword.js";
import ForgetPassword from "./components/users/ForgetPassword.js";
import ResetPassword from "./components/users/ResetPassword.js";
import Cart from "./components/cart/Cart.js";
import Shipping from "./components/cart/Shipping.js";
import Payment from "./components/cart/Payment.js";
import ConfirmOrder from "./components/cart/ConfirmOrder.js";
import OrderSuccess from "./components/cart/OrderSuccess.js";
import MyOrders from "./components/orders/MyOrders.js";
import axios from "axios";
import OrderDetails from "./components/orders/OrderDetails.js";
import Dashboard from "./components/admin/Dashboard.js";
import ProductList from "./components/admin/ProductList.js";
import NewProduct from "./components/admin/NewProduct.js";
import UpdateProduct from "./components/admin/UpdateProduct.js";
import OrderList from "./components/admin/OrderList.js";
import ProcessOrder from "./components/admin/ProcessOrder.js";
import UserList from "./components/admin/UserList.js";
import UpdateUser from "./components/admin/UpdateUser.js";
import ProductReview from "./components/admin/ProductReview.js";

import About from "./components/layout/About/About.js";
import Contact from "./components/layout/Contact/Contact.js";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import NotFound from "./components/layout/Notfound/NotFound.js";







function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);


  }
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ['Roboto', 'sans-serif']
      },
    });
    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  ;




  // window.addEventListener("contextmenu", (e) => e.preventDefault());




  return (

    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
     


      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/login/shipping" element={<Shipping />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />








        <Route path="/account" element={<ProtectedRoute element={Profile} />} />
        <Route path="/me/update" element={<ProtectedRoute element={UpdateProfile} />} />
        <Route path="/password/update" element={<ProtectedRoute element={UpdatePassword} />} />
        <Route path="/password/forget" element={<ProtectedRoute element={ForgetPassword} />} />
        <Route path="/success" element={<ProtectedRoute element={OrderSuccess} />} />
        <Route path="/orders" element={<ProtectedRoute element={MyOrders} />} />
        <Route isAdmin={true} path="/admin/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route isAdmin={true} path="/admin/products" element={<ProtectedRoute element={ProductList} />} />
        <Route isAdmin={true} path="/admin/product" element={<ProtectedRoute element={NewProduct} />} />
        <Route isAdmin={true} path="/admin/product/:id" element={<ProtectedRoute element={UpdateProduct} />} />
        <Route isAdmin={true} path="/admin/orders" element={<ProtectedRoute element={OrderList} />} />
        <Route isAdmin={true} path="/admin/order/:id" element={<ProtectedRoute element={ProcessOrder} />} />
        <Route isAdmin={true} path="/admin/users" element={<ProtectedRoute element={UserList} />} />
        <Route isAdmin={true} path="/admin/user/:id" element={<ProtectedRoute element={UpdateUser} />} />
        <Route isAdmin={true} path="/admin/reviews" element={<ProtectedRoute element={ProductReview} />} />



        <Route path="/order/confirm" element={<ProtectedRoute element={ConfirmOrder} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={OrderDetails} />} />





        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute element={Payment} />
              </Elements>
            }
          />
        )}

  

        <Route
        path="*"
          element={
            <NotFound/>
            // window.location.pathname === "/process/payment" ? null : <NotFound/>
          }
        />




      </Routes>






      <ToastContainer />
      <Footer />

    </Router>
  );
}

export default App;
