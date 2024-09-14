import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config()

const connConfig = {
    connection: async () => {
        try {
            const uri = process.env.MONGO_URI;

            if (!uri) {
                throw new Error("MONGO_URI is not defined in environment variables");
            }
            // Connect to MongoDB
            const connect = await mongoose.connect(uri);
            console.log("Connection established with MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
        }
    }
}

export default connConfig;