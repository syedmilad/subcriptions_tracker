import {JWT_SECRET} from "../config/env.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({
                message: 'No token provided',
            })
        }
        const decode = await jwt.verify(token, JWT_SECRET);
        console.log({decode: decode})
        const user = await User.findById(decode.userId)
        if(!user) {
            res.status(401).json({
                message: 'Unauthorized',
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log("error in authorize==>",error)
        res.status(401).json({success: false, error: error.message});
    }
}