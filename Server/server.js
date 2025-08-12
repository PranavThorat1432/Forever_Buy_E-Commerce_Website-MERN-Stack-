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

const allowedOrigins = [
  'https://forever-buy-e-commerce-website-mern.vercel.app',   // Client (prod)
  'https://forever-buy-e-commerce-admin-panel.vercel.app',    // Admin (prod)
  'http://localhost:5173',                                    // Client (dev)
  'http://localhost:5174'                                     // Admin (dev) - adjust if needed
];

// Middlewares
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl) and whitelisted web origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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