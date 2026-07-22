import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/userRoutes.js";
import nrouter from "./routes/noteRoutes.js"

dotenv.config(); // for read our .env file with process.env keyword
connectDB();     // connect database

const PORT = process.env.PORT || 3000; 
const app = express(); 

app.use(cors({ origin: ["http://localhost:5173", "https://notes-management-system-mocha.vercel.app" ], credentials: true})); // let origin use our server
app.use(express.json());  // parse json data
app.use(express.urlencoded({ extended: true })); // parse html form data
app.use(cookieParser());   // Cookies ko req.cookies me read karne ke liye.
app.use("/Api" ,router)  // / ke baad sare routes router se chalao
app.use("/Api/notes", nrouter);

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    
})