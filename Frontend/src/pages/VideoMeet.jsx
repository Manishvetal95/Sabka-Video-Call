import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {
    Box,
    Typography,
    Chip,
    Button,
    Tooltip,
    Snackbar,
    Alert
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SOCKET_URL, APP_CONFIG } from "../config";
import { useAuth } from "../hooks/useAuth";
import VideoTile from "../components/meeting/VideoTile";
import MeetingControls from "../components/meeting/MeetingControls";
import LobbyPreview from "../components/meeting/LobbyPreview";
import ChatDrawer from "../components/chat/ChatDrawer";
import ParticipantsDrawer from "../components/meeting/ParticipantsDrawer";
import SpaceBackground from "../components/common/SpaceBackground";
import ThemeToggle from "../components/common/ThemeToggle";
import LeaveMeetingModal from "../components/common/LeaveMeetingModal";

export default function VideoMeetComponent() {
    const { url } = useParams();
    const navigate = useNavigate();
    const { user, addToUserHistory } = useAuth();

    const meetingCode = url || "default-room";

    // Media & Hardware State
    const [localStream, setLocalStream] = useState(null);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isHandRaised, setIsHandRaised] = useState(false);
    const [permissionError, setPermissionError] = useState("");

    // Meeting Session State
    const [isInLobby, setIsInLobby] = useState(true);
    const [username, setUsername] = useState(user?.username || "");
    const [remoteVideos, setRemoteVideos] = useState([]);
    const [activeReactions, setActiveReactions] = useState([]);

    // Drawers & Notifications State
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });
    const [connectionStatus, setConnectionStatus] = useState("Connecting");
    const [openLeaveModal, setOpenLeaveModal] = useState(false);

    // References (prevents stale closure issues and unneeded re-renders)
    const socketRef = useRef(null);
    const socketIdRef = useRef(null);
    const connectionsRef = useRef({});
    const localStreamRef = useRef(null);
    const screenStreamRef = useRef(null);

    // Synchronize localStreamRef
    useEffect(() => {
        localStreamRef.current = localStream;
    }, [localStream]);

    // 1. Acquire Local Media on Initial Component Mount (Run ONCE)
    useEffect(() => {
        let mounted = true;

        const initializeMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });

                if (mounted) {
                    setLocalStream(stream);
                    localStreamRef.current = stream;
                    setPermissionError("");
                }
            } catch (err) {
                console.warn("Camera/Mic access warning:", err);
                if (mounted) {
                    setPermissionError(
                        "Camera or microphone permission was denied. You can still join as a viewer."
                    );
                    setIsVideoMuted(true);
                    setIsAudioMuted(true);
                }
            }
        };

        initializeMedia();

        // Cleanup media tracks and peer connections on unmount
        return () => {
            mounted = false;

            const activeLocalStream = localStreamRef.current;
            const activeScreenStream = screenStreamRef.current;
            const activeConnections = connectionsRef.current;
            const activeSocket = socketRef.current;

            if (activeLocalStream) {
                activeLocalStream.getTracks().forEach((track) => track.stop());
            }

            if (activeScreenStream) {
                activeScreenStream.getTracks().forEach((track) => track.stop());
            }

            Object.values(activeConnections).forEach((peer) => {
                try {
                    peer.close();
                } catch {
                    // Ignore peer close errors
                }
            });

            if (activeSocket) {
                activeSocket.disconnect();
            }
        };
    }, []);

    // 2. Create WebRTC Peer Connection Helper
    const createPeerConnection = useCallback((peerSocketId) => {
        const pc = new RTCPeerConnection({
            iceServers: APP_CONFIG.DEFAULT_ICE_SERVERS
        });

        // Emit local ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate && socketRef.current) {
                socketRef.current.emit(
                    "signal",
                    peerSocketId,
                    JSON.stringify({ ice: event.candidate })
                );
            }
        };

        // Attach incoming remote streams
        pc.ontrack = (event) => {
            const remoteStream = event.streams[0];
            setRemoteVideos((prev) => {
                const existing = prev.find((v) => v.socketId === peerSocketId);
                if (existing) {
                    return prev.map((v) =>
                        v.socketId === peerSocketId ? { ...v, stream: remoteStream } : v
                    );
                }
                return [...prev, { socketId: peerSocketId, stream: remoteStream }];
            });
        };

        // Backward compatibility with older addStream / onaddstream
        pc.onaddstream = (event) => {
            setRemoteVideos((prev) => {
                const existing = prev.find((v) => v.socketId === peerSocketId);
                if (existing) {
                    return prev.map((v) =>
                        v.socketId === peerSocketId ? { ...v, stream: event.stream } : v
                    );
                }
                return [...prev, { socketId: peerSocketId, stream: event.stream }];
            });
        };

        // Add local tracks if available
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => {
                try {
                    pc.addTrack(track, localStreamRef.current);
                } catch {
                    // Fallback to addStream if addTrack fails
                    try {
                        pc.addStream(localStreamRef.current);
                    } catch {
                        // ignore
                    }
                }
            });
        }

        return pc;
    }, []);

    // 3. Incoming WebRTC Signaling Handler
    const handleIncomingSignal = useCallback(
        (fromId, message) => {
            try {
                const signal = JSON.parse(message);

                if (fromId === socketIdRef.current) return;

                let pc = connectionsRef.current[fromId];

                if (!pc) {
                    pc = createPeerConnection(fromId);
                    connectionsRef.current[fromId] = pc;
                }

                if (signal.sdp) {
                    pc.setRemoteDescription(new RTCSessionDescription(signal.sdp))
                        .then(() => {
                            if (signal.sdp.type === "offer") {
                                pc.createAnswer()
                                    .then((answer) => pc.setLocalDescription(answer))
                                    .then(() => {
                                        socketRef.current.emit(
                                            "signal",
                                            fromId,
                                            JSON.stringify({ sdp: pc.localDescription })
                                        );
                                    })
                                    .catch((e) => console.error("Error creating answer:", e));
                            }
                        })
                        .catch((e) => console.error("Error setting remote description:", e));
                }

                if (signal.ice) {
                    pc.addIceCandidate(new RTCIceCandidate(signal.ice)).catch((e) =>
                        console.error("Error adding ICE candidate:", e)
                    );
                }
            } catch (err) {
                console.error("Failed to parse incoming signal:", err);
            }
        },
        [createPeerConnection]
    );

    // 4. Connect to Socket.IO Server & Join Room
    const connectToMeetingSocket = () => {
        const socket = io(SOCKET_URL, {
            transports: ["websocket", "polling"],
            secure: SOCKET_URL.startsWith("https")
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            setConnectionStatus("Connected");
            socketIdRef.current = socket.id;

            // Maintain exact backend room key compatibility (window.location.href)
            socket.emit("join-call", window.location.href);

            try {
                addToUserHistory(meetingCode);
            } catch {
                // Ignore history recording failures
            }
        });

        socket.on("signal", handleIncomingSignal);

        socket.on("chat-message", (data, sender, socketIdSender) => {
            // Check if this is an emoji reaction
            if (data?.startsWith("[REACTION]:")) {
                const emoji = data.replace("[REACTION]:", "");
                showFloatingReaction(emoji, sender);
                return;
            }

            setMessages((prev) => [...prev, { data, sender }]);

            if (socketIdSender !== socketIdRef.current) {
                setUnreadCount((prev) => prev + 1);
            }
        });

        socket.on("user-left", (leavingId) => {
            setRemoteVideos((prev) => prev.filter((v) => v.socketId !== leavingId));
            if (connectionsRef.current[leavingId]) {
                try {
                    connectionsRef.current[leavingId].close();
                } catch {
                    // Ignore close errors
                }
                delete connectionsRef.current[leavingId];
            }
        });

        socket.on("user-joined", (newUserId, clientList) => {
            clientList.forEach((clientId) => {
                if (!connectionsRef.current[clientId]) {
                    const pc = createPeerConnection(clientId);
                    connectionsRef.current[clientId] = pc;
                }
            });

            // If we are the newly joined client, initiate offers to existing peers
            if (newUserId === socketIdRef.current) {
                for (const clientId in connectionsRef.current) {
                    if (clientId === socketIdRef.current) continue;

                    const pc = connectionsRef.current[clientId];
                    pc.createOffer()
                        .then((offer) => pc.setLocalDescription(offer))
                        .then(() => {
                            socket.emit(
                                "signal",
                                clientId,
                                JSON.stringify({ sdp: pc.localDescription })
                            );
                        })
                        .catch((e) => console.error("Error creating initial offer:", e));
                }
            }
        });

        socket.on("disconnect", () => {
            setConnectionStatus("Reconnecting...");
        });
    };

    // 5. Join Meeting from Lobby
    const handleJoinMeeting = () => {
        if (!username.trim()) return;
        setIsInLobby(false);
        connectToMeetingSocket();
    };

    // 6. Media Control Handlers
    const handleToggleAudio = () => {
        if (localStream) {
            const nextState = !isAudioMuted;
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = isAudioMuted; // Invert to unmute/mute
            });
            setIsAudioMuted(nextState);
        }
    };

    const handleToggleVideo = () => {
        if (localStream) {
            const nextState = !isVideoMuted;
            localStream.getVideoTracks().forEach((track) => {
                track.enabled = isVideoMuted;
            });
            setIsVideoMuted(nextState);
        }
    };

    // 7. Screen Sharing with Camera Fallback
    const handleToggleScreenShare = async () => {
        if (!isScreenSharing) {
            try {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true
                });

                screenStreamRef.current = screenStream;
                const screenTrack = screenStream.getVideoTracks()[0];

                // Replace video track for all remote peers
                Object.values(connectionsRef.current).forEach((pc) => {
                    const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
                    if (sender) {
                        sender.replaceTrack(screenTrack);
                    }
                });

                // When user clicks "Stop Sharing" from browser native chrome
                screenTrack.onended = () => {
                    stopScreenSharing();
                };

                setIsScreenSharing(true);
            } catch (err) {
                console.warn("Screen share cancelled or failed:", err);
            }
        } else {
            stopScreenSharing();
        }
    };

    const stopScreenSharing = () => {
        if (screenStreamRef.current) {
            screenStreamRef.current.getTracks().forEach((t) => t.stop());
            screenStreamRef.current = null;
        }

        // Revert peer tracks back to webcam
        if (localStream) {
            const cameraTrack = localStream.getVideoTracks()[0];
            if (cameraTrack) {
                Object.values(connectionsRef.current).forEach((pc) => {
                    const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
                    if (sender) {
                        sender.replaceTrack(cameraTrack);
                    }
                });
            }
        }

        setIsScreenSharing(false);
    };

    // 8. Reactions & Raise Hand
    const showFloatingReaction = (emoji, sender) => {
        const id = Date.now() + Math.random();
        setActiveReactions((prev) => [...prev, { id, emoji, sender }]);

        setTimeout(() => {
            setActiveReactions((prev) => prev.filter((r) => r.id !== id));
        }, 3500);
    };

    const handleSendReaction = (emoji) => {
        showFloatingReaction(emoji, "You");
        if (socketRef.current) {
            socketRef.current.emit("chat-message", `[REACTION]:${emoji}`, username);
        }
    };

    const handleToggleHand = () => {
        setIsHandRaised((prev) => !prev);
    };

    // 9. Chat Messaging
    const handleSendMessage = (text) => {
        if (socketRef.current) {
            socketRef.current.emit("chat-message", text, username);
        }
    };

    // 10. Copy Meeting Link Helper
    const handleCopyInviteLink = () => {
        const inviteUrl = window.location.href;
        navigator.clipboard.writeText(inviteUrl);
        setSnackbar({
            open: true,
            message: `Invite link copied to clipboard!`
        });
    };

    // 11. End Call / Leave
    const handleEndCall = () => {
        setOpenLeaveModal(true);
    };

    const confirmEndCall = () => {
        setOpenLeaveModal(false);
        if (localStream) {
            localStream.getTracks().forEach((t) => t.stop());
        }
        if (socketRef.current) {
            socketRef.current.disconnect();
        }
        navigate("/home");
    };

    // Render Pre-meeting Lobby if user has not entered yet
    if (isInLobby) {
        return (
            <LobbyPreview
                stream={localStream}
                meetingCode={meetingCode}
                username={username}
                onUsernameChange={setUsername}
                isAudioMuted={isAudioMuted}
                isVideoMuted={isVideoMuted}
                onToggleAudio={handleToggleAudio}
                onToggleVideo={handleToggleVideo}
                onJoinMeeting={handleJoinMeeting}
                onCancel={() => navigate("/home")}
                permissionError={permissionError}
            />
        );
    }

    const totalParticipants = 1 + remoteVideos.length;

    return (
        <Box
            sx={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}
        >
            <SpaceBackground />

            {/* Meeting Header Bar */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderBottom: "1px solid var(--border-glass)",
                    backgroundColor: "var(--surface-glass)",
                    backdropFilter: "blur(14px)",
                    position: "relative",
                    zIndex: 10
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>
                        Sabka Video Call
                    </Typography>
                    <Chip
                        label={meetingCode}
                        size="small"
                        sx={{
                            backgroundColor: "rgba(249, 115, 22, 0.15)",
                            color: "var(--accent-orange)",
                            fontFamily: "monospace",
                            fontWeight: 700,
                            border: "1px solid rgba(249, 115, 22, 0.3)"
                        }}
                    />
                    <Tooltip title="Copy Invite Link">
                        <Button
                            size="small"
                            variant="text"
                            onClick={handleCopyInviteLink}
                            startIcon={<ContentCopyIcon fontSize="small" />}
                            sx={{ color: "var(--text-muted)", textTransform: "none", fontSize: "0.8rem" }}
                        >
                            Copy Link
                        </Button>
                    </Tooltip>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <ThemeToggle />
                    <Chip
                        label={connectionStatus}
                        size="small"
                        color={connectionStatus === "Connected" ? "success" : "warning"}
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                    />
                </Box>
            </Box>

            {/* Video Conference Adaptive Grid */}
            <Box
                sx={{
                    flexGrow: 1,
                    p: 2,
                    pb: 12,
                    display: "grid",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: totalParticipants === 1 ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
                        md:
                            totalParticipants <= 2
                                ? "repeat(2, 1fr)"
                                : totalParticipants <= 4
                                ? "repeat(2, 1fr)"
                                : "repeat(auto-fit, minmax(340px, 1fr))"
                    },
                    gridAutoRows: "1fr",
                    maxHeight: "calc(100vh - 140px)",
                    overflowY: "auto"
                }}
            >
                {/* Local Video Tile */}
                <VideoTile
                    stream={localStream}
                    isLocal={true}
                    participantName={username || "You"}
                    isAudioMuted={isAudioMuted}
                    isVideoMuted={isVideoMuted}
                />

                {/* Remote Participants Video Tiles */}
                {remoteVideos.map((video) => (
                    <VideoTile
                        key={video.socketId}
                        stream={video.stream}
                        isLocal={false}
                        participantName={`Participant`}
                    />
                ))}
            </Box>

            {/* Floating Reactions Overlay */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 100,
                    right: 32,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    pointerEvents: "none",
                    zIndex: 2000
                }}
            >
                {activeReactions.map((r) => (
                    <Box
                        key={r.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: "rgba(15, 23, 42, 0.85)",
                            backdropFilter: "blur(8px)",
                            px: 2,
                            py: 1,
                            borderRadius: "20px",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                            animation: "floatUp 3.5s forwards"
                        }}
                    >
                        <Typography sx={{ fontSize: "1.6rem" }}>{r.emoji}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#ffffff" }}>
                            {r.sender}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Meeting Controls Toolbar */}
            <MeetingControls
                isAudioMuted={isAudioMuted}
                isVideoMuted={isVideoMuted}
                isScreenSharing={isScreenSharing}
                isHandRaised={isHandRaised}
                unreadMessages={unreadCount}
                isChatOpen={isChatOpen}
                isParticipantsOpen={isParticipantsOpen}
                onToggleAudio={handleToggleAudio}
                onToggleVideo={handleToggleVideo}
                onToggleScreenShare={handleToggleScreenShare}
                onToggleHand={handleToggleHand}
                onSendReaction={handleSendReaction}
                onToggleChat={() => {
                    setIsChatOpen(!isChatOpen);
                    setUnreadCount(0);
                }}
                onToggleParticipants={() => setIsParticipantsOpen(!isParticipantsOpen)}
                onEndCall={handleEndCall}
            />

            {/* In-Call Chat Drawer */}
            <ChatDrawer
                open={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                messages={messages}
                onSendMessage={handleSendMessage}
                currentUsername={username}
            />

            {/* Participants Drawer */}
            <ParticipantsDrawer
                open={isParticipantsOpen}
                onClose={() => setIsParticipantsOpen(false)}
                localUsername={username || "You"}
                isAudioMuted={isAudioMuted}
                isVideoMuted={isVideoMuted}
                isHandRaised={isHandRaised}
                remoteParticipants={remoteVideos}
            />

            {/* Toast Notification */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="success" sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Sci-Fi Glass Exit Modal */}
            <LeaveMeetingModal
                open={openLeaveModal}
                onClose={() => setOpenLeaveModal(false)}
                onConfirm={confirmEndCall}
            />
        </Box>
    );
}