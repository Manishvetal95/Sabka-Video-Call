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
    Tooltip,
    Chip
} from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAuth } from "../hooks/useAuth";
import SpaceBackground from "../components/common/SpaceBackground";
import ThemeToggle from "../components/common/ThemeToggle";

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

    const username = user?.username || "Commander";

    return (
        <Box sx={{ position: "relative", minHeight: "100vh", color: "var(--text-primary)", overflowX: "hidden" }}>
            <SpaceBackground />

            {/* Mission Control Header */}
            <Box
                component="header"
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    backdropFilter: "blur(16px)",
                    backgroundColor: "var(--surface-glass)",
                    borderBottom: "1px solid var(--border)"
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
                                    width: 40,
                                    height: 40,
                                    borderRadius: "12px",
                                    background: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)"
                                }}
                            >
                                <VideoCameraFrontIcon sx={{ color: "#ffffff", fontSize: 24 }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
                                ✦ Mission Control
                            </Typography>
                        </Box>

                        {/* User Controls */}
                        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
                            <ThemeToggle />

                            <Tooltip title="Flight Archive">
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/history")}
                                    startIcon={<HistoryIcon />}
                                    sx={{
                                        color: "var(--text-primary)",
                                        borderColor: "var(--border)",
                                        backgroundColor: "var(--surface-glass)",
                                        backdropFilter: "blur(8px)",
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: "10px",
                                        "&:hover": {
                                            borderColor: "var(--border-hover)",
                                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                                            boxShadow: "0 0 15px var(--border-glow)"
                                        }
                                    }}
                                >
                                    Logs
                                </Button>
                            </Tooltip>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Avatar
                                    sx={{
                                        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                        width: 38,
                                        height: 38,
                                        fontSize: "0.95rem",
                                        fontWeight: 800,
                                        boxShadow: "0 0 15px rgba(249, 115, 22, 0.4)"
                                    }}
                                >
                                    {username.charAt(0).toUpperCase()}
                                </Avatar>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700,
                                        color: "var(--text-primary)",
                                        display: { xs: "none", sm: "block" }
                                    }}
                                >
                                    {username}
                                </Typography>
                            </Box>

                            <Tooltip title="Disconnect Session">
                                <IconButton
                                    onClick={handleLogout}
                                    aria-label="sign out"
                                    sx={{
                                        color: "#ef4444",
                                        "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.15)" }
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
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: { xs: 6, md: 10 } }}>
                {/* Welcome Message */}
                <Box sx={{ mb: 6 }}>
                    <Chip
                        label="● SYSTEM STATUS: ONLINE"
                        size="small"
                        sx={{
                            backgroundColor: "rgba(16, 185, 129, 0.15)",
                            color: "#34d399",
                            fontWeight: 800,
                            letterSpacing: 1,
                            fontSize: "0.75rem",
                            mb: 2,
                            border: "1px solid rgba(16, 185, 129, 0.3)"
                        }}
                    />

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: -1,
                            mb: 1
                        }}
                    >
                        Welcome back,{" "}
                        <Box component="span" className="heroic-text">
                            {username}
                        </Box>
                    </Typography>
                    <Typography variant="body1" sx={{ color: "var(--text-secondary)", maxWidth: 580, fontSize: "1.05rem" }}>
                        Ready for your next mission? Launch an instant conference room, link to a team channel, or review your flight archive.
                    </Typography>
                </Box>

                {/* Dashboard Action Cards */}
                <Grid container spacing={4}>
                    {/* Card 1: Start Instant Meeting */}
                    <Grid item xs={12} md={4}>
                        <Card
                            className="glass-panel glass-panel-hover"
                            sx={{
                                height: "100%",
                                borderRadius: "24px"
                            }}
                        >
                            <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                                <Box
                                    sx={{
                                        width: 58,
                                        height: 58,
                                        borderRadius: "16px",
                                        backgroundColor: "rgba(249, 115, 22, 0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3,
                                        boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)"
                                    }}
                                >
                                    <AddBoxIcon sx={{ fontSize: 32, color: "#f97316" }} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: "var(--text-primary)", mb: 1 }}>
                                    ✦ New Meeting
                                </Typography>
                                <Typography variant="body2" sx={{ color: "var(--text-secondary)", mb: 4, flexGrow: 1, lineHeight: 1.6 }}>
                                    Generate an instant encrypted room with full HD video, audio, screen share, and cosmic live chat.
                                </Typography>

                                <Stack spacing={1.5}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        disabled={loadingNew}
                                        onClick={handleCreateInstantMeeting}
                                        sx={{
                                            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                                                boxShadow: "0 0 25px rgba(249, 115, 22, 0.6)",
                                                transform: "translateY(-1px)"
                                            },
                                            py: 1.4,
                                            fontWeight: 800,
                                            borderRadius: "12px",
                                            textTransform: "none",
                                            fontSize: "0.95rem"
                                        }}
                                    >
                                        {loadingNew ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Launch Instant Room"}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<ContentCopyIcon />}
                                        onClick={handleCopyInstantLink}
                                        sx={{
                                            borderColor: "var(--border)",
                                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                                            color: "var(--text-secondary)",
                                            "&:hover": {
                                                borderColor: "var(--border-hover)",
                                                color: "var(--text-primary)"
                                            },
                                            textTransform: "none",
                                            fontWeight: 700,
                                            borderRadius: "12px"
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
                            className="glass-panel glass-panel-hover"
                            sx={{
                                height: "100%",
                                borderRadius: "24px"
                            }}
                        >
                            <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                                <Box
                                    sx={{
                                        width: 58,
                                        height: 58,
                                        borderRadius: "16px",
                                        backgroundColor: "rgba(6, 182, 212, 0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3,
                                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)"
                                    }}
                                >
                                    <MeetingRoomIcon sx={{ fontSize: 32, color: "#06b6d4" }} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: "var(--text-primary)", mb: 1 }}>
                                    ◉ Join Meeting
                                </Typography>
                                <Typography variant="body2" sx={{ color: "var(--text-secondary)", mb: 4, flexGrow: 1, lineHeight: 1.6 }}>
                                    Enter a meeting room code or link ID transmitted by the call host to connect to their session.
                                </Typography>

                                <Box component="form" onSubmit={handleJoinMeeting} sx={{ mt: "auto" }}>
                                    <TextField
                                        fullWidth
                                        placeholder="e.g. mission-101"
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
                                            borderRadius: "12px",
                                            input: { color: "var(--text-primary)" }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        disabled={loadingJoin}
                                        sx={{
                                            background: "linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #38bdf8 0%, #06b6d4 100%)",
                                                boxShadow: "0 0 25px rgba(6, 182, 212, 0.6)",
                                                transform: "translateY(-1px)"
                                            },
                                            py: 1.4,
                                            fontWeight: 800,
                                            borderRadius: "12px",
                                            textTransform: "none",
                                            fontSize: "0.95rem"
                                        }}
                                    >
                                        {loadingJoin ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Connect to Room"}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card 3: Meeting History Shortcut */}
                    <Grid item xs={12} md={4}>
                        <Card
                            className="glass-panel glass-panel-hover"
                            sx={{
                                height: "100%",
                                borderRadius: "24px"
                            }}
                        >
                            <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                                <Box
                                    sx={{
                                        width: 58,
                                        height: 58,
                                        borderRadius: "16px",
                                        backgroundColor: "rgba(139, 92, 246, 0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3,
                                        boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                                    }}
                                >
                                    <HistoryIcon sx={{ fontSize: 32, color: "#8b5cf6" }} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: "var(--text-primary)", mb: 1 }}>
                                    ◷ Flight Archive
                                </Typography>
                                <Typography variant="body2" sx={{ color: "var(--text-secondary)", mb: 4, flexGrow: 1, lineHeight: 1.6 }}>
                                    Review all your previous meeting timestamps, codes, and easily rejoin recurring squad conferences.
                                </Typography>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate("/history")}
                                    sx={{
                                        background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
                                            boxShadow: "0 0 25px rgba(139, 92, 246, 0.6)",
                                            transform: "translateY(-1px)"
                                        },
                                        py: 1.4,
                                        fontWeight: 800,
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontSize: "0.95rem",
                                        mt: "auto"
                                    }}
                                >
                                    Open Archive Logs
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
                    sx={{ width: "100%", backdropFilter: "blur(12px)", borderRadius: "12px" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}