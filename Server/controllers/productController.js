import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Add product
const addProduct = async (req, res) => {
    
    try {
        
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description, 
            price : Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            image: imagesUrl,
            date: Date.now()
        }


        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({
            message: 'Product added successfully',
            success: true
        })
        

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success:false
        })
    }
}

// List product
const listProducts = async (req, res) => {
    
    try {
        
        const products = await productModel.find({});
        res.json({
            products,
            success: true
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success:false
        })
    }
}

// Remove product
const removeProduct = async (req, res) => {

    try {
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({
            message: 'Product removed successfully',
            success: true
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success:false
        })
    }
}

// Single product info
const singleProduct = async (req, res) => {

    try {
        
        const product = await productModel.findById(req.body.id);
        res.json({
            product,
            success: true
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success:false
        })
    }
}

// Update product
const updateProduct = async (req, res) => {

    try {
        
        const { id, name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description, 
            price : Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        await productModel.findByIdAndUpdate(id, productData);

        res.json({
            message: 'Product updated successfully',
            success: true
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success:false
        })
    }
}

export { addProduct, listProducts, removeProduct, singleProduct, updateProduct };