import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user_model.js";
dotenv.config();
export const protectroute = async (req, res, next)=>{
    try {
        console.log("sssssssssssss", req.cookies);
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded:', decoded);
        
        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        req.user = user;
        next();

        
    } catch (error) {
        console.log("Error in protected route middleware", error.message);
        res.status(500).json({message: "Internal server error"});
    }

}