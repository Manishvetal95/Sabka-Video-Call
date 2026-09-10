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
            if (isNaN(date.getTime())) return "Recent Meeting";

            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
        } catch {
            return "Recent Meeting";
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
        <Box sx={{ minHeight: "100vh", backgroundColor: "#0b0f19", color: "#f8fafc", py: 4 }}>
            <Container maxWidth="lg">
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
                            color: "#94a3b8",
                            "&:hover": { color: "#ffffff" },
                            textTransform: "none",
                            fontWeight: 600
                        }}
                    >
                        Back to Dashboard
                    </Button>

                    <Chip
                        label={`${meetings.length} Recorded Meetings`}
                        sx={{
                            backgroundColor: "rgba(249, 115, 22, 0.15)",
                            color: "#fb923c",
                            fontWeight: 700
                        }}
                    />
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
                        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                            Meeting Activity History
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5 }}>
                            Review previous calls and rejoin any meeting with one click.
                        </Typography>
                    </Box>

                    {/* Search Field */}
                    <TextField
                        size="small"
                        placeholder="Search by code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#64748b" }} />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            minWidth: 260,
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            borderRadius: "8px",
                            input: { color: "#ffffff" },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(255, 255, 255, 0.15)"
                            }
                        }}
                    />
                </Box>

                {/* Loading State */}
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                        <CircularProgress sx={{ color: "#f97316" }} />
                    </Box>
                ) : filteredMeetings.length === 0 ? (
                    /* Empty State */
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 12,
                            px: 3,
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                            borderRadius: "16px",
                            border: "1px dashed rgba(255, 255, 255, 0.1)"
                        }}
                    >
                        <HistoryToggleOffIcon sx={{ fontSize: 64, color: "#475569", mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#ffffff", mb: 1 }}>
                            {searchQuery ? "No matching meetings found" : "No Meeting History Yet"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#94a3b8", maxWidth: 440, mx: "auto", mb: 3 }}>
                            {searchQuery
                                ? `No past meetings match your query "${searchQuery}".`
                                : "When you create or join meetings, they will automatically be logged here for quick reference."}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/home")}
                            sx={{
                                backgroundColor: "#f97316",
                                "&:hover": { backgroundColor: "#ea580c" },
                                textTransform: "none",
                                fontWeight: 700,
                                px: 3,
                                py: 1,
                                borderRadius: "8px"
                            }}
                        >
                            Start a Meeting
                        </Button>
                    </Box>
                ) : (
                    /* Meeting List Grid */
                    <Grid container spacing={3}>
                        {filteredMeetings.map((item, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={item._id || idx}>
                                <Card
                                    sx={{
                                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "14px",
                                        transition: "all 0.2s",
                                        "&:hover": {
                                            borderColor: "rgba(249, 115, 22, 0.4)",
                                            backgroundColor: "rgba(255, 255, 255, 0.05)"
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 800,
                                                    color: "#f97316",
                                                    fontFamily: "monospace",
                                                    letterSpacing: 0.5
                                                }}
                                            >
                                                {item.meetingCode}
                                            </Typography>
                                            <Tooltip title="Copy Link">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleCopyCode(item.meetingCode)}
                                                    sx={{ color: "#94a3b8", "&:hover": { color: "#ffffff" } }}
                                                >
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>

                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "#94a3b8", mb: 3 }}>
                                            <EventIcon sx={{ fontSize: 16 }} />
                                            <Typography variant="body2">{formatDate(item.date)}</Typography>
                                        </Stack>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<PlayArrowIcon />}
                                            onClick={() => navigate(`/${item.meetingCode}`)}
                                            sx={{
                                                backgroundColor: "rgba(249, 115, 22, 0.15)",
                                                color: "#fb923c",
                                                border: "1px solid rgba(249, 115, 22, 0.3)",
                                                "&:hover": {
                                                    backgroundColor: "#f97316",
                                                    color: "#ffffff"
                                                },
                                                fontWeight: 700,
                                                textTransform: "none",
                                                borderRadius: "8px",
                                                py: 1
                                            }}
                                        >
                                            Rejoin Call
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
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="success" sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}