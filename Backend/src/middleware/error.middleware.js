import { ApiError } from "../utils/ApiError.js";

/**
 * Global Error Handling Middleware
 * Intercepts all errors, formats them into a unified schema, and suppresses stack traces in production.
 */
export const errorHandler = (err, req, res, next) => {
    let error = err;

    // If error is not an instance of ApiError, normalize it
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        success: false,
        message: error.message,
        errors: error.errors || [],
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
    };

    return res.status(error.statusCode || 500).json(response);
};
