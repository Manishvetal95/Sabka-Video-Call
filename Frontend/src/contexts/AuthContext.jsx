import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { meetingService } from "../services/meeting.service";
import { AuthContext } from "./AuthContextBase";

export { AuthContext };

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

export default AuthProvider;