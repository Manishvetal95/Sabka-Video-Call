import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/database.js";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { ApiError } from "./utils/ApiError.js";

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);

// Initialize Socket.IO
const io = connectToSocket(server);

// Configure port
const PORT = process.env.PORT || 8000;
app.set("port", PORT);

// Configure CORS
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:3000",
    "https://sabka-video-call-slni.onrender.com"
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
            if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
                callback(null, true);
            } else {
                callback(null, true); // Fallback to allow during transition, but structured
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// Body parsing middlewares
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Health check endpoints
app.use("/health", healthRoutes);
app.use("/api/v1/health", healthRoutes);

// API Routes
app.use("/api/v1/users", userRoutes);

// 404 Route Handler for undefined routes
app.use((req, res, next) => {
    next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server and Database Connection
const start = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`[Server] Sabka Video Call server running on port ${PORT}`);
            console.log(`[Server] Environment: ${process.env.NODE_ENV || "development"}`);
        });
    } catch (error) {
        console.error(`[Server Error] Startup failed: ${error.message}`);
        process.exit(1);
    }
};

start();

export { app, server, io };