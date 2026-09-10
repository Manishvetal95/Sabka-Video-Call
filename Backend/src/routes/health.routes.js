import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

/**
 * Health check endpoint for monitoring uptime and database connectivity.
 */
router.get("/", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";

    return res.status(200).json({
        success: true,
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: dbStatus
    });
});

export default router;
