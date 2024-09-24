const dotenv=require("dotenv");
const app=require("./App")
const cloudinary=require("cloudinary");
const connectdatabase =require("./config/database")


//handle uncoughterror ex- youtube
process.on("uncaughtException",(err)=>{
    console.log(`error:${err.messgage}`);
    console.log(`uncaughtException down server `);
    process.exit(1);

});
const NODE_ENV="PRODUCTION";

if(NODE_ENV !== "PRODUCTTION"){
   require("dotenv").config({ path: './config/config.env' });
}


// connect to database
connectdatabase();
const CLOUD_NAME="sahilnamdeo";
const API_KEY="868627835579766";
const API_SECRET="zKntmneHJPTbpn_FbRNkXHegiKI";



cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key:API_KEY,
    api_secret:API_SECRET,
})
const PORT= 3000;
const server=app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

//unhandled error
process.on("unhandledRejection",(err)=>{
    console.log(`error:${err.message}`);
    console.log("shutting down server ");

server.close(()=>{
    process.exit(1);
});
});