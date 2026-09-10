import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import BrandedLoader from "./BrandedLoader";

/**
 * Route guard that requires authentication.
 * Displays a branded cosmic loader while hydrating and redirects unauthenticated users to /auth.
 */
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <BrandedLoader message="Authenticating session..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
