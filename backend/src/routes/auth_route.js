import express from "express";
import { login, logout, signup } from "../controller/auth_control.js";

const router = express.Router();


//SignUp
router.get("/signup", signup); 

//Login
router.get("/login", login);

//logout
router.get("/logout", logout);

export default router;