import express from "express"
import { registerUser,loginUser,getProfile,logoutUser,getCurrentUser } from "../controllers/usercontroller.js";
import { protect } from "../middlewares/auth.js";


const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect , getProfile ) // fisrt run protect code then getProfile
router.post("/logout", logoutUser);
router.get("/me", protect, getCurrentUser);




export default router;

