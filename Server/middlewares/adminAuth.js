import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {

    try {

        const {token} = req.headers;
        if(!token) {
            return res.json({
                message: 'Not Authorized, Login Again!',
                success: false
            })
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                message: 'Not Authorized, Login Again!',
                success: false
            })
        }
        next();
        
    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success: false
        }) 
    }
}

export default adminAuth;