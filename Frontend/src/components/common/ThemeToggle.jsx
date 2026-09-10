import React from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = ({ size = "medium", sx = {} }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Tooltip title={isDark ? "Switch to Daytime Atmosphere" : "Switch to Deep Space Mode"}>
            <IconButton
                onClick={toggleTheme}
                aria-label={isDark ? "switch to light mode" : "switch to dark mode"}
                size={size}
                sx={{
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                    color: isDark ? "#fbbf24" : "#f59e0b",
                    border: "1px solid",
                    borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        backgroundColor: isDark ? "rgba(251, 191, 36, 0.15)" : "rgba(245, 158, 11, 0.15)",
                        transform: "rotate(15deg) scale(1.08)",
                        boxShadow: isDark
                            ? "0 0 15px rgba(251, 191, 36, 0.4)"
                            : "0 0 15px rgba(245, 158, 11, 0.3)"
                    },
                    ...sx
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.4s ease"
                    }}
                >
                    {isDark ? (
                        <LightModeIcon fontSize={size === "small" ? "small" : "medium"} />
                    ) : (
                        <DarkModeIcon fontSize={size === "small" ? "small" : "medium"} sx={{ color: "#6366f1" }} />
                    )}
                </Box>
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle;
