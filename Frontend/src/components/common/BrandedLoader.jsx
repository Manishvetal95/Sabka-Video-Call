import React from "react";
import { Box, Typography } from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

export const BrandedLoader = ({ message = "Connecting to Mission Control..." }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                width: "100vw",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
                p: 3,
                zIndex: 9999
            }}
        >
            {/* Pulsing Glowing Logo Orb */}
            <Box
                sx={{
                    position: "relative",
                    width: 72,
                    height: 72,
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 35px rgba(249, 115, 22, 0.5), 0 0 70px rgba(236, 72, 153, 0.25)",
                    mb: 3,
                    animation: "pulseSpeaker 2s infinite ease-in-out"
                }}
            >
                <VideoCameraFrontIcon sx={{ color: "#ffffff", fontSize: 38 }} />
            </Box>

            <Typography
                variant="h6"
                sx={{
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    fontSize: "1.1rem",
                    mb: 1,
                    background: "linear-gradient(90deg, #f8fafc, #94a3b8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                ✦ Sabka Video Call
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                    letterSpacing: 0.5,
                    mb: 3
                }}
            >
                {message}
            </Typography>

            {/* Orbiting / Bouncing Energy Dots */}
            <Box sx={{ display: "flex", gap: 1.2 }}>
                {[0, 1, 2].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "#f97316",
                            boxShadow: "0 0 10px rgba(249, 115, 22, 0.8)",
                            animation: "twinkle 1.2s infinite ease-in-out",
                            animationDelay: `${i * 0.2}s`
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default BrandedLoader;
