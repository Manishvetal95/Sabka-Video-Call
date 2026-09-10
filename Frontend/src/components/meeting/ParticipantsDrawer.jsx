import React from "react";
import {
    Box,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Chip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PanToolIcon from "@mui/icons-material/PanTool";

export const ParticipantsDrawer = ({
    open,
    onClose,
    localUsername = "You",
    isAudioMuted = false,
    isVideoMuted = false,
    isHandRaised = false,
    remoteParticipants = []
}) => {
    const totalCount = 1 + remoteParticipants.length;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 340 },
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    borderLeft: "1px solid var(--border-glass)",
                    backdropFilter: "blur(16px)"
                }
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderBottom: "1px solid var(--border-glass)",
                    backgroundColor: "var(--surface-glass)",
                    backdropFilter: "blur(10px)"
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)" }}>
                    Flight Crew ({totalCount})
                </Typography>
                <IconButton onClick={onClose} sx={{ color: "var(--text-muted)", "&:hover": { color: "var(--text-primary)" } }} aria-label="close participants">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Participants List */}
            <List sx={{ p: 2 }}>
                {/* Local User */}
                <ListItem
                    sx={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border-glass)",
                        borderRadius: "10px",
                        mb: 1.5,
                        px: 2,
                        py: 1
                    }}
                >
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "var(--accent-orange)", width: 36, height: 36, fontWeight: 700, fontSize: "0.9rem" }}>
                            {localUsername.charAt(0).toUpperCase()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: "var(--text-primary)" }}>
                                    {localUsername} (You)
                                </Typography>
                                <Chip label="Host" size="small" sx={{ height: 18, fontSize: "0.65rem", backgroundColor: "rgba(249, 115, 22, 0.2)", color: "var(--accent-orange)" }} />
                                {isHandRaised && <PanToolIcon sx={{ fontSize: 16, color: "#eab308" }} />}
                            </Box>
                        }
                    />
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                        {isAudioMuted ? <MicOffIcon sx={{ fontSize: 18, color: "#ef4444" }} /> : <MicIcon sx={{ fontSize: 18, color: "#22c55e" }} />}
                        {isVideoMuted ? <VideocamOffIcon sx={{ fontSize: 18, color: "#ef4444" }} /> : <VideocamIcon sx={{ fontSize: 18, color: "var(--accent-cyan)" }} />}
                    </Box>
                </ListItem>

                {/* Remote Participants */}
                {remoteParticipants.map((p, idx) => (
                    <ListItem
                        key={p.socketId || idx}
                        sx={{
                            backgroundColor: "var(--bg-card)",
                            border: "1px solid var(--border-glass)",
                            borderRadius: "10px",
                            mb: 1,
                            px: 2,
                            py: 1
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "var(--accent-blue)", width: 36, height: 36, fontWeight: 700, fontSize: "0.9rem" }}>
                                {(p.username || "P").charAt(0).toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "var(--text-primary)" }}>
                                    {p.username || `Participant ${idx + 1}`}
                                </Typography>
                            }
                        />
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                            <MicIcon sx={{ fontSize: 18, color: "#22c55e" }} />
                            <VideocamIcon sx={{ fontSize: 18, color: "var(--accent-cyan)" }} />
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default ParticipantsDrawer;
