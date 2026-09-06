import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

// Load environment variables from .env
dotenv.config();

const app = express();
const server = createServer(app);

// Socket.IO
const io = connectToSocket(server);

// Port
app.set("port", process.env.PORT || 8000);

// Middleware
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);

// Start server
const start = async () => {
    try {
        // Connect to MongoDB
        const connectionDb = await mongoose.connect(process.env.MONGO_URI);

        console.log(
            `MONGO Connected DB Host: ${connectionDb.connection.host}`
        );

        console.log(
            `DATABASE: ${connectionDb.connection.name}`
        );

        console.log(
            `PORT: ${app.get("port")}`
        );

        // Start HTTP server
        server.listen(app.get("port"), () => {
            console.log(
                `LISTENING ON PORT ${app.get("port")}`
            );
        });

    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);
        process.exit(1);
    }
};

start();