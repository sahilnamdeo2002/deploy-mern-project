import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./OrderSuccess.css";
import MetaData from "../layout/MetaData";
const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <MetaData title="Order Success" />
            <CheckCircleIcon/>
            <Typography>YOUR ORDER HAS BEEN PLACED SUCCESSFULLY</Typography>
            <Link to="/orders">VIEW YOUR ORDERS</Link>
    </div>
  )
}

export default OrderSuccess;
