import userModel from "../models/userModel.js";

// Add Products to User cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        // Assign updated cartData and force Mongoose to detect change
        userData.cartData = cartData;
        userData.markModified("cartData");

        await userData.save();

        res.json({
            message: "Product added to cart!",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success: false
        });
    }
};


// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);

        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = {};
        }

        userData.cartData[itemId][size] = quantity;

        userData.markModified("cartData");
        await userData.save();

        res.json({
            message: "Cart updated",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success: false
        });
    }
};



//Get user cart data

const getUserCart = async (req, res) => {
    try {
        
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({
            cartData,
            success: true
        })
        console.log(cartData)

    } catch (error) {
        console.log(error);;
        res.json({
            message: error.message,
            success: false
        })
    }
}

export { addToCart, updateCart, getUserCart};