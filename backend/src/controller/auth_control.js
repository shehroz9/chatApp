import { generateToken } from "../lib/utils.js";
import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res)=>{
    try {
        const {fullName, email, password} = req.body;
        if(password<6){
            return res.status(400).json({message: "Password must be of 6 characters"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "Email already exists"});
//hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            passwor: hashedPassword,
        }); 
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            
        } else {
            
        }       
    } catch (error) {
        
    }
};

export const login =  (req, res)=>{
    res.send("login is done");
};

export const logout =  (req, res)=>{
    res.send("logout is done");
};