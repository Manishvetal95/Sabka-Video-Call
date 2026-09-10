import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Stack,
    IconButton,
    Tooltip,
    Alert
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideoTile from "./VideoTile";
import SpaceBackground from "../common/SpaceBackground";
import ThemeToggle from "../common/ThemeToggle";

export const LobbyPreview = ({
    stream,
    meetingCode,
    username,
    onUsernameChange,
    isAudioMuted,
    isVideoMuted,
    onToggleAudio,
    onToggleVideo,
    onJoinMeeting,
    onCancel,
    permissionError
}) => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onJoinMeeting();
    };

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 2, sm: 4 },
                overflowX: "hidden"
            }}
        >
            <SpaceBackground />

            {/* Top Bar with Theme Toggle */}
            <Box sx={{ position: "absolute", top: 20, right: 24, zIndex: 100 }}>
                <ThemeToggle />
            </Box>

            <Card
                className="glass-panel"
                sx={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: 640,
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px var(--border-glow)"
                }}
            >
                <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 900, color: "var(--text-primary)", mb: 0.5 }}>
                            ✦ Pre-Flight System Check
                        </Typography>
                        <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
                            Mission Code:{" "}
                            <Box component="span" sx={{ color: "var(--accent-orange)", fontWeight: 800, fontFamily: "var(--mono)", letterSpacing: 0.5 }}>
                                {meetingCode}
                            </Box>
                        </Typography>
                    </Box>

                    {permissionError && (
                        <Alert severity="warning" sx={{ mb: 3, borderRadius: "12px" }}>
                            {permissionError}
                        </Alert>
                    )}

                    {/* Camera Preview Tile */}
                    <Box sx={{ position: "relative", width: "100%", height: 300, mb: 3 }}>
                        <VideoTile
                            stream={stream}
                            isLocal={true}
                            participantName={username || "You"}
                            isAudioMuted={isAudioMuted}
                            isVideoMuted={isVideoMuted}
                        />

                        {/* In-Preview Quick Toggle Overlay */}
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 14,
                                right: 14,
                                display: "flex",
                                gap: 1,
                                zIndex: 10
                            }}
                        >
                            <Tooltip title={isAudioMuted ? "Unmute Mic" : "Mute Mic"}>
                                <IconButton
                                    onClick={onToggleAudio}
                                    sx={{
                                        backgroundColor: isAudioMuted ? "#ef4444" : "rgba(15, 23, 42, 0.8)",
                                        color: "#ffffff",
                                        backdropFilter: "blur(8px)",
                                        boxShadow: isAudioMuted ? "0 0 15px rgba(239, 68, 68, 0.5)" : "none",
                                        "&:hover": { backgroundColor: isAudioMuted ? "#dc2626" : "rgba(15, 23, 42, 1)" }
                                    }}
                                >
                                    {isAudioMuted ? <MicOffIcon fontSize="small" /> : <MicIcon fontSize="small" />}
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={isVideoMuted ? "Turn On Camera" : "Turn Off Camera"}>
                                <IconButton
                                    onClick={onToggleVideo}
                                    sx={{
                                        backgroundColor: isVideoMuted ? "#ef4444" : "rgba(15, 23, 42, 0.8)",
                                        color: "#ffffff",
                                        backdropFilter: "blur(8px)",
                                        boxShadow: isVideoMuted ? "0 0 15px rgba(239, 68, 68, 0.5)" : "none",
                                        "&:hover": { backgroundColor: isVideoMuted ? "#dc2626" : "rgba(15, 23, 42, 1)" }
                                    }}
                                >
                                    {isVideoMuted ? <VideocamOffIcon fontSize="small" /> : <VideocamIcon fontSize="small" />}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    {/* Join Form */}
                    <Box component="form" onSubmit={handleFormSubmit}>
                        <TextField
                            fullWidth
                            label="Callsign / Display Name"
                            value={username}
                            onChange={(e) => onUsernameChange(e.target.value)}
                            required
                            sx={{
                                mb: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.04)",
                                borderRadius: "10px",
                                input: { color: "var(--text-primary)" }
                            }}
                        />

                        <Stack spacing={1.5}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={!username.trim()}
                                sx={{
                                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                                        boxShadow: "0 0 25px rgba(249, 115, 22, 0.6)"
                                    },
                                    py: 1.5,
                                    fontWeight: 800,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontSize: "1rem"
                                }}
                            >
                                ✦ Enter Meeting Room
                            </Button>

                            <Button
                                variant="text"
                                fullWidth
                                onClick={onCancel}
                                sx={{
                                    color: "var(--text-secondary)",
                                    "&:hover": { color: "var(--text-primary)" },
                                    textTransform: "none",
                                    fontWeight: 700
                                }}
                            >
                                Cancel & Return to Mission Control
                            </Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LobbyPreview;
