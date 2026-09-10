import axios from "axios";
import { API_BASE_URL, APP_CONFIG } from "../config";

/**
 * Centralized Axios instance with base configuration, interceptors, and robust error handling.
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request Interceptor: Automatically attach Authorization token if available
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(APP_CONFIG.TOKEN_STORAGE_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Standardize API responses and error messages
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        let userMessage = "An unexpected error occurred. Please try again.";
        let statusCode = 500;

        if (error.response) {
            // Server responded with a status outside 2xx
            statusCode = error.response.status;
            userMessage =
                error.response.data?.message ||
                (statusCode === 401
                    ? "Invalid credentials or session expired."
                    : statusCode === 404
                    ? "Requested resource was not found."
                    : statusCode === 409
                    ? "User already exists. Please choose a different username."
                    : `Server error (${statusCode}).`);
        } else if (error.request) {
            // Network failure or server did not respond
            userMessage = "Unable to reach the server. The backend may be waking up, please wait a moment.";
            statusCode = 0;
        } else {
            userMessage = error.message || userMessage;
        }

        const normalizedError = new Error(userMessage);
        normalizedError.status = statusCode;
        normalizedError.originalError = error;

        return Promise.reject(normalizedError);
    }
);

export default apiClient;
