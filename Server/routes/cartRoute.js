import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middlewares/auth.js';

const cartRouter = express.Router();

// Add Products to User cart
// @API :- /api/cart/add-to-cart
cartRouter.post('/add-to-cart', authUser, addToCart);

// Update User cart
// @API :- /api/cart/update-cart
cartRouter.post('/update-cart', authUser, updateCart);

// Get User cart data
// @API :- /api/cart/get-cart
cartRouter.post('/get-cart', authUser, getUserCart);

export default cartRouter;