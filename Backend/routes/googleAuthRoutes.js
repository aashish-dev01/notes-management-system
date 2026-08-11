import express from "express";
import googleClient from "../config/google.js";
import User from "../models/user.js";

const router = express.Router();


// STEP 1: User ko Google par bhejna
router.get("/google", (req, res) => {

    const authUrl = googleClient.generateAuthUrl({
        access_type: "offline",

        scope: [
            "openid",
            "email",
            "profile"
        ],

        redirect_uri: process.env.GOOGLE_CALLBACK_URL
    });

    res.redirect(authUrl);
});


// STEP 2: Google user ko yahan wapas bhejega
router.get("/google/callback", async (req, res) => {

    try {

        const { code } = req.query;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Google authorization code missing"
            });
        }

        // Google se tokens obtain karo
        const { tokens } = await googleClient.getToken(code);

        console.log("Google authentication successful");

        // ID token verify karo
        const ticket = await googleClient.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        // Google user information
        const payload = ticket.getPayload();

        const {
            sub,
            name,
            email
        } = payload;

        console.log("Google User:", email);


        let user = await User.findOne({ email });

        if (!user) {

            // New Google user
            user = await User.create({
                name,
                email,
                googleId: sub,
                authProvider: "google"
            });

        } else {

            // Existing user
            if (!user.googleId) {
                user.googleId = sub;
            }

            // Agar existing local user hai to uska password
            // delete/change nahi karna
            await user.save();
        }


        // Existing system ka JWT
        const token = user.generateToken();


        // Existing HttpOnly cookie
        res.cookie("token", token, {

            httpOnly: true,

            maxAge: 7 * 24 * 60 * 60 * 1000

        });


        // Temporary frontend redirect
        res.redirect(
            "http://localhost:5173/"
        );


    } catch (error) {

        console.error("Google Auth Error:", error);

        res.status(500).json({
            success: false,
            message: "Google authentication failed"
        });

    }

});


export default router;