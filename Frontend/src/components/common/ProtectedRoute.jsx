import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/**
 * Route guard that requires authentication.
 * Displays a loading spinner while hydrating and redirects unauthenticated users to /auth.
 */
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    height: "100vh",
                    width: "100vw",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "background.default"
                }}
            >
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
