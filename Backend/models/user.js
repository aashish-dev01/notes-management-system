import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true

    },

    password: {
        type: String,
        required: true,
        minlength: 8
    }

})

// data is coming from our app and this function is run before save in database 
// hash password

userSchema.pre("save", async function(){

    if(!this.isModified("password")){ // if entered pass is same do nothing
        return;
    }

    this.password = await bcrypt.hash(this.password,10); // else hash the password

});

// Compare user entred password with our hash password

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
    // here password is user entred pass and this.password is stored password
}

// now we generate our token here and simply just use generateToken() in our controller

userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
        id:this._id   // here id is comes from user=this i.e this.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
          

    );
}

// finally our model 

const User = mongoose.model("User",userSchema);

export default User;

