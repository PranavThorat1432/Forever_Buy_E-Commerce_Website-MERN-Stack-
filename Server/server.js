import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express();


// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.get('/', (req, res) => {    
    res.json({
        message: "API Working",
        success: true
    }) 
}); 

// User Route
app.use('/api/user', userRouter);

// Product Route
app.use('/api/product', productRouter);

// Cart Route
app.use('/api/cart', cartRouter);

// Order Router
app.use('/api/order', orderRouter);

// Cloudinary Connnection
connectCloudinary();


// MongoDB Connnection
connectDB();  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is runnning on PORT: ${PORT}`));