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
        <Grid container component="main" sx={{ minHeight: "100vh" }}>
            <CssBaseline />

            {/* Left Decorative Banner / Brand Showcase */}
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                    display: { xs: "none", sm: "flex" },
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 6,
                    color: "#ffffff",
                    textAlign: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3
                    }}
                >
                    <VideoCameraFrontIcon sx={{ fontSize: 48, color: "#f97316" }} />
                    <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                        Sabka Video Call
                    </Typography>
                </Box>
                <Typography variant="h6" sx={{ color: "#94a3b8", maxWidth: 500, mb: 4, fontWeight: 400 }}>
                    Seamless, reliable, and real-time video conferencing for everyone. Connect with your team or loved ones anywhere in the world.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        color: "#64748b",
                        fontSize: "0.875rem"
                    }}
                >
                    <span>🔒 End-to-End Sessions</span>
                    <span>⚡ Low Latency WebRTC</span>
                    <span>💬 Real-time Chat</span>
                </Box>
            </Grid>

            {/* Right Authentication Card */}
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: { xs: 3, sm: 6 },
                    backgroundColor: "#ffffff"
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#f97316", width: 52, height: 52 }}>
                        <LockOutlinedIcon sx={{ fontSize: 28 }} />
                    </Avatar>

                    <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                        {formState === 0 ? "Sign In to Your Account" : "Create a New Account"}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, mb: 3 }}>
                        {formState === 0
                            ? "Enter your credentials to access your meetings"
                            : "Get started with your free video calling account"}
                    </Typography>

                    {/* Mode Toggle */}
                    <ToggleButtonGroup
                        value={formState}
                        exclusive
                        onChange={handleFormSwitch}
                        aria-label="authentication mode"
                        fullWidth
                        sx={{ mb: 3 }}
                    >
                        <ToggleButton value={0} aria-label="sign in mode" sx={{ fontWeight: 600 }}>
                            Sign In
                        </ToggleButton>
                        <ToggleButton value={1} aria-label="sign up mode" sx={{ fontWeight: 600 }}>
                            Sign Up
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Error Banner */}
                    {error && (
                        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
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
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
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
                                py: 1.3,
                                backgroundColor: "#f97316",
                                "&:hover": { backgroundColor: "#ea580c" },
                                fontWeight: 700,
                                fontSize: "1rem",
                                textTransform: "none",
                                borderRadius: "8px"
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                            ) : formState === 0 ? (
                                "Sign In"
                            ) : (
                                "Create Account"
                            )}
                        </Button>

                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                {formState === 0 ? (
                                    <>
                                        Don't have an account?{" "}
                                        <Button
                                            variant="text"
                                            onClick={() => setFormState(1)}
                                            sx={{ p: 0, textTransform: "none", fontWeight: 600, color: "#f97316" }}
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
                                            sx={{ p: 0, textTransform: "none", fontWeight: 600, color: "#f97316" }}
                                        >
                                            Sign In
                                        </Button>
                                    </>
                                )}
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: "center", mt: 3 }}>
                            <RouterLink to="/" style={{ textDecoration: "none", color: "#64748b", fontSize: "0.875rem" }}>
                                ← Back to Home
                            </RouterLink>
                        </Box>
                    </Box>
                </Box>
            </Grid>

            {/* Success Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}