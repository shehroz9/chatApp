import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const key = process.env.JWT_SECRET;
console.log(key);

export const generateToken = (userId, res)=>{
    const token = jwt.sign({userId}, key, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAage: 2*24*60*60*1000,
        httpOnly: true, //prevent XSS attacks
        sameSite: "strict", // CSRF attacks
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
    
}