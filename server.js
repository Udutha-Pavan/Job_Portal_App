
import './config/instrument.js'
import './config/index.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import * as Sentry from "@sentry/node";
import { clerkwebhoooks } from './controllers/webhooks.js'


// import 'dotenv/config'
// import connectDB from './config/db'

//intialise express
const app=express();
dotenv.config();
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>res.send("ApI Working"))
app.get("/debug-sentry",function mainHandler(req,res){
   throw new Error("my first sentry error");
});
app.post('/webhooks',clerkwebhoooks)

const PORT=process.env.PORT ||7000;
Sentry.setupExpressErrorHandler(app);


const MONGODB_URI=process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(()=>{
   console.log("Database connected")
   app.listen(PORT,()=>{
      console.log(`server is running on port ${PORT}`);
   })
}).catch((error)=>console.log(error));


const userschema=new mongoose.Schema({
   name:String,
   age:Number,
});

app.get("/debug-sentry", function mainHandler(req, res) {
   throw new Error("My first Sentry error!");
 });
 
const usermodel=mongoose.model("users",userschema)
app.get("/getUsers",async (req,res) => {
   const userdata= await usermodel.find();
   res.json(userdata);
   
});

// //connect to db

// await connectDB()

//  //middlewares
// app.use(cors())
// app.use(express.json())
 
//  //Routes
// app.get('/',(req,res)=>res.send("API working"))

//  //port
// const PORT=process.env.PORT ||5000
// app.listen(PORT,()=>{
//    console.log(`Server is running on port ${PORT}`);
// })