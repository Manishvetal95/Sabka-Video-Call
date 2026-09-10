import React, { useEffect, useRef } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

/**
 * Individual participant video tile with video stream, avatar fallback, mic status, and sci-fi framing.
 */
export const VideoTile = ({
    stream,
    isLocal = false,
    participantName = "Participant",
    isAudioMuted = false,
    isVideoMuted = false,
    isSpeaking = false
}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const initials = participantName
        ? participantName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
        : "P";

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: { xs: 200, sm: 260 },
                backgroundColor: "rgba(11, 15, 25, 0.9)",
                backdropFilter: "blur(12px)",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: isSpeaking ? "2px solid #06b6d4" : "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: isSpeaking
                    ? "0 0 25px rgba(6, 182, 212, 0.5), inset 0 0 15px rgba(6, 182, 212, 0.2)"
                    : "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
                transition: "all 0.3s ease"
            }}
        >
            {/* Sci-Fi Decorative Corner Accents */}
            <Box
                sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    width: 12,
                    height: 12,
                    borderTop: "2px solid rgba(255, 255, 255, 0.3)",
                    borderLeft: "2px solid rgba(255, 255, 255, 0.3)",
                    pointerEvents: "none",
                    zIndex: 2
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    width: 12,
                    height: 12,
                    borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                    borderRight: "2px solid rgba(255, 255, 255, 0.3)",
                    pointerEvents: "none",
                    zIndex: 2
                }}
            />

            {/* Video Stream Element */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isLocal}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: isLocal ? "scaleX(-1)" : "none",
                    display: isVideoMuted ? "none" : "block"
                }}
            />

            {/* Video Off Fallback Avatar */}
            {isVideoMuted && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                        zIndex: 1
                    }}
                >
                    <Avatar
                        sx={{
                            width: { xs: 68, sm: 96 },
                            height: { xs: 68, sm: 96 },
                            fontSize: { xs: "1.6rem", sm: "2.4rem" },
                            fontWeight: 800,
                            background: isLocal
                                ? "linear-gradient(135deg, #f97316 0%, #ec4899 100%)"
                                : "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                            boxShadow: isLocal
                                ? "0 0 30px rgba(249, 115, 22, 0.5)"
                                : "0 0 30px rgba(59, 130, 246, 0.5)",
                            border: "2px solid rgba(255, 255, 255, 0.2)"
                        }}
                    >
                        {initials}
                    </Avatar>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, color: "#94a3b8" }}>
                        <VideocamOffIcon fontSize="small" sx={{ color: "#ef4444" }} />
                        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                            CAMERA OFF
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* Participant Name Tag & Mic Badge */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "10px",
                    px: 1.5,
                    py: 0.6,
                    color: "#ffffff",
                    zIndex: 3
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                    {participantName} {isLocal && "(You)"}
                </Typography>

                {isAudioMuted && <MicOffIcon sx={{ fontSize: 16, color: "#ef4444" }} />}
            </Box>
        </Box>
    );
};

export default VideoTile;
