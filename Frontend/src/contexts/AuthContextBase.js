import { createContext } from "react";

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

export default AuthContext;
