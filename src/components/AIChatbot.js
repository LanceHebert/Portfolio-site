import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  Send as SendIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import { sendMessageToLLM } from "../services/llmService";

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm ChadGPT, Lance's AI assistant. I can help you learn about his skills, experience, and projects. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Get response from LLM service
      const response = await handleAIResponse(inputMessage);

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIResponse = async (message) => {
    try {
      return await sendMessageToLLM(message);
    } catch (error) {
      console.error("Error getting AI response:", error);
      return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Arrow */}
      <div className="chatbot-arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Floating Action Button */}
      <Fab
        aria-label="chat"
        onClick={() => setIsOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: "#00ffff",
          color: "#000000",
          boxShadow: "0 0 15px #00ffff",
          "&:hover": {
            backgroundColor: "#33ffff",
            boxShadow: "0 0 20px #33ffff",
          },
          transition: "all 0.3s ease",
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            height: "70vh",
            maxHeight: "600px",
            background: "#000000",
            border: "2px solid #00ffff",
            boxShadow:
              "0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
            color: "#00ffff",
            textShadow: "0 0 10px #00ffff",
            boxShadow: "0 0 20px #00ffff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="/favicon.ico"
              alt="Lance's Icon"
              style={{
                width: 24,
                height: 24,
                filter: "drop-shadow(0 0 5px #00ffff)",
              }}
            />
            <Typography variant="h6">Lance's AI Assistant</Typography>
          </Box>
          <IconButton onClick={() => setIsOpen(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column" }}>
          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 2,
              background: "#000000",
              border: "1px solid #00ffff",
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    maxWidth: "80%",
                  }}
                >
                  {message.sender === "bot" && (
                    <Avatar
                      sx={{
                        bgcolor: "#00ffff",
                        width: 32,
                        height: 32,
                        boxShadow: "0 0 10px #00ffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/favicon.ico"
                        alt="Lance's Icon"
                        style={{
                          width: 20,
                          height: 20,
                          filter: "drop-shadow(0 0 3px #00ffff)",
                        }}
                      />
                    </Avatar>
                  )}
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor:
                        message.sender === "user"
                          ? "rgba(0, 255, 255, 0.2)"
                          : "rgba(255, 255, 255, 0.1)",
                      color: message.sender === "user" ? "#ffffff" : "#00ffff",
                      borderRadius: 2,
                      boxShadow:
                        message.sender === "user"
                          ? "0 0 10px rgba(0, 255, 255, 0.5)"
                          : "0 0 10px rgba(0, 255, 255, 0.5)",
                      border:
                        message.sender === "user"
                          ? "1px solid #00ffff"
                          : "1px solid #00ffff",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "pre-line",
                        textShadow:
                          message.sender === "user"
                            ? "0 0 2px #ffffff"
                            : "0 0 2px #00ffff",
                      }}
                    >
                      {message.text}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {message.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Paper>
                  {message.sender === "user" && (
                    <Avatar
                      sx={{
                        bgcolor: "#ffffff",
                        width: 32,
                        height: 32,
                        boxShadow: "0 0 10px #ffffff",
                      }}
                    >
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  )}
                </Box>
              </Box>
            ))}
            {isLoading && (
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#00ffff",
                      width: 32,
                      height: 32,
                      boxShadow: "0 0 10px #00ffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/favicon.ico"
                      alt="Lance's Icon"
                      style={{
                        width: 20,
                        height: 20,
                        filter: "drop-shadow(0 0 3px #00ffff)",
                      }}
                    />
                  </Avatar>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid #00ffff",
                      boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
                    }}
                  >
                    <CircularProgress
                      size={20}
                      sx={{
                        color: "#00ffff",
                        "& .MuiCircularProgress-circle": {
                          strokeLinecap: "round",
                        },
                      }}
                    />
                  </Paper>
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #00ffff",
              background: "#000000",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                multiline
                maxRows={3}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Lance's skills, experience, or projects..."
                variant="outlined"
                size="small"
                disabled={isLoading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#00ffff",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid #00ffff",
                    borderRadius: 2,
                    "&:hover": {
                      border: "1px solid #33ffff",
                      boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
                    },
                    "&.Mui-focused": {
                      border: "2px solid #00ffff",
                      boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#00ffff",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(0, 255, 255, 0.7)",
                    opacity: 1,
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                sx={{
                  alignSelf: "flex-end",
                  backgroundColor: "#00ffff",
                  color: "#000000",
                  boxShadow: "0 0 15px #00ffff",
                  "&:hover": {
                    backgroundColor: "#33ffff",
                    boxShadow: "0 0 20px #33ffff",
                  },
                  "&:disabled": {
                    backgroundColor: "rgba(0, 255, 255, 0.3)",
                    boxShadow: "none",
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIChatbot;
