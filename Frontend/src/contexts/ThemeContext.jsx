import React, { createContext, useState, useEffect } from "react";
import { APP_CONFIG } from "../config";

export const ThemeContext = createContext({
    theme: "dark",
    isDark: true,
    toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem(APP_CONFIG.THEME_STORAGE_KEY);
        return stored === "light" ? "light" : "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(APP_CONFIG.THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const value = {
        theme,
        isDark: theme === "dark",
        toggleTheme
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
