import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Stack,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Chip
} from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import HistoryIcon from "@mui/icons-material/History";
import SecurityIcon from "@mui/icons-material/Security";
import DevicesIcon from "@mui/icons-material/Devices";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Landing() {
    const navigate = useNavigate();
    const [openJoinModal, setOpenJoinModal] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const [joinError, setJoinError] = useState("");

    const handleQuickJoin = (e) => {
        e.preventDefault();
        const code = joinCode.trim();
        if (!code) {
            setJoinError("Please enter a meeting code.");
            return;
        }
        setOpenJoinModal(false);
        navigate(`/${code}`);
    };

    const features = [
        {
            icon: <VideoCameraFrontIcon sx={{ fontSize: 36, color: "#f97316" }} />,
            title: "HD Video & Audio",
            description: "High-definition video calling with peer-to-peer WebRTC connections and crystal-clear low-latency audio."
        },
        {
            icon: <ScreenShareIcon sx={{ fontSize: 36, color: "#3b82f6" }} />,
            title: "One-Click Screen Share",
            description: "Present your screen, slides, browser tabs, or applications seamlessly during active meetings."
        },
        {
            icon: <ChatIcon sx={{ fontSize: 36, color: "#10b981" }} />,
            title: "Real-Time In-Call Chat",
            description: "Collaborate via live chat with message timestamps, unread notification badges, and sender names."
        },
        {
            icon: <HistoryIcon sx={{ fontSize: 36, color: "#8b5cf6" }} />,
            title: "Meeting Activity History",
            description: "Keep a record of all your attended meetings with quick re-join options and date tracking."
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 36, color: "#ec4899" }} />,
            title: "Secure Authentication",
            description: "Password hashing with bcrypt and session token protection to safeguard user accounts."
        },
        {
            icon: <DevicesIcon sx={{ fontSize: 36, color: "#eab308" }} />,
            title: "Fully Responsive",
            description: "Optimized for seamless operation across desktop monitors, laptops, tablets, and mobile phones."
        }
    ];

    const steps = [
        {
            step: "01",
            title: "Create or Join",
            description: "Start an instant video meeting or enter a 6-digit meeting code provided by your team."
        },
        {
            step: "02",
            title: "Share Invite Link",
            description: "Copy your unique meeting link or code with one click and share it with participants."
        },
        {
            step: "03",
            title: "Collaborate in Real Time",
            description: "Turn on your camera and mic, share your screen, and chat live without time limits."
        }
    ];

    const techStack = [
        { name: "React 19", role: "Frontend UI" },
        { name: "Vite 8", role: "Bundler" },
        { name: "Node.js", role: "Runtime" },
        { name: "Express.js", role: "REST API" },
        { name: "Socket.IO", role: "WebSockets" },
        { name: "WebRTC", role: "Media Streams" },
        { name: "MongoDB", role: "Database" }
    ];

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#0b0f19", color: "#f8fafc", overflowX: "hidden" }}>
            {/* Navigation Header */}
            <Box
                component="header"
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1100,
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(11, 15, 25, 0.8)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
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
                            component={RouterLink}
                            to="/"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "10px",
                                    backgroundColor: "#f97316",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <VideoCameraFrontIcon sx={{ color: "#ffffff", fontSize: 24 }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                                Sabka Video Call
                            </Typography>
                        </Box>

                        {/* Nav Actions */}
                        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
                            <Button
                                variant="text"
                                onClick={() => setOpenJoinModal(true)}
                                sx={{
                                    color: "#94a3b8",
                                    "&:hover": { color: "#ffffff" },
                                    textTransform: "none",
                                    fontWeight: 600
                                }}
                            >
                                Join as Guest
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/auth"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#f97316",
                                    "&:hover": { backgroundColor: "#ea580c" },
                                    textTransform: "none",
                                    fontWeight: 700,
                                    borderRadius: "8px",
                                    px: { xs: 2, sm: 3 }
                                }}
                            >
                                Sign In
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* Hero Section */}
            <Box
                sx={{
                    pt: { xs: 8, md: 14 },
                    pb: { xs: 10, md: 16 },
                    position: "relative",
                    background: "radial-gradient(circle at 50% 20%, rgba(249, 115, 22, 0.12) 0%, transparent 60%)"
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Chip
                                label="🚀 Free & Unlimited Real-Time Conferencing"
                                sx={{
                                    backgroundColor: "rgba(249, 115, 22, 0.12)",
                                    color: "#fb923c",
                                    fontWeight: 600,
                                    mb: 3,
                                    border: "1px solid rgba(249, 115, 22, 0.25)"
                                }}
                            />
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.2rem" },
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    letterSpacing: -1.5,
                                    mb: 3
                                }}
                            >
                                Connect. Collaborate.{" "}
                                <Box
                                    component="span"
                                    sx={{
                                        background: "linear-gradient(90deg, #f97316 0%, #fb923c 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                >
                                    Anywhere.
                                </Box>
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#94a3b8",
                                    fontWeight: 400,
                                    lineHeight: 1.6,
                                    mb: 4,
                                    maxWidth: 560
                                }}
                            >
                                Experience frictionless video conferencing with crystal-clear WebRTC media streams, screen sharing, and real-time chat built for everyone.
                            </Typography>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Button
                                    component={RouterLink}
                                    to="/auth"
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        backgroundColor: "#f97316",
                                        "&:hover": { backgroundColor: "#ea580c" },
                                        fontWeight: 700,
                                        py: 1.5,
                                        px: 4,
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        fontSize: "1.05rem"
                                    }}
                                >
                                    Start Meeting Free
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => setOpenJoinModal(true)}
                                    startIcon={<PlayArrowIcon />}
                                    sx={{
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                        color: "#ffffff",
                                        "&:hover": {
                                            borderColor: "#ffffff",
                                            backgroundColor: "rgba(255, 255, 255, 0.05)"
                                        },
                                        fontWeight: 600,
                                        py: 1.5,
                                        px: 3,
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        fontSize: "1.05rem"
                                    }}
                                >
                                    Join with Code
                                </Button>
                            </Stack>

                            <Stack direction="row" spacing={3} sx={{ mt: 5, color: "#64748b", fontSize: "0.875rem" }}>
                                <span>✓ No card required</span>
                                <span>✓ Instant browser access</span>
                                <span>✓ 100% Free</span>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Box
                                sx={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/mobile.png"
                                    alt="Sabka Video Call Preview"
                                    sx={{
                                        width: "100%",
                                        maxWidth: 380,
                                        height: "auto",
                                        borderRadius: "24px",
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(249, 115, 22, 0.15)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)"
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box id="features" sx={{ py: 12, backgroundColor: "#0f1523", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 8 }}>
                        <Typography variant="overline" sx={{ color: "#f97316", fontWeight: 700, letterSpacing: 1.5 }}>
                            POWERFUL FEATURES
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, letterSpacing: -1 }}>
                            Everything You Need for Productive Calls
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#94a3b8", mt: 1.5, maxWidth: 600, mx: "auto" }}>
                            Built on standard open WebRTC protocols for fast, secure, and intuitive virtual collaboration.
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {features.map((item, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "16px",
                                        transition: "transform 0.2s, border-color 0.2s",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            borderColor: "rgba(249, 115, 22, 0.4)"
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ mb: 2 }}>{item.icon}</Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#ffffff", mb: 1 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.6 }}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box sx={{ py: 12 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 8 }}>
                        <Typography variant="overline" sx={{ color: "#f97316", fontWeight: 700, letterSpacing: 1.5 }}>
                            SIMPLE WORKFLOW
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, letterSpacing: -1 }}>
                            How It Works in 3 Quick Steps
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {steps.map((step, idx) => (
                            <Grid item xs={12} md={4} key={idx}>
                                <Box
                                    sx={{
                                        p: 4,
                                        borderRadius: "16px",
                                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                                        border: "1px solid rgba(255, 255, 255, 0.06)",
                                        height: "100%"
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 900,
                                            color: "rgba(249, 115, 22, 0.3)",
                                            mb: 2
                                        }}
                                    >
                                        {step.step}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#ffffff", mb: 1 }}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.6 }}>
                                        {step.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Technology Stack Showcase */}
            <Box sx={{ py: 8, backgroundColor: "#0f1523", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <Container maxWidth="lg">
                    <Typography variant="subtitle1" sx={{ textAlign: "center", color: "#64748b", mb: 4, fontWeight: 600 }}>
                        POWERED BY MODERN WEB TECHNOLOGIES
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        {techStack.map((tech, idx) => (
                            <Grid item xs={6} sm={4} md={2.4} key={idx}>
                                <Box
                                    sx={{
                                        p: 2,
                                        textAlign: "center",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255, 255, 255, 0.05)",
                                        backgroundColor: "rgba(255, 255, 255, 0.02)"
                                    }}
                                >
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#f8fafc" }}>
                                        {tech.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                                        {tech.role}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 6,
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    backgroundColor: "#080c14"
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 3
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <VideoCameraFrontIcon sx={{ color: "#f97316", fontSize: 24 }} />
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                Sabka Video Call
                            </Typography>
                        </Box>

                        <Typography variant="body2" sx={{ color: "#64748b", textAlign: "center" }}>
                            © {new Date().getFullYear()} Sabka Video Call. Built with React, Node, Express & WebSockets.
                        </Typography>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <IconButton
                                component="a"
                                href="https://github.com/Manishvetal95/Sabka-Video-Call"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Repository"
                                sx={{ color: "#94a3b8", "&:hover": { color: "#ffffff" } }}
                            >
                                <GitHubIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Quick Join Modal */}
            <Dialog
                open={openJoinModal}
                onClose={() => setOpenJoinModal(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: "#161e2e",
                        color: "#f8fafc",
                        borderRadius: "16px",
                        p: 1,
                        maxWidth: 420,
                        width: "100%"
                    }
                }}
            >
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Join a Meeting
                    </Typography>
                    <IconButton onClick={() => setOpenJoinModal(false)} sx={{ color: "#94a3b8" }} aria-label="close modal">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Box component="form" onSubmit={handleQuickJoin}>
                    <DialogContent>
                        <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2 }}>
                            Enter the meeting code or ID shared by the host:
                        </Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            placeholder="e.g. team-sync-101"
                            value={joinCode}
                            onChange={(e) => {
                                setJoinCode(e.target.value);
                                setJoinError("");
                            }}
                            error={Boolean(joinError)}
                            helperText={joinError}
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                borderRadius: "8px",
                                input: { color: "#ffffff" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgba(255, 255, 255, 0.2)"
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#f97316",
                                "&:hover": { backgroundColor: "#ea580c" },
                                py: 1.2,
                                fontWeight: 700,
                                textTransform: "none"
                            }}
                        >
                            Join Call
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
}