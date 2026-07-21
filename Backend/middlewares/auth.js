import jwt from "jsonwebtoken"; // token verify karne 
import User from "../models/user.js"; // token me se user find karne 

// ye sara code /profile ke pehle chalne ke liye likha gaya hai :

 export const protect = async (req, res, next) => {

    try{
    const token = req.cookies.token;  // req se cookie nikal lo 

    if (!token) {

        return res.status(401).json({

            success: false,

            message: "Please Login"

        });

    }

    // verify our token and get our id from token

    const decoded = jwt.verify(

        token,

        process.env.JWT_SECRET

    );

    // now find our user with the help of id

    const user = await User.findById(decoded.id);

    // now we modify our req and set our user so next route can get this user

      req.user = user;

      next(); // now req can go /profile

    } // try end

    catch(error){
        
        return res.status(401).json({

            success: false,

            message: "Invalid Token"

        });


    }

}
