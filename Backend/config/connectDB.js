import mongoose from "mongoose";

 const connectDB = async ()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
        

    }
    catch (error){
        console.log(error.message);
         process.exit(1); // server band kar dega 
        

    }
};

export default connectDB;
