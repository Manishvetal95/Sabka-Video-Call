import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Avatar,
    Stack,
    IconButton,
    Snackbar,
    Alert,
    CircularProgress,
    Tooltip
} from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAuth } from "../hooks/useAuth";

export default function HomeComponent() {
    const navigate = useNavigate();
    const { user, handleLogout, addToUserHistory } = useAuth();

    const [joinCode, setJoinCode] = useState("");
    const [joinError, setJoinError] = useState("");
    const [loadingJoin, setLoadingJoin] = useState(false);
    const [loadingNew, setLoadingNew] = useState(false);

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    // Generate random 9-character meeting code (xxx-yyy-zzz format)
    const generateMeetingCode = () => {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        const segment = (len) =>
            Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
        return `${segment(3)}-${segment(3)}-${segment(3)}`;
    };

    const handleCreateInstantMeeting = async () => {
        setLoadingNew(true);
        try {
            const newCode = generateMeetingCode();
            try {
                await addToUserHistory(newCode);
            } catch (historyErr) {
                console.warn("Could not save to history:", historyErr.message);
            }
            navigate(`/${newCode}`);
        } finally {
            setLoadingNew(false);
        }
    };

    const handleJoinMeeting = async (e) => {
        e?.preventDefault();
        const code = joinCode.trim();

        if (!code) {
            setJoinError("Please enter a valid meeting code.");
            return;
        }

        setLoadingJoin(true);
        try {
            try {
                await addToUserHistory(code);
            } catch (historyErr) {
                console.warn("Could not record history:", historyErr.message);
            }
            navigate(`/${code}`);
        } finally {
            setLoadingJoin(false);
        }
    };

    const handleCopyInstantLink = () => {
        const code = generateMeetingCode();
        const fullUrl = `${window.location.origin}/${code}`;
        navigator.clipboard.writeText(fullUrl);
        setSnackbar({
            open: true,
            message: `Meeting link copied: ${fullUrl}`,
            severity: "success"
        });
    };

    const username = user?.username || "Guest";

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#0b0f19", color: "#f8fafc" }}>
            {/* Dashboard Header */}
            <Box
                component="header"
                sx={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    backgroundColor: "rgba(11, 15, 25, 0.9)",
                    backdropFilter: "blur(10px)",
                    position: "sticky",
                    top: 0,
                    zIndex: 100
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            py: 2
                        }}
                    >
                        {/* Logo */}
                        <Box
                            onClick={() => navigate("/home")}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                cursor: "pointer"
                            }}
                        >
                            <Box
                                sx={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: "10px",
                                    backgroundColor: "#f97316",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <VideoCameraFrontIcon sx={{ color: "#ffffff", fontSize: 22 }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                                Sabka Video Call
                            </Typography>
                        </Box>

                        {/* User Controls */}
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Tooltip title="View Meeting History">
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/history")}
                                    startIcon={<HistoryIcon />}
                                    sx={{
                                        color: "#e2e8f0",
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": {
                                            borderColor: "#ffffff",
                                            backgroundColor: "rgba(255, 255, 255, 0.05)"
                                        }
                                    }}
                                >
                                    History
                                </Button>
                            </Tooltip>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: "#f97316",
                                        width: 36,
                                        height: 36,
                                        fontSize: "0.95rem",
                                        fontWeight: 700
                                    }}
                                >
                                    {username.charAt(0).toUpperCase()}
                                </Avatar>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        color: "#e2e8f0",
                                        display: { xs: "none", sm: "block" }
                                    }}
                                >
                                    {username}
                                </Typography>
                            </Box>

                            <Tooltip title="Sign Out">
                                <IconButton
                                    onClick={handleLogout}
                                    aria-label="sign out"
                                    sx={{
                                        color: "#ef4444",
                                        "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.1)" }
                                    }}
                                >
                                    <LogoutIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* Main Content Area */}
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
                {/* Welcome Message */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: -1,
                            mb: 1
                        }}
                    >
                        Welcome back,{" "}
                        <Box
                            component="span"
                            sx={{
                                background: "linear-gradient(90deg, #f97316 0%, #fb923c 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            {username}
                        </Box>
                        !
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#94a3b8", maxWidth: 600 }}>
                        Start a secure video meeting with your team, join using an invite code, or review your previous call logs.
                    </Typography>
                </Box>

                {/* Dashboard Action Cards */}
                <Grid container spacing={4}>
                    {/* Card 1: Start Instant Meeting */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "20px",
                                transition: "all 0.2s",
                                "&:hover": {
                                    borderColor: "rgba(249, 115, 22, 0.4)",
                                    transform: "translateY(-4px)"
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                                <Box
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(249, 115, 22, 0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3
                                    }}
                                >
                                    <AddBoxIcon sx={{ fontSize: 32, color: "#f97316" }} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: "#ffffff", mb: 1 }}>
                                    New Meeting
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#94a3b8", mb: 4, flexGrow: 1 }}>
                                    Generate an instant room and invite participants with full video, audio, screen share, and chat.
                                </Typography>

                                <Stack spacing={1.5}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        disabled={loadingNew}
                                        onClick={handleCreateInstantMeeting}
                                        sx={{
                                            backgroundColor: "#f97316",
                                            "&:hover": { backgroundColor: "#ea580c" },
                                            py: 1.3,
                                            fontWeight: 700,
                                            borderRadius: "10px",
                                            textTransform: "none"
                                        }}
                                    >
                                        {loadingNew ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Start Instant Call"}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<ContentCopyIcon />}
                                        onClick={handleCopyInstantLink}
                                        sx={{
                                            borderColor: "rgba(255, 255, 255, 0.15)",
                                            color: "#94a3b8",
                                            "&:hover": {
                                                borderColor: "rgba(255, 255, 255, 0.3)",
                                                color: "#ffffff"
                                            },
                                            textTransform: "none",
                                            fontWeight: 600,
                                            borderRadius: "10px"
                                        }}
                                    >
                                        Create & Copy Link
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card 2: Join Meeting with Code */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "20px",
                                transition: "all 0.2s",
                                "&:hover": {
                                    borderColor: "rgba(59, 130, 246, 0.4)",
                                    transform: "translateY(-4px)"
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                                <Box
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(59, 130, 246, 0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3
                                    }}
                                >
                                    <MeetingRoomIcon sx={{ fontSize: 32, color: "#3b82f6" }} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: "#ffffff", mb: 1 }}>
                                    Join Meeting
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#94a3b8", mb: 4, flexGrow: 1 }}>
                                    Enter a meeting code or room link provided by the call host to join their session.
                                </Typography>

                                <Box component="form" onSubmit={handleJoinMeeting} sx={{ mt: "auto" }}>
                                    <TextField
                                        fullWidth
                                        placeholder="e.g. meeting-101"
                                        value={joinCode}
                                        onChange={(e) => {
                                            setJoinCode(e.target.value);
                                            setJoinError("");
                                        }}
                                        error={Boolean(joinError)}
                                        helperText={joinError}
                                        sx={{
                                            mb: 2,
                                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                                            borderRadius: "10px",
                                            input: { color: "#ffffff" },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "rgba(255, 255, 255, 0.15)"
                                            }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        disabled={loadingJoin}
                                        sx={{
                                            backgroundColor: "#3b82f6",
                                            "&:hover": { backgroundColor: "#2563eb" },
                                            py: 1.3,
                                            fontWeight: 700,
                                            borderRadius: "10px",
                                            textTransform: "none"
                                        }}
                                    >
                                        {loadingJoin ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Join Call"}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card 3: Meeting History Shortcut */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "20px",
                                transition: "all 0.2s",
                                "&:hover": {
                                    borderColor: "rgba(139, 92, 246, 0.4)",
                                    transform: "translateY(-4px)"
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                                <Box
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(139, 92, 246, 0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3
                                    }}
                                >
                                    <HistoryIcon sx={{ fontSize: 32, color: "#8b5cf6" }} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: "#ffffff", mb: 1 }}>
                                    Activity Logs
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#94a3b8", mb: 4, flexGrow: 1 }}>
                                    Review all your previous meeting timestamps, codes, and easily rejoin recurring meetings.
                                </Typography>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate("/history")}
                                    sx={{
                                        backgroundColor: "#8b5cf6",
                                        "&:hover": { backgroundColor: "#7c3aed" },
                                        py: 1.3,
                                        fontWeight: 700,
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        mt: "auto"
                                    }}
                                >
                                    View Past History
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Notification Toast */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}