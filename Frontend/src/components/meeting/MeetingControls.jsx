import React, { useState } from "react";
import {
    Box,
    IconButton,
    Tooltip,
    Badge,
    Menu,
    MenuItem,
    Stack
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import CallEndIcon from "@mui/icons-material/CallEnd";
import PanToolIcon from "@mui/icons-material/PanTool";
import AddReactionIcon from "@mui/icons-material/AddReaction";

export const MeetingControls = ({
    isAudioMuted,
    isVideoMuted,
    isScreenSharing,
    isHandRaised,
    unreadMessages = 0,
    isChatOpen,
    isParticipantsOpen,
    onToggleAudio,
    onToggleVideo,
    onToggleScreenShare,
    onToggleHand,
    onSendReaction,
    onToggleChat,
    onToggleParticipants,
    onEndCall
}) => {
    const [reactionAnchorEl, setReactionAnchorEl] = useState(null);

    const availableReactions = ["👍", "❤️", "👏", "🎉", "🔥", "😂"];

    const handleOpenReactions = (event) => {
        setReactionAnchorEl(event.currentTarget);
    };

    const handleCloseReactions = () => {
        setReactionAnchorEl(null);
    };

    const handleSelectReaction = (emoji) => {
        if (onSendReaction) {
            onSendReaction(emoji);
        }
        handleCloseReactions();
    };

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: { xs: 14, sm: 24 },
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                backgroundColor: "rgba(11, 15, 25, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "36px",
                px: { xs: 1.5, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.2)",
                maxWidth: "96vw"
            }}
        >
            <Stack direction="row" spacing={{ xs: 1, sm: 1.8 }} alignItems="center">
                {/* Microphone Toggle */}
                <Tooltip title={isAudioMuted ? "Unmute Microphone" : "Mute Microphone"}>
                    <IconButton
                        onClick={onToggleAudio}
                        aria-label={isAudioMuted ? "unmute microphone" : "mute microphone"}
                        sx={{
                            backgroundColor: isAudioMuted ? "#ef4444" : "rgba(255, 255, 255, 0.08)",
                            color: "#ffffff",
                            boxShadow: isAudioMuted ? "0 0 15px rgba(239, 68, 68, 0.5)" : "none",
                            "&:hover": {
                                backgroundColor: isAudioMuted ? "#dc2626" : "rgba(255, 255, 255, 0.18)",
                                transform: "translateY(-2px)"
                            },
                            width: { xs: 44, sm: 50 },
                            height: { xs: 44, sm: 50 },
                            transition: "all 0.2s ease"
                        }}
                    >
                        {isAudioMuted ? <MicOffIcon fontSize="small" /> : <MicIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>

                {/* Camera Toggle */}
                <Tooltip title={isVideoMuted ? "Turn On Camera" : "Turn Off Camera"}>
                    <IconButton
                        onClick={onToggleVideo}
                        aria-label={isVideoMuted ? "turn on camera" : "turn off camera"}
                        sx={{
                            backgroundColor: isVideoMuted ? "#ef4444" : "rgba(255, 255, 255, 0.08)",
                            color: "#ffffff",
                            boxShadow: isVideoMuted ? "0 0 15px rgba(239, 68, 68, 0.5)" : "none",
                            "&:hover": {
                                backgroundColor: isVideoMuted ? "#dc2626" : "rgba(255, 255, 255, 0.18)",
                                transform: "translateY(-2px)"
                            },
                            width: { xs: 44, sm: 50 },
                            height: { xs: 44, sm: 50 },
                            transition: "all 0.2s ease"
                        }}
                    >
                        {isVideoMuted ? <VideocamOffIcon fontSize="small" /> : <VideocamIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>

                {/* Screen Share Toggle */}
                <Tooltip title={isScreenSharing ? "Stop Sharing Screen" : "Share Screen"}>
                    <IconButton
                        onClick={onToggleScreenShare}
                        aria-label={isScreenSharing ? "stop sharing screen" : "share screen"}
                        sx={{
                            backgroundColor: isScreenSharing ? "#22c55e" : "rgba(255, 255, 255, 0.08)",
                            color: "#ffffff",
                            boxShadow: isScreenSharing ? "0 0 20px rgba(34, 197, 94, 0.6)" : "none",
                            "&:hover": {
                                backgroundColor: isScreenSharing ? "#16a34a" : "rgba(255, 255, 255, 0.18)",
                                transform: "translateY(-2px)"
                            },
                            width: { xs: 44, sm: 50 },
                            height: { xs: 44, sm: 50 },
                            transition: "all 0.2s ease"
                        }}
                    >
                        {isScreenSharing ? <StopScreenShareIcon fontSize="small" /> : <ScreenShareIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>

                {/* Raise Hand Toggle */}
                <Tooltip title={isHandRaised ? "Lower Hand" : "Raise Hand"}>
                    <IconButton
                        onClick={onToggleHand}
                        aria-label={isHandRaised ? "lower hand" : "raise hand"}
                        sx={{
                            backgroundColor: isHandRaised ? "#eab308" : "rgba(255, 255, 255, 0.08)",
                            color: isHandRaised ? "#000000" : "#ffffff",
                            boxShadow: isHandRaised ? "0 0 20px rgba(234, 179, 8, 0.7)" : "none",
                            "&:hover": {
                                backgroundColor: isHandRaised ? "#ca8a04" : "rgba(255, 255, 255, 0.18)",
                                transform: "translateY(-2px)"
                            },
                            width: { xs: 44, sm: 50 },
                            height: { xs: 44, sm: 50 },
                            transition: "all 0.2s ease"
                        }}
                    >
                        <PanToolIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* Emoji Reactions Menu */}
                <Tooltip title="Send Cosmic Reaction">
                    <IconButton
                        onClick={handleOpenReactions}
                        aria-label="send reaction"
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            color: "#ffffff",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.18)",
                                transform: "translateY(-2px)"
                            },
                            width: { xs: 44, sm: 50 },
                            height: { xs: 44, sm: 50 },
                            transition: "all 0.2s ease"
                        }}
                    >
                        <AddReactionIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={reactionAnchorEl}
                    open={Boolean(reactionAnchorEl)}
                    onClose={handleCloseReactions}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                    PaperProps={{
                        sx: {
                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                            backdropFilter: "blur(16px)",
                            borderRadius: "18px",
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.3)",
                            p: 0.5
                        }
                    }}
                >
                    <Stack direction="row" spacing={0.5}>
                        {availableReactions.map((emoji) => (
                            <MenuItem
                                key={emoji}
                                onClick={() => handleSelectReaction(emoji)}
                                sx={{
                                    fontSize: "1.45rem",
                                    borderRadius: "10px",
                                    p: 1.2,
                                    transition: "transform 0.15s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        transform: "scale(1.25)"
                                    }
                                }}
                            >
                                {emoji}
                            </MenuItem>
                        ))}
                    </Stack>
                </Menu>

                {/* Chat Drawer Toggle */}
                <Tooltip title={isChatOpen ? "Close In-Call Chat" : "Open In-Call Chat"}>
                    <IconButton
                        onClick={onToggleChat}
                        aria-label="toggle chat"
                        sx={{
                            backgroundColor: isChatOpen ? "#f97316" : "rgba(255, 255, 255, 0.08)",
                            color: "#ffffff",
                            boxShadow: isChatOpen ? "0 0 20px rgba(249, 115, 22, 0.6)" : "none",
                            "&:hover": {
                                backgroundColor: isChatOpen ? "#ea580c" : "rgba(255, 255, 255, 0.18)",
                                transform: "translateY(-2px)"
                            },
                            width: { xs: 44, sm: 50 },
                            height: { xs: 44, sm: 50 },
                            transition: "all 0.2s ease"
                        }}
                    >
                        <Badge badgeContent={unreadMessages} color="primary">
                            <ChatIcon fontSize="small" />
                        </Badge>
                    </IconButton>
                </Tooltip>

                {/* Participants Drawer Toggle */}
                <Tooltip title={isParticipantsOpen ? "Hide Squad Roster" : "Show Squad Roster"}>
                    <IconButton
                        onClick={onToggleParticipants}
                        aria-label="toggle participants"
                        sx={{
                            backgroundColor: isParticipantsOpen ? "#3b82f6" : "rgba(255, 255, 255, 0.08)",
                            color: "#ffffff",
                            boxShadow: isParticipantsOpen ? "0 0 20px rgba(59, 130, 246, 0.6)" : "none",
                            "&:hover": {
                                backgroundColor: isParticipantsOpen ? "#2563eb" : "rgba(255, 255, 255, 0.18)",
                                transform: "translateY(-2px)"
                            },
                            width: { xs: 44, sm: 50 },
                            height: { xs: 44, sm: 50 },
                            transition: "all 0.2s ease"
                        }}
                    >
                        <PeopleIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* End / Leave Call Button */}
                <Tooltip title="Disconnect Call">
                    <IconButton
                        onClick={onEndCall}
                        aria-label="leave meeting"
                        sx={{
                            backgroundColor: "#ef4444",
                            color: "#ffffff",
                            boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)",
                            "&:hover": {
                                backgroundColor: "#dc2626",
                                transform: "translateY(-2px) scale(1.05)"
                            },
                            width: { xs: 48, sm: 56 },
                            height: { xs: 44, sm: 50 },
                            borderRadius: "22px",
                            transition: "all 0.2s ease"
                        }}
                    >
                        <CallEndIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Box>
    );
};

export default MeetingControls;
