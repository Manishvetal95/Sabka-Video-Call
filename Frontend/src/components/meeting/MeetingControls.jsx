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
                bottom: { xs: 12, sm: 24 },
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "32px",
                px: { xs: 1.5, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
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
                            backgroundColor: isAudioMuted ? "#ef4444" : "rgba(255, 255, 255, 0.1)",
                            color: "#ffffff",
                            "&:hover": {
                                backgroundColor: isAudioMuted ? "#dc2626" : "rgba(255, 255, 255, 0.2)"
                            },
                            width: { xs: 42, sm: 48 },
                            height: { xs: 42, sm: 48 }
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
                            backgroundColor: isVideoMuted ? "#ef4444" : "rgba(255, 255, 255, 0.1)",
                            color: "#ffffff",
                            "&:hover": {
                                backgroundColor: isVideoMuted ? "#dc2626" : "rgba(255, 255, 255, 0.2)"
                            },
                            width: { xs: 42, sm: 48 },
                            height: { xs: 42, sm: 48 }
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
                            backgroundColor: isScreenSharing ? "#22c55e" : "rgba(255, 255, 255, 0.1)",
                            color: "#ffffff",
                            "&:hover": {
                                backgroundColor: isScreenSharing ? "#16a34a" : "rgba(255, 255, 255, 0.2)"
                            },
                            width: { xs: 42, sm: 48 },
                            height: { xs: 42, sm: 48 }
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
                            backgroundColor: isHandRaised ? "#eab308" : "rgba(255, 255, 255, 0.1)",
                            color: isHandRaised ? "#000000" : "#ffffff",
                            "&:hover": {
                                backgroundColor: isHandRaised ? "#ca8a04" : "rgba(255, 255, 255, 0.2)"
                            },
                            width: { xs: 42, sm: 48 },
                            height: { xs: 42, sm: 48 }
                        }}
                    >
                        <PanToolIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* Emoji Reactions Menu */}
                <Tooltip title="Send Reaction">
                    <IconButton
                        onClick={handleOpenReactions}
                        aria-label="send reaction"
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "#ffffff",
                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                            width: { xs: 42, sm: 48 },
                            height: { xs: 42, sm: 48 }
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
                            backgroundColor: "#1e293b",
                            borderRadius: "16px",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
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
                                    fontSize: "1.4rem",
                                    borderRadius: "8px",
                                    p: 1,
                                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                                }}
                            >
                                {emoji}
                            </MenuItem>
                        ))}
                    </Stack>
                </Menu>

                {/* Chat Drawer Toggle */}
                <Tooltip title={isChatOpen ? "Close Chat" : "Open Chat"}>
                    <IconButton
                        onClick={onToggleChat}
                        aria-label="toggle chat"
                        sx={{
                            backgroundColor: isChatOpen ? "#f97316" : "rgba(255, 255, 255, 0.1)",
                            color: "#ffffff",
                            "&:hover": {
                                backgroundColor: isChatOpen ? "#ea580c" : "rgba(255, 255, 255, 0.2)"
                            },
                            width: { xs: 42, sm: 48 },
                            height: { xs: 42, sm: 48 }
                        }}
                    >
                        <Badge badgeContent={unreadMessages} color="primary">
                            <ChatIcon fontSize="small" />
                        </Badge>
                    </IconButton>
                </Tooltip>

                {/* Participants Drawer Toggle */}
                <Tooltip title={isParticipantsOpen ? "Hide Participants" : "Show Participants"}>
                    <IconButton
                        onClick={onToggleParticipants}
                        aria-label="toggle participants"
                        sx={{
                            backgroundColor: isParticipantsOpen ? "#3b82f6" : "rgba(255, 255, 255, 0.1)",
                            color: "#ffffff",
                            "&:hover": {
                                backgroundColor: isParticipantsOpen ? "#2563eb" : "rgba(255, 255, 255, 0.2)"
                            },
                            width: { xs: 42, sm: 48 },
                            height: { xs: 42, sm: 48 }
                        }}
                    >
                        <PeopleIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* End / Leave Call Button */}
                <Tooltip title="Leave Meeting">
                    <IconButton
                        onClick={onEndCall}
                        aria-label="leave meeting"
                        sx={{
                            backgroundColor: "#ef4444",
                            color: "#ffffff",
                            "&:hover": { backgroundColor: "#dc2626" },
                            width: { xs: 46, sm: 54 },
                            height: { xs: 42, sm: 48 },
                            borderRadius: "20px"
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
