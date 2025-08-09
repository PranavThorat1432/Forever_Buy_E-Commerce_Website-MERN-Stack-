import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js'

const userRouter = express.Router();

// User register
// @API :- /api/user/register
userRouter.post('/register', registerUser);

// User login
// @API :- /api/user/login
userRouter.post('/login', loginUser); 

// Admin login
// @API :- /api/user/admin
userRouter.post('/admin', adminLogin);

export default userRouter;