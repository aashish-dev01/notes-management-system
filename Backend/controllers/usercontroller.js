import User from "../models/user.js"


export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body; // form data



        const exist = await User.findOne({ email }); // find user

        // check if user alreday exist

        if (exist) {  // if exist=true;

            return res.status(400).json({

                success: false,

                message: "User already exists"

            });

        }
        // else create our new user

        const user = await User.create({

            name,

            email,

            password

        });

        // generate token

        const token = user.generateToken(); // this function is written in model and user is given to that function so we use this=user

        // set token to our cookie

        res.cookie("token", token, {

            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000

        });

        // user created succesfully

        res.status(201).json({

            success: true,

            message: "User Registered Successfully",

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    } // try end here 

    catch (error) {

        res.status(500).json({ message: error.message })

    };

};



// our login controller :

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email or Password"

            });

        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email or Password"

            });

        }

        const token = user.generateToken();

        res.cookie("token", token, {

            httpOnly: true,
             secure: true,
            sameSite: "none",

            maxAge: 7 * 24 * 60 * 60 * 1000

        });

        res.status(200).json({

            success: true,

            message: "Login Successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// our getProfile code

export const getProfile = (req, res) => {

    res.json({

        success: true,

        user: req.user

    });

};

// now we write logout code
export const logoutUser = (req, res) => {

    res.clearCookie("token"); // browser ki "token" naam ki cookie delete ho jayegi
    res.status(200).json({

        success: true,

        message: "Logout Successful"

    });
};

// this is our getcurrentUser code

export const getCurrentUser = (req, res) => {

    res.status(200).json({

        success: true,

        user: {

            id: req.user._id,

            name: req.user.name,

            email: req.user.email

        }

    });

};
