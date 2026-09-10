import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { meetingService } from "../services/meeting.service";

export const AuthContext = createContext({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
    userData: null,
    setUserData: () => {},
    handleLogin: async () => {},
    handleRegister: async () => {},
    handleLogout: () => {},
    addToUserHistory: async () => {},
    getHistoryOfUser: async () => []
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => authService.getToken());
    const [user, setUser] = useState(() => authService.getCurrentUser());
    const [userData, setUserData] = useState(() => authService.getCurrentUser());
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Hydrate auth state on initial mount
    useEffect(() => {
        const storedToken = authService.getToken();
        const storedUser = authService.getCurrentUser();
        if (storedToken) {
            setToken(storedToken);
            setUser(storedUser);
            setUserData(storedUser);
        } else {
            setToken(null);
            setUser(null);
            setUserData(null);
        }
        setLoading(false);
    }, []);

    const handleLogin = async (username, password) => {
        const authData = await authService.login(username, password);
        setToken(authData.token);
        setUser({ username: authData.username });
        setUserData({ username: authData.username });
        navigate("/home");
        return authData;
    };

    const handleRegister = async (name, username, password) => {
        return await authService.register(name, username, password);
    };

    const handleLogout = () => {
        authService.logout();
        setToken(null);
        setUser(null);
        setUserData(null);
        navigate("/auth");
    };

    const getHistoryOfUser = async () => {
        return await meetingService.getUserHistory();
    };

    const addToUserHistory = async (meetingCode) => {
        return await meetingService.addToHistory(meetingCode);
    };

    const value = {
        user,
        token,
        isAuthenticated: Boolean(token),
        loading,
        userData,
        setUserData,
        handleLogin,
        handleRegister,
        handleLogout,
        addToUserHistory,
        getHistoryOfUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to consume authentication context conveniently.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;