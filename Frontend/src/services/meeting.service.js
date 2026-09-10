import apiClient from "./api";
import { authService } from "./auth.service";

/**
 * Service for meeting history recording and retrieval.
 */
export const meetingService = {
    /**
     * Record a joined or created meeting in user history.
     * @param {string} meetingCode
     */
    async addToHistory(meetingCode) {
        const token = authService.getToken();
        const response = await apiClient.post("/api/v1/users/add_to_activity", {
            token,
            meeting_code: meetingCode?.trim()
        });
        return response.data;
    },

    /**
     * Retrieve all past meeting activity for the authenticated user.
     * @returns {Promise<Array<{ meetingCode: string, date: string }>>}
     */
    async getUserHistory() {
        const token = authService.getToken();
        const response = await apiClient.get("/api/v1/users/get_all_activity", {
            params: { token }
        });
        return Array.isArray(response.data) ? response.data : [];
    }
};

export default meetingService;
