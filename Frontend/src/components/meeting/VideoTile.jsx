import React, { useEffect, useRef } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

/**
 * Individual participant video tile with video stream, avatar fallback, mic status, and name tag.
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
                backgroundColor: "#161e2e",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isSpeaking ? "0 0 0 3px #22c55e" : "0 4px 12px rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "box-shadow 0.2s ease"
            }}
        >
            {/* Video Stream Element */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isLocal} // Always mute local stream to avoid audio feedback/echo
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: isLocal ? "scaleX(-1)" : "none", // Mirror local video
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
                        gap: 1.5
                    }}
                >
                    <Avatar
                        sx={{
                            width: { xs: 64, sm: 88 },
                            height: { xs: 64, sm: 88 },
                            fontSize: { xs: "1.5rem", sm: "2.2rem" },
                            fontWeight: 700,
                            backgroundColor: isLocal ? "#f97316" : "#3b82f6"
                        }}
                    >
                        {initials}
                    </Avatar>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#94a3b8" }}>
                        <VideocamOffIcon fontSize="small" />
                        <Typography variant="caption">Camera Off</Typography>
                    </Box>
                </Box>
            )}

            {/* Participant Name Badge & Mic Status */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.65)",
                    backdropFilter: "blur(6px)",
                    borderRadius: "8px",
                    px: 1.5,
                    py: 0.5,
                    color: "#ffffff"
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
                    {participantName} {isLocal && "(You)"}
                </Typography>

                {isAudioMuted && (
                    <MicOffIcon sx={{ fontSize: 16, color: "#ef4444" }} />
                )}
            </Box>
        </Box>
    );
};

export default VideoTile;
