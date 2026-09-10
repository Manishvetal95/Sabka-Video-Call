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
                minHeight: "100vh",
                backgroundColor: "#0b0f19",
                color: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 2, sm: 4 }
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 640,
                    backgroundColor: "#161e2e",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                }}
            >
                <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: "#ffffff", mb: 0.5 }}>
                            Ready to join the meeting?
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                            Meeting Code:{" "}
                            <Box component="span" sx={{ color: "#f97316", fontWeight: 700, fontFamily: "monospace" }}>
                                {meetingCode}
                            </Box>
                        </Typography>
                    </Box>

                    {permissionError && (
                        <Alert severity="warning" sx={{ mb: 3 }}>
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
                                bottom: 12,
                                right: 12,
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
                            label="Your Display Name"
                            value={username}
                            onChange={(e) => onUsernameChange(e.target.value)}
                            required
                            sx={{
                                mb: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.04)",
                                borderRadius: "8px",
                                input: { color: "#ffffff" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgba(255, 255, 255, 0.15)"
                                }
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
                                    backgroundColor: "#f97316",
                                    "&:hover": { backgroundColor: "#ea580c" },
                                    py: 1.4,
                                    fontWeight: 700,
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    fontSize: "1rem"
                                }}
                            >
                                Join Meeting
                            </Button>

                            <Button
                                variant="text"
                                fullWidth
                                onClick={onCancel}
                                sx={{
                                    color: "#94a3b8",
                                    "&:hover": { color: "#ffffff" },
                                    textTransform: "none",
                                    fontWeight: 600
                                }}
                            >
                                Cancel & Return to Dashboard
                            </Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LobbyPreview;
