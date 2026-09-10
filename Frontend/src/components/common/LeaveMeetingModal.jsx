import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box
} from "@mui/material";
import CallEndIcon from "@mui/icons-material/CallEnd";

export const LeaveMeetingModal = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    backdropFilter: "blur(16px)",
                    color: "#f8fafc",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(239, 68, 68, 0.2)",
                    maxWidth: 400,
                    p: 1
                }
            }}
        >
            <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
                <Box
                    sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        backgroundColor: "rgba(239, 68, 68, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                        boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)"
                    }}
                >
                    <CallEndIcon sx={{ color: "#ef4444", fontSize: 28 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#ffffff" }}>
                    Leave Meeting?
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ textAlign: "center", pb: 2 }}>
                <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                    Are you sure you want to disconnect from this conference? You can rejoin anytime using the meeting code.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, gap: 1.5, justifyContent: "center" }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        color: "#ffffff",
                        "&:hover": {
                            borderColor: "#ffffff",
                            backgroundColor: "rgba(255, 255, 255, 0.06)"
                        },
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "10px",
                        px: 3
                    }}
                >
                    Stay in Call
                </Button>

                <Button
                    variant="contained"
                    onClick={onConfirm}
                    sx={{
                        backgroundColor: "#ef4444",
                        "&:hover": { backgroundColor: "#dc2626" },
                        boxShadow: "0 0 15px rgba(239, 68, 68, 0.4)",
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "10px",
                        px: 3
                    }}
                >
                    Leave Meeting
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LeaveMeetingModal;
