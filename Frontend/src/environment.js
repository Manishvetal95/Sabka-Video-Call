/**
 * Environment configuration for API and Socket.IO server.
 * Prioritizes VITE_API_URL environment variable, falling back gracefully.
 */
const server =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
        ? "https://sabka-video-call-backend.onrender.com"
        : "http://localhost:8000");

export default server;