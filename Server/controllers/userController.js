import userModel from '../models/userModel.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({
                message: 'User does not exist',
                success: false
            })
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(isMatched) {
            const token = createToken(user._id);
            res.json({
                token,
                success: true
            })

        } else {
            res.json({
                message: 'Incorrect Password',
                success: false
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success: false
        })
    }
}

// Route for user registration
const registerUser = async (req, res) => {
    try {

        const {name, email, password} = req.body;
        
        //checking that user is already exist or not
        const exist = await userModel.findOne({email});
        if(exist) {
            return res.json({
                message: 'User already exist',
                success: false
            })
        }

        //validating email and strong password
        if(!validator.isEmail(email)) {
            return res.json({
                message: 'Please enter a valid email',
                success: false
            })
        }
        if(password.length < 8) {
            return res.json({
                message: 'Please enter a strong password',
                success: false
            })
        }

        //hashing user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating User
        const newUser = new userModel({ 
            name, 
            email, 
            password: hashedPassword
        });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({
            token,
            success: true
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success: false
        })
        
    }
}

// Route for admin login
const adminLogin = async (req, res) => {

    try {
        
        const { email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({
                token,
                success: true
            })

        } else {
            res.json({
                message: 'Invalid Credentials',
                success: false
            })
        }
        
    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success: false
        })
    }
}

export {loginUser, registerUser, adminLogin};