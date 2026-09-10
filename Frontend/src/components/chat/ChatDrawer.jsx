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
                    backgroundColor: "#0f172a",
                    color: "#f8fafc",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
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
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    backgroundColor: "rgba(15, 23, 42, 0.95)"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem" }}>
                        In-Call Messages
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                        ({messages.length})
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: "#94a3b8", "&:hover": { color: "#ffffff" } }} aria-label="close chat">
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
                                        color: isMe ? "#f97316" : "#38bdf8",
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
                                        backgroundColor: isMe ? "#f97316" : "#1e293b",
                                        color: "#ffffff",
                                        wordBreak: "break-word",
                                        fontSize: "0.9rem"
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
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    display: "flex",
                    gap: 1
                }}
            >
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Send a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        input: { color: "#ffffff", fontSize: "0.9rem" },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255, 255, 255, 0.15)"
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!inputMessage.trim()}
                    sx={{
                        backgroundColor: "#f97316",
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
