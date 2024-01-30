import dotenv from 'dotenv';
import express from "express";
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js' 
import orderRoutes from './routes/orderRoutes.js' 
import { errorHandler,notFound} from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser';
/./

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



// Cookie parser middleware



app.get('/' , (req,res) =>{
    res.send("API work")
})





app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{ console.log(`server run on port ${port}`) })