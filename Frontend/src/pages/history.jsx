import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    IconButton,
    TextField,
    InputAdornment,
    Snackbar,
    Alert,
    CircularProgress,
    Chip,
    Stack,
    Tooltip
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EventIcon from "@mui/icons-material/Event";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { useAuth } from "../hooks/useAuth";
import SpaceBackground from "../components/common/SpaceBackground";
import ThemeToggle from "../components/common/ThemeToggle";

export default function History() {
    const { getHistoryOfUser } = useAuth();
    const navigate = useNavigate();

    const [meetings, setMeetings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    useEffect(() => {
        let isMounted = true;

        const fetchHistory = async () => {
            try {
                const historyData = await getHistoryOfUser();
                if (isMounted) {
                    setMeetings(Array.isArray(historyData) ? historyData : []);
                }
            } catch (err) {
                console.error("Failed to load history:", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchHistory();

        return () => {
            isMounted = false;
        };
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Recent Flight";

            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
        } catch {
            return "Recent Flight";
        }
    };

    const handleCopyCode = (code) => {
        const fullLink = `${window.location.origin}/${code}`;
        navigator.clipboard.writeText(fullLink);
        setSnackbar({
            open: true,
            message: `Meeting link copied: ${fullLink}`
        });
    };

    const filteredMeetings = meetings.filter((m) =>
        m.meetingCode?.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    return (
        <Box sx={{ position: "relative", minHeight: "100vh", color: "var(--text-primary)", overflowX: "hidden", py: 4 }}>
            <SpaceBackground />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                {/* Navigation Bar */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 5
                    }}
                >
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/home")}
                        sx={{
                            color: "var(--text-secondary)",
                            "&:hover": { color: "var(--text-primary)" },
                            textTransform: "none",
                            fontWeight: 700
                        }}
                    >
                        Back to Mission Control
                    </Button>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <ThemeToggle />
                        <Chip
                            label={`${meetings.length} Flights Logged`}
                            sx={{
                                backgroundColor: "rgba(249, 115, 22, 0.15)",
                                color: "#fb923c",
                                fontWeight: 800,
                                border: "1px solid rgba(249, 115, 22, 0.3)"
                            }}
                        />
                    </Stack>
                </Box>

                {/* Page Title & Search */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: 2,
                        mb: 4
                    }}
                >
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
                            ✦ Flight Archives
                        </Typography>
                        <Typography variant="body2" sx={{ color: "var(--text-secondary)", mt: 0.5 }}>
                            Review previous missions and instantly rejoin any active conference channel.
                        </Typography>
                    </Box>

                    {/* Search Field */}
                    <TextField
                        size="small"
                        placeholder="Search mission codes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "var(--text-muted)" }} />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            minWidth: 260,
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            borderRadius: "10px",
                            input: { color: "var(--text-primary)" }
                        }}
                    />
                </Box>

                {/* Loading State */}
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                        <CircularProgress sx={{ color: "var(--accent-orange)" }} />
                    </Box>
                ) : filteredMeetings.length === 0 ? (
                    /* Empty State */
                    <Box
                        className="glass-panel"
                        sx={{
                            textAlign: "center",
                            py: 12,
                            px: 3,
                            borderRadius: "24px",
                            border: "1px dashed var(--border)"
                        }}
                    >
                        <HistoryToggleOffIcon sx={{ fontSize: 64, color: "var(--text-muted)", mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "var(--text-primary)", mb: 1 }}>
                            {searchQuery ? "No matching flight codes found" : "Flight Archive Empty"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "var(--text-secondary)", maxWidth: 440, mx: "auto", mb: 3 }}>
                            {searchQuery
                                ? `No recorded meetings match "${searchQuery}".`
                                : "When you create or join meetings, they will automatically be recorded here for instant re-entry."}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/home")}
                            sx={{
                                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                                    boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)"
                                },
                                textTransform: "none",
                                fontWeight: 800,
                                px: 3,
                                py: 1.2,
                                borderRadius: "10px"
                            }}
                        >
                            Launch a Meeting
                        </Button>
                    </Box>
                ) : (
                    /* Meeting List Grid */
                    <Grid container spacing={3}>
                        {filteredMeetings.map((item, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={item._id || idx}>
                                <Card
                                    className="glass-panel glass-panel-hover"
                                    sx={{
                                        borderRadius: "20px"
                                    }}
                                >
                                    <CardContent sx={{ p: 3.5 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 900,
                                                    color: "var(--accent-orange)",
                                                    fontFamily: "var(--mono)",
                                                    letterSpacing: 1
                                                }}
                                            >
                                                {item.meetingCode}
                                            </Typography>
                                            <Tooltip title="Copy Link">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleCopyCode(item.meetingCode)}
                                                    sx={{ color: "var(--text-muted)", "&:hover": { color: "var(--text-primary)" } }}
                                                >
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>

                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "var(--text-secondary)", mb: 3 }}>
                                            <EventIcon sx={{ fontSize: 16 }} />
                                            <Typography variant="body2">{formatDate(item.date)}</Typography>
                                        </Stack>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<PlayArrowIcon />}
                                            onClick={() => navigate(`/${item.meetingCode}`)}
                                            sx={{
                                                background: "rgba(249, 115, 22, 0.15)",
                                                color: "#fb923c",
                                                border: "1px solid rgba(249, 115, 22, 0.3)",
                                                "&:hover": {
                                                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                                    color: "#ffffff",
                                                    boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)"
                                                },
                                                fontWeight: 800,
                                                textTransform: "none",
                                                borderRadius: "10px",
                                                py: 1.1,
                                                transition: "all 0.2s ease"
                                            }}
                                        >
                                            Rejoin Flight
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>

            {/* Notification Toast */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="success" sx={{ width: "100%", borderRadius: "12px" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}