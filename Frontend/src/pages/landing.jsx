import React, { useState, useEffect } from "react";
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
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SpaceBackground from "../components/common/SpaceBackground";
import ThemeToggle from "../components/common/ThemeToggle";

export default function Landing() {
    const navigate = useNavigate();
    const [openJoinModal, setOpenJoinModal] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const [joinError, setJoinError] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            icon: <VideoCameraFrontIcon sx={{ fontSize: 32 }} />,
            title: "HD Video & Audio",
            description: "High-definition video calling with peer-to-peer WebRTC connections and crystal-clear low-latency audio.",
            tag: "1080P HD 60FPS",
            color: "#f97316",
            gradient: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
            glow: "rgba(249, 115, 22, 0.4)",
            bgGlow: "rgba(249, 115, 22, 0.16)",
            borderColor: "rgba(249, 115, 22, 0.35)",
            badgeBg: "rgba(249, 115, 22, 0.12)"
        },
        {
            icon: <ScreenShareIcon sx={{ fontSize: 32 }} />,
            title: "One-Click Screen Share",
            description: "Present your screen, slides, browser tabs, or applications seamlessly during active meetings.",
            tag: "ULTRA LOW-LATENCY",
            color: "#06b6d4",
            gradient: "linear-gradient(135deg, #06b6d4 0%, #38bdf8 100%)",
            glow: "rgba(6, 182, 212, 0.4)",
            bgGlow: "rgba(6, 182, 212, 0.16)",
            borderColor: "rgba(6, 182, 212, 0.35)",
            badgeBg: "rgba(6, 182, 212, 0.12)"
        },
        {
            icon: <ChatIcon sx={{ fontSize: 32 }} />,
            title: "Real-Time In-Call Chat",
            description: "Collaborate via live chat with message timestamps, unread notification badges, and sender names.",
            tag: "ENCRYPTED CHANNELS",
            color: "#10b981",
            gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
            glow: "rgba(16, 185, 129, 0.4)",
            bgGlow: "rgba(16, 185, 129, 0.16)",
            borderColor: "rgba(16, 185, 129, 0.35)",
            badgeBg: "rgba(16, 185, 129, 0.12)"
        },
        {
            icon: <HistoryIcon sx={{ fontSize: 32 }} />,
            title: "Meeting Activity History",
            description: "Keep a record of all your attended meetings with quick re-join options and date tracking.",
            tag: "ASTRAL CLOUD SYNC",
            color: "#8b5cf6",
            gradient: "linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)",
            glow: "rgba(139, 92, 246, 0.4)",
            bgGlow: "rgba(139, 92, 246, 0.16)",
            borderColor: "rgba(139, 92, 246, 0.35)",
            badgeBg: "rgba(139, 92, 246, 0.12)"
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 32 }} />,
            title: "Secure Authentication",
            description: "Password hashing with bcrypt and session token protection to safeguard user accounts.",
            tag: "BCRYPT & JWT SHIELD",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
            glow: "rgba(236, 72, 153, 0.4)",
            bgGlow: "rgba(236, 72, 153, 0.16)",
            borderColor: "rgba(236, 72, 153, 0.35)",
            badgeBg: "rgba(236, 72, 153, 0.12)"
        },
        {
            icon: <DevicesIcon sx={{ fontSize: 32 }} />,
            title: "Fully Responsive",
            description: "Optimized for seamless operation across desktop monitors, laptops, tablets, and mobile phones.",
            tag: "CROSS-PLATFORM MATRIX",
            color: "#eab308",
            gradient: "linear-gradient(135deg, #eab308 0%, #fbbf24 100%)",
            glow: "rgba(234, 179, 8, 0.4)",
            bgGlow: "rgba(234, 179, 8, 0.16)",
            borderColor: "rgba(234, 179, 8, 0.35)",
            badgeBg: "rgba(234, 179, 8, 0.12)"
        }
    ];

    const steps = [
        {
            step: "01",
            title: "Launch Room",
            description: "Start an instant video meeting or enter a 6-digit meeting code provided by your team."
        },
        {
            step: "02",
            title: "Beam Invite",
            description: "Copy your unique meeting link or code with one click and share it with participants."
        },
        {
            step: "03",
            title: "Sync & Collaborate",
            description: "Turn on your camera and mic, share your screen, and chat live across any device."
        }
    ];

    const techStack = [
        { name: "React 19", role: "Frontend UI" },
        { name: "Vite 8", role: "Bundler" },
        { name: "WebRTC", role: "P2P Streams" },
        { name: "Socket.IO", role: "WebSockets" },
        { name: "Node.js", role: "Runtime" },
        { name: "Express.js", role: "REST API" },
        { name: "MongoDB", role: "Database" }
    ];

    return (
        <Box sx={{ position: "relative", minHeight: "100vh", color: "var(--text-primary)", overflowX: "hidden" }}>
            {/* Animated Space & Nebula Background */}
            <SpaceBackground />

            {/* Navigation Header */}
            <Box
                component="header"
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1100,
                    backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
                    backgroundColor: scrolled ? "var(--surface-glass)" : "transparent",
                    borderBottom: "1px solid",
                    borderColor: scrolled ? "var(--border)" : "transparent",
                    transition: "all 0.3s ease"
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
                                    width: 42,
                                    height: 42,
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
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 800,
                                    letterSpacing: -0.5,
                                    background: "linear-gradient(90deg, #f8fafc, #cbd5e1)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "var(--text-primary)"
                                }}
                            >
                                Sabka Video Call
                            </Typography>
                        </Box>

                        {/* Nav Actions */}
                        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
                            <ThemeToggle />

                            <Button
                                variant="text"
                                onClick={() => setOpenJoinModal(true)}
                                sx={{
                                    color: "var(--text-secondary)",
                                    "&:hover": { color: "var(--text-primary)" },
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: "0.95rem"
                                }}
                            >
                                Join as Guest
                            </Button>

                            <Button
                                component={RouterLink}
                                to="/auth"
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                                        boxShadow: "0 0 20px rgba(249, 115, 22, 0.6)",
                                        transform: "translateY(-1px)"
                                    },
                                    textTransform: "none",
                                    fontWeight: 700,
                                    borderRadius: "10px",
                                    px: { xs: 2, sm: 3 },
                                    py: 1,
                                    boxShadow: "0 4px 15px rgba(249, 115, 22, 0.3)",
                                    transition: "all 0.2s ease"
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
                    position: "relative",
                    zIndex: 1,
                    pt: { xs: 8, md: 14 },
                    pb: { xs: 10, md: 16 }
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Chip
                                icon={<AutoAwesomeIcon sx={{ fontSize: "1rem !important", color: "#f97316 !important" }} />}
                                label="Cinematic Space Conferencing"
                                sx={{
                                    backgroundColor: "rgba(249, 115, 22, 0.12)",
                                    color: "#fb923c",
                                    fontWeight: 700,
                                    letterSpacing: 0.5,
                                    mb: 3,
                                    border: "1px solid rgba(249, 115, 22, 0.3)",
                                    backdropFilter: "blur(8px)"
                                }}
                            />

                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.6rem" },
                                    fontWeight: 900,
                                    lineHeight: 1.05,
                                    letterSpacing: -1.5,
                                    mb: 2.5
                                }}
                            >
                                CONNECT.
                                <br />
                                COLLABORATE.
                                <br />
                                <Box component="span" className="heroic-text">
                                    ANYWHERE.
                                </Box>
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    color: "var(--text-secondary)",
                                    fontWeight: 400,
                                    lineHeight: 1.6,
                                    mb: 4.5,
                                    maxWidth: 540,
                                    fontSize: { xs: "1rem", sm: "1.15rem" }
                                }}
                            >
                                Your meetings, reimagined beyond boundaries. Experience ultra low-latency WebRTC streams, one-click screen sharing, and real-time cosmic chat.
                            </Typography>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Button
                                    component={RouterLink}
                                    to="/auth"
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                                            boxShadow: "0 0 25px rgba(249, 115, 22, 0.6)",
                                            transform: "translateY(-2px)"
                                        },
                                        fontWeight: 800,
                                        py: 1.6,
                                        px: 4,
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontSize: "1.05rem",
                                        boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    ✦ Start Meeting Free
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => setOpenJoinModal(true)}
                                    startIcon={<PlayArrowIcon />}
                                    sx={{
                                        borderColor: "var(--border)",
                                        backgroundColor: "var(--surface-glass)",
                                        backdropFilter: "blur(10px)",
                                        color: "var(--text-primary)",
                                        "&:hover": {
                                            borderColor: "var(--border-hover)",
                                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                                            boxShadow: "0 0 15px var(--border-glow)",
                                            transform: "translateY(-2px)"
                                        },
                                        fontWeight: 700,
                                        py: 1.6,
                                        px: 3,
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontSize: "1.05rem",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    Join with Code
                                </Button>
                            </Stack>

                            <Stack direction="row" spacing={3} sx={{ mt: 5, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                                <span>✦ Zero latency drop</span>
                                <span>✦ Instant browser access</span>
                                <span>✦ Free forever</span>
                            </Stack>
                        </Grid>

                        {/* Hero Preview Card */}
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
                                    alt="Sabka Video Call Cosmic Experience"
                                    sx={{
                                        width: "100%",
                                        maxWidth: 380,
                                        height: "auto",
                                        borderRadius: "28px",
                                        boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.15)",
                                        transition: "transform 0.3s ease",
                                        "&:hover": {
                                            transform: "scale(1.02)"
                                        }
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box id="features" sx={{ position: "relative", zIndex: 1, py: 12, borderTop: "1px solid var(--border)" }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 8 }}>
                        <Typography variant="overline" sx={{ color: "var(--accent-orange)", fontWeight: 800, letterSpacing: 2 }}>
                            SUPERHERO-GRADE CAPABILITIES
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, letterSpacing: -1 }}>
                            Engineered for Planetary Collaboration
                        </Typography>
                        <Typography variant="body1" sx={{ color: "var(--text-secondary)", mt: 1.5, maxWidth: 620, mx: "auto" }}>
                            Built directly on modern WebRTC protocols with encrypted signaling and peer-to-peer real-time data channels.
                        </Typography>
                    </Box>

                    <Grid container spacing={3.5}>
                        {features.map((item, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Card
                                    className="glass-panel"
                                    sx={{
                                        height: "100%",
                                        borderRadius: "24px",
                                        position: "relative",
                                        overflow: "hidden",
                                        backgroundColor: "var(--surface-glass)",
                                        backdropFilter: "blur(16px)",
                                        border: "1px solid var(--border-glass)",
                                        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                        cursor: "pointer",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: "3px",
                                            background: item.gradient,
                                            opacity: 0.6,
                                            transition: "opacity 0.4s ease, height 0.4s ease"
                                        },
                                        "&:hover": {
                                            transform: "translateY(-8px) scale(1.015)",
                                            borderColor: item.borderColor,
                                            boxShadow: `0 22px 45px -12px ${item.glow}, 0 0 25px -5px ${item.glow}`,
                                            "&::before": {
                                                opacity: 1,
                                                height: "5px"
                                            },
                                            "& .card-radial-orb": {
                                                transform: "scale(1.5)",
                                                opacity: 0.85
                                            },
                                            "& .card-icon-box": {
                                                transform: "scale(1.1) translateY(-3px) rotate(4deg)",
                                                boxShadow: `0 14px 30px ${item.glow}`
                                            },
                                            "& .card-shine": {
                                                transform: "translateX(300%) skewX(-25deg)"
                                            },
                                            "& .card-corner-bracket": {
                                                borderColor: item.color,
                                                opacity: 1
                                            },
                                            "& .card-explore-arrow": {
                                                transform: "translateX(6px)",
                                                color: item.color
                                            }
                                        }
                                    }}
                                >
                                    {/* Diagonal Light Sweep Graphic */}
                                    <Box
                                        className="card-shine"
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "60%",
                                            height: "100%",
                                            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent)",
                                            transform: "translateX(-150%) skewX(-25deg)",
                                            transition: "transform 0.85s ease",
                                            pointerEvents: "none",
                                            zIndex: 3
                                        }}
                                    />

                                    {/* Ambient Colored Radial Orb Graphic */}
                                    <Box
                                        className="card-radial-orb"
                                        sx={{
                                            position: "absolute",
                                            top: -35,
                                            right: -35,
                                            width: 150,
                                            height: 150,
                                            borderRadius: "50%",
                                            background: `radial-gradient(circle, ${item.bgGlow} 0%, transparent 70%)`,
                                            filter: "blur(22px)",
                                            pointerEvents: "none",
                                            transition: "transform 0.5s ease, opacity 0.5s ease",
                                            opacity: 0.5,
                                            zIndex: 0
                                        }}
                                    />

                                    {/* Cyber Corner Bracket Graphic */}
                                    <Box
                                        className="card-corner-bracket"
                                        sx={{
                                            position: "absolute",
                                            top: 14,
                                            right: 14,
                                            width: 14,
                                            height: 14,
                                            borderTop: "2px solid",
                                            borderRight: "2px solid",
                                            borderColor: "rgba(255, 255, 255, 0.18)",
                                            opacity: 0.4,
                                            transition: "all 0.3s ease",
                                            pointerEvents: "none",
                                            zIndex: 1
                                        }}
                                    />

                                    <CardContent sx={{ p: 3.5, position: "relative", zIndex: 2 }}>
                                        {/* Header Row: Icon Badge & Telemetry Chip */}
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                                            <Box
                                                className="card-icon-box"
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: "16px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    background: `linear-gradient(135deg, ${item.bgGlow} 0%, rgba(255, 255, 255, 0.04) 100%)`,
                                                    border: `1px solid ${item.borderColor}`,
                                                    boxShadow: `0 8px 20px ${item.glow}`,
                                                    color: item.color,
                                                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                                                }}
                                            >
                                                {item.icon}
                                            </Box>

                                            <Chip
                                                size="small"
                                                label={item.tag}
                                                sx={{
                                                    backgroundColor: item.badgeBg,
                                                    color: item.color,
                                                    fontSize: "0.65rem",
                                                    fontWeight: 800,
                                                    letterSpacing: 0.8,
                                                    border: `1px solid ${item.borderColor}`,
                                                    height: 24,
                                                    borderRadius: "6px"
                                                }}
                                            />
                                        </Box>

                                        {/* Title */}
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 800,
                                                color: "var(--text-primary)",
                                                fontSize: "1.2rem",
                                                mb: 1.5,
                                                letterSpacing: -0.3
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        {/* Description */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "var(--text-secondary)",
                                                lineHeight: 1.7,
                                                fontSize: "0.925rem"
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </CardContent>

                                    {/* Subtle Interactive Footer Graphic */}
                                    <Box
                                        sx={{
                                            px: 3.5,
                                            pb: 3,
                                            pt: 0,
                                            position: "relative",
                                            zIndex: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.8
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                color: "var(--text-muted)",
                                                fontSize: "0.75rem",
                                                letterSpacing: 0.5,
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            Live Protocol
                                        </Typography>
                                        <ArrowForwardIcon
                                            className="card-explore-arrow"
                                            sx={{
                                                fontSize: "0.9rem",
                                                color: "var(--text-muted)",
                                                transition: "all 0.3s ease"
                                            }}
                                        />
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box sx={{ position: "relative", zIndex: 1, py: 12 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 8 }}>
                        <Typography variant="overline" sx={{ color: "var(--accent-cyan)", fontWeight: 800, letterSpacing: 2 }}>
                            MISSION PROTOCOL
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, letterSpacing: -1 }}>
                            3 Steps to Launch Your Conference
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {steps.map((step, idx) => (
                            <Grid item xs={12} md={4} key={idx}>
                                <Box
                                    className="glass-panel"
                                    sx={{
                                        p: 4,
                                        borderRadius: "20px",
                                        height: "100%",
                                        transition: "transform 0.2s ease",
                                        "&:hover": { transform: "translateY(-4px)" }
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 900,
                                            background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            mb: 2
                                        }}
                                    >
                                        {step.step}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: "var(--text-primary)", mb: 1 }}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "var(--text-secondary)", lineHeight: 1.65 }}>
                                        {step.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Technology Stack Showcase */}
            <Box sx={{ position: "relative", zIndex: 1, py: 8, borderTop: "1px solid var(--border)" }}>
                <Container maxWidth="lg">
                    <Typography variant="subtitle1" sx={{ textAlign: "center", color: "var(--text-muted)", mb: 4, fontWeight: 700, letterSpacing: 1.5 }}>
                        POWERED BY CUTTING-EDGE TECHNOLOGIES
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        {techStack.map((tech, idx) => (
                            <Grid item xs={6} sm={4} md={2.4} key={idx}>
                                <Box
                                    className="glass-panel"
                                    sx={{
                                        p: 2.5,
                                        textAlign: "center",
                                        borderRadius: "14px",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            borderColor: "var(--border-hover)",
                                            boxShadow: "0 0 15px var(--border-glow)"
                                        }
                                    }}
                                >
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "var(--text-primary)" }}>
                                        {tech.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "var(--text-muted)" }}>
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
                    position: "relative",
                    zIndex: 1,
                    py: 6,
                    borderTop: "1px solid var(--border)",
                    backgroundColor: "var(--surface)"
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
                            <VideoCameraFrontIcon sx={{ color: "var(--accent-orange)", fontSize: 24 }} />
                            <Typography variant="body1" sx={{ fontWeight: 800 }}>
                                Sabka Video Call
                            </Typography>
                        </Box>

                        <Typography variant="body2" sx={{ color: "var(--text-muted)", textAlign: "center" }}>
                            © {new Date().getFullYear()} Sabka Video Call. Futuristic real-time conferencing in space.
                        </Typography>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <IconButton
                                component="a"
                                href="https://github.com/Manishvetal95/Sabka-Video-Call"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Repository"
                                sx={{ color: "var(--text-secondary)", "&:hover": { color: "var(--text-primary)" } }}
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
                        backgroundColor: "var(--surface)",
                        backdropFilter: "blur(16px)",
                        color: "var(--text-primary)",
                        borderRadius: "20px",
                        border: "1px solid var(--border)",
                        p: 1,
                        maxWidth: 420,
                        width: "100%",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                    }
                }}
            >
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        Join a Meeting
                    </Typography>
                    <IconButton onClick={() => setOpenJoinModal(false)} sx={{ color: "var(--text-muted)" }} aria-label="close modal">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Box component="form" onSubmit={handleQuickJoin}>
                    <DialogContent>
                        <Typography variant="body2" sx={{ color: "var(--text-secondary)", mb: 2 }}>
                            Enter the meeting code or ID shared by your team:
                        </Typography>
                        <TextField
                            autoFocus
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
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                borderRadius: "10px",
                                input: { color: "var(--text-primary)" }
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                                    boxShadow: "0 0 20px rgba(249, 115, 22, 0.6)"
                                },
                                py: 1.3,
                                fontWeight: 800,
                                textTransform: "none",
                                borderRadius: "10px"
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