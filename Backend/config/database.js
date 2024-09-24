
const mongoose=require("mongoose");

// const dotenv=require("dotenv");
//  dotenv.config({path:"./config/config.env"});
const connectdatabase=()=>{
    mongoose.connect("mongodb+srv://sahilnamdeo12:sahilnamdeo@12@deploy-project.fuqz0.mongodb.net/?retryWrites=true&w=majority&appName=deploy-project",
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000,
            
        })
    .then((data)=>{
        console.log(`mongodb connected with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.log("mongodb connection error:",err)
    });
}

module.exports=connectdatabase;