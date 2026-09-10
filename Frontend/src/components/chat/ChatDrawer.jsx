import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    IconButton,
    TextField,
    Button,
    Drawer,
    Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";

export const ChatDrawer = ({
    open,
    onClose,
    messages = [],
    onSendMessage,
    currentUsername
}) => {
    const [inputMessage, setInputMessage] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (open) {
            scrollToBottom();
        }
    }, [messages, open]);

    const handleSend = (e) => {
        e?.preventDefault();
        const trimmed = inputMessage.trim();
        if (!trimmed) return;

        onSendMessage(trimmed);
        setInputMessage("");
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 360 },
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    borderLeft: "1px solid var(--border-glass)",
                    backdropFilter: "blur(16px)",
                    display: "flex",
                    flexDirection: "column"
                }
            }}
        >
            {/* Chat Header */}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)" }}>
                        In-Call Messages
                    </Typography>
                    <Typography variant="caption" sx={{ color: "var(--text-muted)" }}>
                        ({messages.length})
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: "var(--text-muted)", "&:hover": { color: "var(--text-primary)" } }} aria-label="close chat">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Messages Display Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5
                }}
            >
                {messages.length === 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            color: "#64748b",
                            textAlign: "center",
                            p: 3
                        }}
                    >
                        <ChatIcon sx={{ fontSize: 48, mb: 1, color: "#475569" }} />
                        <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                            No messages yet
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#64748b" }}>
                            Messages sent here are visible to all participants in this call.
                        </Typography>
                    </Box>
                ) : (
                    messages.map((msg, index) => {
                        const isMe = msg.sender === currentUsername;
                        return (
                            <Box
                                key={index}
                                sx={{
                                    alignSelf: isMe ? "flex-end" : "flex-start",
                                    maxWidth: "85%"
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "block",
                                        color: isMe ? "var(--accent-orange)" : "var(--accent-cyan)",
                                        fontWeight: 700,
                                        mb: 0.3,
                                        px: 0.5,
                                        textAlign: isMe ? "right" : "left"
                                    }}
                                >
                                    {isMe ? "You" : msg.sender || "Participant"}
                                </Typography>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: isMe ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                                        backgroundColor: isMe ? "var(--accent-orange)" : "var(--bg-card)",
                                        color: isMe ? "#ffffff" : "var(--text-primary)",
                                        border: isMe ? "none" : "1px solid var(--border-glass)",
                                        wordBreak: "break-word",
                                        fontSize: "0.9rem",
                                        boxShadow: isMe ? "0 4px 15px rgba(249, 115, 22, 0.3)" : "none"
                                    }}
                                >
                                    {msg.data}
                                </Paper>
                            </Box>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </Box>

            {/* Chat Input Field */}
            <Box
                component="form"
                onSubmit={handleSend}
                sx={{
                    p: 2,
                    borderTop: "1px solid var(--border-glass)",
                    backgroundColor: "var(--surface-glass)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    gap: 1
                }}
            >
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Send a transmission..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    sx={{
                        backgroundColor: "var(--bg-card)",
                        borderRadius: "8px",
                        input: { color: "var(--text-primary)", fontSize: "0.9rem" },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--border-glass)"
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--accent-cyan)"
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!inputMessage.trim()}
                    sx={{
                        backgroundColor: "var(--accent-orange)",
                        "&:hover": { backgroundColor: "#ea580c" },
                        minWidth: 44,
                        p: 1,
                        borderRadius: "8px"
                    }}
                >
                    <SendIcon fontSize="small" />
                </Button>
            </Box>
        </Drawer>
    );
};

export default ChatDrawer;
