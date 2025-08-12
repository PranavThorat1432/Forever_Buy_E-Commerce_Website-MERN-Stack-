import express from 'express';
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateOrderStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middlewares/adminAuth.js';
import authUser from '../middlewares/auth.js';

const orderRouter = express.Router();



/* --------- ADMIN FEATURES ----------- */
// List All order
// @API :- /api/order/list-order
orderRouter.post('/list-order', adminAuth, allOrders);

// Update Order Status
// @API :- /api/order/update-order-status
orderRouter.post('/update-order-status', adminAuth, updateOrderStatus);



/* --------- PAYMENT FEATURES ---------- */
// Place Order using Cash On Delivery
// @API :- /api/order/place-order-cod
orderRouter.post('/place-order', authUser, placeOrder);

// Place Order using Stripe
// @API :- /api/order/place-order-stripe
orderRouter.post('/place-order-stripe', authUser, placeOrderStripe);

// Place Order using Razorpay
// @API :- /api/order/place-order-razorpay
orderRouter.post('/place-order-razorpay', authUser, placeOrderRazorpay);



/* --------- USER FEATURES ---------- */
// User Order 
// @API :- /api/order/user-order
orderRouter.post('/user-order', authUser, userOrders);


/* VERIFY PAYMENT */
// Stripe
// @API :- /api/order/verifyStripe
orderRouter.post('/verifyStripe', authUser, verifyStripe); 

// Razorpay
// @API :- /api/order/verifyRazorpay
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay); 

export default orderRouter;