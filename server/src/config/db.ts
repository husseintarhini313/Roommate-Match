import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error("MONGODB_URI is not defined in .env");
}

const db=(async ()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Failed to connect to MongoDB: ", error);
        process.exit(1);
    }
})();

export default db;