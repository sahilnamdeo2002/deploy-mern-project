import React from "react";
import "./Contact.css";
import { Button } from "@mui/material"; 
import MetaData from "../MetaData";
const Contact = () => {
  return (
    <div className="contactContainer">
        <MetaData title="Contact Me -- ECOMMERCE" />
    <a className="mailBtn" href="mailto:sahilnamdeo12@gmail.com">
      <Button>Contact: sahilnamdeo12@gmail.com</Button>
    </a>
  </div>
  )
}

export default Contact
