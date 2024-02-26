import path from 'path';

import dotenv from 'dotenv';
import express from "express";
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js' 
import orderRoutes from './routes/orderRoutes.js' 
import { errorHandler,notFound} from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/uploadRoutes.js'
/./

// => connect to database from mongoose server and mongodbcompos
// => using for test and for show results in presentation





// const mongoose = require("mongoose");

// import {mongoose} from 'mongoose';
// // todo: prot of mongodb (mongodb://127.0.0.1:27018) ('27018')
// mongoose.connect('mongodb://127.0.0.1:27017/')
//     .then( // => if work 
//         ()=>{
//             console.log("connected");
//             port = 27017
//         },
//     )
//     .catch( // => if not work
//         (err)=>{
//             console.log("error is :"+err)
//         }
//     )








// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const port = process.env.PORT || 5000;

dotenv.config();
const app = express();
connectDB() // connect db


app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

// => connect
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)



// Cookie parser middleware



app.get('/' , (req,res) =>{
    res.send("API work")
})


const __dirname = path.resolve(); //set __dirname to current working directory
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));


app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{ console.log(`server run on port ${port}`) })