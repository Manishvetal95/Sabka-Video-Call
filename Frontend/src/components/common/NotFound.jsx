import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import SpaceBackground from "./SpaceBackground";

export const NotFound = () => {
    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                textAlign: "center",
                padding: 3,
                overflow: "hidden"
            }}
        >
            <SpaceBackground />

            <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: "6rem", md: "9rem" },
                        fontWeight: 900,
                        letterSpacing: -2,
                        background: "linear-gradient(135deg, #f97316 0%, #fb923c 40%, #ec4899 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1,
                        filter: "drop-shadow(0 0 35px rgba(249, 115, 22, 0.4))"
                    }}
                >
                    404
                </Typography>

                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>
                    Lost in Space?
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ color: "var(--text-secondary)", maxWidth: 460, mb: 4, fontSize: "1.05rem" }}
                >
                    The page or meeting link you are searching for has drifted away beyond the galaxy or never existed.
                </Typography>

                <Button
                    component={Link}
                    to="/home"
                    variant="contained"
                    startIcon={<HomeIcon />}
                    sx={{
                        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                            boxShadow: "0 0 25px rgba(249, 115, 22, 0.6)"
                        },
                        px: 3.5,
                        py: 1.4,
                        borderRadius: "12px",
                        fontWeight: 800,
                        textTransform: "none",
                        fontSize: "1rem",
                        boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)"
                    }}
                >
                    Return to Mission Control
                </Button>
            </Box>
        </Box>
    );
};

export default NotFound;
