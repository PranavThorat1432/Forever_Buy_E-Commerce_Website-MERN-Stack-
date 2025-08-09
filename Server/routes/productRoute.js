import express from 'express';
import {addProduct, listProducts, removeProduct, singleProduct} from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';

const productRouter = express.Router();

// Add product
// @API :- /api/product/add-product
productRouter.post('/add-product', adminAuth, upload.fields([
    {name: 'image1', maxCount: 1},
    {name: 'image2', maxCount: 1},
    {name: 'image3', maxCount: 1},
    {name: 'image4', maxCount: 1}]),
    addProduct
);

// Remove product
// @API :- /api/product/remove-product
productRouter.post('/remove-product', adminAuth, removeProduct);

// Single product
// @API :- /api/product/single-product
productRouter.post('/single-product', singleProduct);

// List product
// @API :- /api/product/list-product
productRouter.get('/list-product', listProducts);

export default productRouter;