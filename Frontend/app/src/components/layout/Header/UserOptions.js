import React, { Fragment, useState } from 'react';
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import ProfilePng from "../../../images/Profile.png";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import "./Header.css"; 
import { useNavigate } from 'react-router';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

import { toast } from 'react-toastify';
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useDispatch ,useSelector} from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";

import {logout} from "../../../actions/UserAction";


const UserOptions = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {cartItems} = useSelector((state)=>state.cart);




const Options=[
  {icon:<ListAltIcon/>,name:"ORDER",func:orders},
  {icon:<PersonIcon/>,name:"PROFILE",func:account},
  {icon:(
  <ShoppingCartIcon
    style={{ color:cartItems.length > 0 ? "tomato" : "unset"}}
  />
  ),
    name:`Cart(${cartItems.length})`,
    func:cart},

    {icon:<ProductionQuantityLimitsIcon/>,name:"PRODUCTS",func:ProductsList},
  {icon:<ExitToAppIcon/>,name:"LOGOUT",func:logoutUser},
];

if(user.role==="admin"){
  Options.unshift({icon:<DashboardIcon/>,name:"Dashboard",func:dashboard});
}
// console.log("users roll was - "+user.role);



function dashboard(){
  navigate("/admin/dashboard");
}
function orders(){
  navigate("/orders")
}
function logoutUser(){
  dispatch(logout());
  navigate("/login")
  toast.success("logout successfully");
}
function account(){
  navigate("/account");
}
function cart(){
  navigate("/Cart");
}
function ProductsList(){
  navigate("/products");
}



    const [open,setOpen]=useState(false);


  return (
  
   <Fragment>
    <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
         ariaLabel="SpeedDial tooltip example"
        onClose={()=> setOpen(false)}
        onOpen={()=> setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
            <img
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url:ProfilePng}
            alt='profile'        
            />
        }
        >
          {Options.map((item)=>( 
            <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth < 600 ? true:false}
            />
          ))}
        </SpeedDial>
   </Fragment>
  );
};

export default UserOptions;
