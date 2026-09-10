import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

export const NotFound = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                color: "#f8fafc",
                textAlign: "center",
                padding: 3
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: { xs: "5rem", md: "8rem" },
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #f97316, #fb923c)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1
                }}
            >
                404
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                Page Not Found
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#94a3b8", maxWidth: "480px", mb: 4 }}
            >
                The page or meeting link you are trying to access does not exist or has been moved.
            </Typography>
            <Button
                component={Link}
                to="/home"
                variant="contained"
                startIcon={<HomeIcon />}
                sx={{
                    backgroundColor: "#f97316",
                    "&:hover": { backgroundColor: "#ea580c" },
                    px: 3,
                    py: 1.2,
                    borderRadius: "10px",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem"
                }}
            >
                Return to Dashboard
            </Button>
        </Box>
    );
};

export default NotFound;
