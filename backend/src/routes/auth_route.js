import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controller/auth_control.js";
import { protectroute } from "../middleware/auth_middle.js";

const router = express.Router();


//SignUp
router.post("/signup", signup); 

//Login
router.post("/login", login);

//logout
router.post("/logout", logout);

//Update profile
router.put("/update-profiel", protectroute, updateProfile);

//
router.get("/check", protectroute, checkAuth);
export default router;