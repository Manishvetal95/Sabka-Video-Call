import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useTheme } from "../../hooks/useTheme";

/**
 * Cinematic SpaceBackground component.
 * Provides subtle twinkling stars, drifting nebula gradients, and occasional shooting stars.
 * 100% GPU-accelerated and non-blocking (pointer-events: none).
 */
export const SpaceBackground = () => {
    const { isDark } = useTheme();

    // Generate static random star positions once to avoid re-render recalculation
    const stars = useMemo(() => {
        const starCount = 60;
        const generated = [];
        for (let i = 0; i < starCount; i++) {
            generated.push({
                id: i,
                top: `${(Math.sin(i * 19.3) * 0.5 + 0.5) * 100}%`,
                left: `${(Math.cos(i * 37.7) * 0.5 + 0.5) * 100}%`,
                size: (i % 3) + 1.2, // 1.2px to 3.2px
                opacity: 0.25 + (i % 5) * 0.15,
                duration: 2.5 + (i % 4) * 1.2,
                delay: (i % 7) * 0.8
            });
        }
        return generated;
    }, []);

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
                overflow: "hidden",
                transition: "background 0.5s ease"
            }}
        >
            {/* Primary Nebula Gradients */}
            <Box
                sx={{
                    position: "absolute",
                    top: "-15%",
                    left: "10%",
                    width: "70vw",
                    height: "70vh",
                    borderRadius: "50%",
                    background: isDark
                        ? "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)"
                        : "radial-gradient(circle, rgba(199, 210, 254, 0.45) 0%, rgba(224, 231, 255, 0.25) 50%, transparent 70%)",
                    filter: "blur(70px)",
                    animation: "nebulaDrift 28s infinite alternate ease-in-out"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: "-20%",
                    right: "5%",
                    width: "60vw",
                    height: "60vh",
                    borderRadius: "50%",
                    background: isDark
                        ? "radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, rgba(249, 115, 22, 0.06) 50%, transparent 70%)"
                        : "radial-gradient(circle, rgba(254, 215, 170, 0.35) 0%, rgba(253, 230, 138, 0.2) 50%, transparent 70%)",
                    filter: "blur(80px)",
                    animation: "nebulaDrift 34s infinite alternate-reverse ease-in-out"
                }}
            />

            {/* Star Field */}
            {isDark && (
                <Box sx={{ position: "absolute", inset: 0 }}>
                    {stars.map((star) => (
                        <Box
                            key={star.id}
                            sx={{
                                position: "absolute",
                                top: star.top,
                                left: star.left,
                                width: star.size,
                                height: star.size,
                                borderRadius: "50%",
                                backgroundColor: star.size > 2 ? "#e0e7ff" : "#ffffff",
                                boxShadow: star.size > 2.5 ? "0 0 6px rgba(255, 255, 255, 0.8)" : "none",
                                opacity: star.opacity,
                                animation: `twinkle ${star.duration}s infinite ease-in-out`,
                                animationDelay: `${star.delay}s`
                            }}
                        />
                    ))}

                    {/* Rare Shooting Stars */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: "12%",
                            right: "20%",
                            width: "120px",
                            height: "2px",
                            background: "linear-gradient(90deg, rgba(255, 255, 255, 0.9), transparent)",
                            borderRadius: "50%",
                            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                            animation: "shootingStar 14s infinite ease-out",
                            animationDelay: "4s"
                        }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            top: "35%",
                            right: "45%",
                            width: "90px",
                            height: "1.5px",
                            background: "linear-gradient(90deg, rgba(147, 197, 253, 0.8), transparent)",
                            borderRadius: "50%",
                            boxShadow: "0 0 8px rgba(147, 197, 253, 0.6)",
                            animation: "shootingStar 19s infinite ease-out",
                            animationDelay: "11s"
                        }}
                    />
                </Box>
            )}

            {/* Subtle Horizon / Cyber Mesh Line */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: isDark
                        ? "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)"
                }}
            />
        </Box>
    );
};

export default SpaceBackground;
