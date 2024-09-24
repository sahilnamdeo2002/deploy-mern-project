const express=require("express");
const app=express();
const cookieParser=require("cookie-parser")
const  path=require("path");
const bodyparser=require("body-parser"); 
const fileupload=require("express-fileupload");
const dotenv = require("dotenv");


const errormiddleware=require("./middleware/error")


const NODE_ENV="PRODUCTION";

if(NODE_ENV !== "PRODUCTTION"){
   require("dotenv").config({ path: './config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileupload());




const product=require("./routes/productRoute");
const user=require("./routes/userroutes");
const order=require("./routes/order.route");
const payment=require("./routes/PaymentRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


app.use(express.static(path.join(__dirname,"../Frontend/app/build")));

app.get("*",(req,res)=>{
res.sendFile(path.resolve(__dirname,"../Frontend/app/build/index.html"));
});
app.use(errormiddleware);
 


module.exports=app;  