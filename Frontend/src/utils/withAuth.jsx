import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/**
 * Higher-order component to enforce authentication requirements.
 */
const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const { isAuthenticated, loading } = useAuth();

        if (loading) {
            return (
                <Box
                    sx={{
                        display: "flex",
                        height: "100vh",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <CircularProgress />
                </Box>
            );
        }

        if (!isAuthenticated) {
            return <Navigate to="/auth" replace />;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;