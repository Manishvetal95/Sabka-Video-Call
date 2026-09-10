/**
 * Higher-order function to catch asynchronous errors in Express route handlers
 * and pass them to the global error handling middleware.
 */
export const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};
