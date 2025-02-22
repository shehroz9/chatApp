import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res)=>{
    try {
        const {fullName, email, password} = req.body;
        console.log(password.length);
        if(!fullName || !password || !email){
            return res.status(400).json({message: "All fields are required"});
        }
        
        if(password.length<6){
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
            password: hashedPassword,
        }); 
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
            
        } else {
            res.status(400).json({message: "Invaild user data"});            
            
        }       
    } catch (error) {
        console.log("Error in signUp controller", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};

export const login =  async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password); 
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export const logout =  (req, res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "Logged out SuccessFully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};

export const updateProfile = async(req, res)=>{
    try {
        const profilePic = req.body;
        const userId = req.user._id;
        if(!profilePic){
            return res.status(400).json({message: "ProfilePic is reqired"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        console.log("upload response", uploadResponse);
        
        const updatedUser = await User.findByIdAndUpdate({profilePic:uploadResponse.secure_url}, {new:true});
        console.log("updated user is here", updatedUser);
        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log("Error in updateProfile", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth = async(req, res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}