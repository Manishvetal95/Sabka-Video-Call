import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
    Snackbar,
    Alert,
    CircularProgress,
    IconButton,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { AuthContext } from "../contexts/AuthContext";
import SpaceBackground from "../components/common/SpaceBackground";
import ThemeToggle from "../components/common/ThemeToggle";

export default function Authentication() {
    const [formState, setFormState] = useState(0); // 0 = Sign In, 1 = Sign Up
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    const { handleLogin, handleRegister, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect already authenticated users to /home
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleFormSwitch = (event, newMode) => {
        if (newMode !== null) {
            setFormState(newMode);
            setError("");
            setPassword("");
            setConfirmPassword("");
        }
    };

    const validateForm = () => {
        if (!username.trim()) {
            setError("Please provide a username.");
            return false;
        }

        if (!password) {
            setError("Please provide a password.");
            return false;
        }

        if (formState === 1) {
            if (!name.trim()) {
                setError("Please provide your full name.");
                return false;
            }
            if (username.trim().length < 3) {
                setError("Username must be at least 3 characters.");
                return false;
            }
            if (password.length < 6) {
                setError("Password must be at least 6 characters.");
                return false;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return false;
            }
        }

        return true;
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setLoading(true);

        try {
            if (formState === 0) {
                // Sign In
                await handleLogin(username.trim(), password);
            } else {
                // Sign Up
                const successMsg = await handleRegister(name.trim(), username.trim(), password);
                setMessage(successMsg || "Account created successfully! Please sign in.");
                setOpenSnackbar(true);
                setFormState(0);
                setPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            setError(err.message || "Authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ position: "relative", minHeight: "100vh", color: "var(--text-primary)", overflowX: "hidden" }}>
            <CssBaseline />
            <SpaceBackground />

            {/* Top Bar with Theme Toggle */}
            <Box
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 24,
                    zIndex: 100
                }}
            >
                <ThemeToggle />
            </Box>

            <Grid container component="main" sx={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
                {/* Left Cosmic Showcase */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6.5}
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 6,
                        textAlign: "center"
                    }}
                >
                    <Box
                        sx={{
                            width: 68,
                            height: 68,
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 35px rgba(249, 115, 22, 0.5)",
                            mb: 3
                        }}
                    >
                        <VideoCameraFrontIcon sx={{ fontSize: 38, color: "#ffffff" }} />
                    </Box>

                    <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1, mb: 2 }}>
                        Sabka Video Call
                    </Typography>

                    <Typography variant="h6" sx={{ color: "var(--text-secondary)", maxWidth: 480, mb: 4, fontWeight: 400, fontSize: "1.05rem" }}>
                        Enter the cosmic gateway. Real-time encrypted communication across deep space and beyond boundaries.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                            color: "var(--text-muted)",
                            fontSize: "0.875rem",
                            fontWeight: 600
                        }}
                    >
                        <span>✦ P2P Media Streams</span>
                        <span>✦ Encrypted Sessions</span>
                        <span>✦ Zero Latency Drop</span>
                    </Box>
                </Grid>

                {/* Right Glass Authentication Card */}
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5.5}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        p: { xs: 3, sm: 6 }
                    }}
                >
                    <Paper
                        className="glass-panel"
                        elevation={0}
                        sx={{
                            width: "100%",
                            maxWidth: 440,
                            borderRadius: "28px",
                            p: { xs: 3, sm: 5 },
                            border: "1px solid var(--border)",
                            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px var(--border-glow)"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <Avatar
                                sx={{
                                    m: 1,
                                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                    width: 52,
                                    height: 52,
                                    boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)"
                                }}
                            >
                                <LockOutlinedIcon sx={{ fontSize: 26 }} />
                            </Avatar>

                            <Typography component="h1" variant="h5" sx={{ fontWeight: 900, mt: 1, color: "var(--text-primary)" }}>
                                {formState === 0 ? "Mission Login" : "Initialize Account"}
                            </Typography>

                            <Typography variant="body2" sx={{ color: "var(--text-secondary)", mt: 0.5, mb: 3 }}>
                                {formState === 0
                                    ? "Authenticate credentials to enter Mission Control"
                                    : "Join the cosmic video conferencing network"}
                            </Typography>

                            {/* Mode Toggle */}
                            <ToggleButtonGroup
                                value={formState}
                                exclusive
                                onChange={handleFormSwitch}
                                aria-label="authentication mode"
                                fullWidth
                                sx={{
                                    mb: 3,
                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                    borderRadius: "12px",
                                    "& .MuiToggleButton-root": {
                                        color: "var(--text-secondary)",
                                        fontWeight: 700,
                                        border: "none",
                                        borderRadius: "12px !important",
                                        py: 1,
                                        "&.Mui-selected": {
                                            backgroundColor: "var(--accent-orange)",
                                            color: "#ffffff",
                                            boxShadow: "0 0 15px var(--accent-orange-glow)"
                                        }
                                    }
                                }}
                            >
                                <ToggleButton value={0} aria-label="sign in mode">
                                    Sign In
                                </ToggleButton>
                                <ToggleButton value={1} aria-label="sign up mode">
                                    Sign Up
                                </ToggleButton>
                            </ToggleButtonGroup>

                            {/* Error Banner */}
                            {error && (
                                <Alert severity="error" sx={{ width: "100%", mb: 2, borderRadius: "10px" }}>
                                    {error}
                                </Alert>
                            )}

                            {/* Auth Form */}
                            <Box component="form" noValidate onSubmit={handleAuthSubmit} sx={{ width: "100%" }}>
                                {formState === 1 && (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="register-name"
                                        label="Full Name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={loading}
                                        sx={{
                                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                                            borderRadius: "10px",
                                            input: { color: "var(--text-primary)" }
                                        }}
                                    />
                                )}

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="auth-username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus={formState === 0}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={loading}
                                    sx={{
                                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                                        borderRadius: "10px",
                                        input: { color: "var(--text-primary)" }
                                    }}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    id="auth-password"
                                    autoComplete={formState === 0 ? "current-password" : "new-password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    sx={{
                                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                                        borderRadius: "10px",
                                        input: { color: "var(--text-primary)" }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    sx={{ color: "var(--text-muted)" }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                {formState === 1 && (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="auth-confirm-password"
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={loading}
                                        sx={{
                                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                                            borderRadius: "10px",
                                            input: { color: "var(--text-primary)" }
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle confirm password visibility"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        edge="end"
                                                        sx={{ color: "var(--text-muted)" }}
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.4,
                                        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                                            boxShadow: "0 0 25px rgba(249, 115, 22, 0.6)"
                                        },
                                        fontWeight: 800,
                                        fontSize: "1rem",
                                        textTransform: "none",
                                        borderRadius: "12px",
                                        boxShadow: "0 8px 20px -4px rgba(249, 115, 22, 0.4)"
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                                    ) : formState === 0 ? (
                                        "✦ Sign In to Mission"
                                    ) : (
                                        "✦ Initialize Account"
                                    )}
                                </Button>

                                <Box sx={{ textAlign: "center", mt: 2 }}>
                                    <Typography variant="body2" color="var(--text-secondary)">
                                        {formState === 0 ? (
                                            <>
                                                Don't have an account?{" "}
                                                <Button
                                                    variant="text"
                                                    onClick={() => setFormState(1)}
                                                    sx={{ p: 0, textTransform: "none", fontWeight: 700, color: "var(--accent-orange)" }}
                                                >
                                                    Sign Up
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                Already registered?{" "}
                                                <Button
                                                    variant="text"
                                                    onClick={() => setFormState(0)}
                                                    sx={{ p: 0, textTransform: "none", fontWeight: 700, color: "var(--accent-orange)" }}
                                                >
                                                    Sign In
                                                </Button>
                                            </>
                                        )}
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: "center", mt: 3 }}>
                                    <RouterLink to="/" style={{ textDecoration: "none", color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: 600 }}>
                                        ← Return to Planetary Home
                                    </RouterLink>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Success Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%", borderRadius: "12px" }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}