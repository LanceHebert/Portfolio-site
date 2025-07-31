import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleAIResponse = useCallback(async (message) => {
    try {
      return await sendMessageToLLM(message);
    } catch (error) {
      console.error("Error getting AI response:", error);
      return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
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
  }, [inputMessage, handleAIResponse]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleOpenChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    setInputMessage(e.target.value);
  }, []);

  // Memoize the send button disabled state
  const isSendDisabled = useMemo(() => {
    return !inputMessage.trim() || isLoading;
  }, [inputMessage, isLoading]);

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
        onClick={handleOpenChat}
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
        onClose={handleCloseChat}
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
              className="chatbot-icon"
            />
            <Typography variant="h6">Lance's AI Assistant</Typography>
          </Box>
          <IconButton onClick={handleCloseChat} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="chatbot-dialog-content">
          {/* Messages Area */}
          <Box className="chatbot-messages-area">
            {messages.map((message) => (
              <Box
                key={message.id}
                className={`chatbot-message-container ${message.sender}`}
              >
                <Box className="chatbot-message-wrapper">
                  {message.sender === "bot" && (
                    <Avatar className="chatbot-avatar">
                      <img
                        src="/favicon.ico"
                        alt="Lance's Icon"
                        className="chatbot-avatar-icon"
                      />
                    </Avatar>
                  )}
                  <Paper className={`chatbot-message-paper ${message.sender}`}>
                    <Typography
                      variant="body2"
                      className={`chatbot-message-text ${message.sender}`}
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
                  <Paper className="chatbot-loading-paper">
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
          <Box className="chatbot-input-area">
            <Box className="chatbot-input-wrapper">
              <TextField
                fullWidth
                multiline
                maxRows={3}
                value={inputMessage}
                onChange={handleInputChange}
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
                disabled={isSendDisabled}
                className="chatbot-send-button"
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
