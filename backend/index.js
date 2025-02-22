import dotenv from "dotenv";
import express from "express";
import {connectDB} from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import authroutes from "./src/routes/auth_route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authroutes);
app.use(cookieParser());

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`);
    connectDB();
});