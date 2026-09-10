/**
 * Application configuration loaded from Vite environment variables.
 * Note: Variables prefixed with VITE_ are exposed to the browser bundle.
 */
export const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
        ? "https://sabka-video-call-backend.onrender.com"
        : "http://localhost:8000");

export const SOCKET_URL = API_BASE_URL;

export const APP_CONFIG = {
    APP_NAME: "Sabka Video Call",
    DEFAULT_ICE_SERVERS: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
    ],
    TOKEN_STORAGE_KEY: "token",
    USER_STORAGE_KEY: "user_info",
    THEME_STORAGE_KEY: "app_theme"
};

export default {
    API_BASE_URL,
    SOCKET_URL,
    APP_CONFIG
};
