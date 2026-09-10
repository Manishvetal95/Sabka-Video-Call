import apiClient from "./api";
import { APP_CONFIG } from "../config";

/**
 * Authentication service handling login, registration, session persistence, and logout.
 */
export const authService = {
    /**
     * Authenticate an existing user.
     * @param {string} username
     * @param {string} password
     * @returns {Promise<{ token: string, username: string }>}
     */
    async login(username, password) {
        const trimmedUsername = username?.trim();
        const response = await apiClient.post("/api/v1/users/login", {
            username: trimmedUsername,
            password
        });

        const token = response.data?.token;
        if (token) {
            localStorage.setItem(APP_CONFIG.TOKEN_STORAGE_KEY, token);
            localStorage.setItem(
                APP_CONFIG.USER_STORAGE_KEY,
                JSON.stringify({ username: trimmedUsername })
            );
        }

        return { token, username: trimmedUsername };
    },

    /**
     * Register a new user account.
     * @param {string} name
     * @param {string} username
     * @param {string} password
     * @returns {Promise<string>} Success message
     */
    async register(name, username, password) {
        const response = await apiClient.post("/api/v1/users/register", {
            name: name?.trim(),
            username: username?.trim(),
            password
        });
        return response.data?.message || "User registered successfully.";
    },

    /**
     * Clear all stored session credentials.
     */
    logout() {
        localStorage.removeItem(APP_CONFIG.TOKEN_STORAGE_KEY);
        localStorage.removeItem(APP_CONFIG.USER_STORAGE_KEY);
    },

    /**
     * Retrieve the stored authentication token.
     * @returns {string|null}
     */
    getToken() {
        return localStorage.getItem(APP_CONFIG.TOKEN_STORAGE_KEY);
    },

    /**
     * Retrieve stored user metadata.
     * @returns {{ username: string } | null}
     */
    getCurrentUser() {
        try {
            const raw = localStorage.getItem(APP_CONFIG.USER_STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    /**
     * Check if a token currently exists in storage.
     * @returns {boolean}
     */
    isAuthenticated() {
        return Boolean(localStorage.getItem(APP_CONFIG.TOKEN_STORAGE_KEY));
    }
};

export default authService;
