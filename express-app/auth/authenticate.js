import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

export const isTokenExpired = (token) => {
    try {
        const decodedToken = jwt.decode(token.split(' ')[1]);

        if (!decodedToken || !decodedToken.exp)
            throw new Error('Invalid Token format');

        const currentTimeInSec = Math.floor(Date.now() / 1000);

        return currentTimeInSec > decodedToken.exp;
    } catch (err) {
        console.error('Error checking token', err.message);
        return true;
    }
};

export const verifyToken = (token) => {
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        })
    }
};

export const verifyTokenForApi = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            message: "No token provided"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        })
    }
};