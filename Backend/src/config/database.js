import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB Atlas or local MongoDB instance.
 */
export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            console.error("FATAL: MONGO_URI is not defined in environment variables.");
            process.exit(1);
        }

        const connectionInstance = await mongoose.connect(mongoUri);

        console.log(`[Database] MongoDB Connected successfully!`);
        console.log(`[Database] Host: ${connectionInstance.connection.host}`);
        console.log(`[Database] DB Name: ${connectionInstance.connection.name}`);
        return connectionInstance;
    } catch (error) {
        console.error(`[Database Error] Connection failed: ${error.message}`);
        process.exit(1);
    }
};
