import dotenv from "dotenv";
import express from "express";
import authroutes from "./src/routes/auth_route.js";
import {connectDB} from "./src/lib/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authroutes);

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`);
    connectDB();
    
});