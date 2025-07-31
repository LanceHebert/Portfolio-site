import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Alert,
  Paper,
  Collapse,
} from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";
import { parseResumeText } from "../services/pdfService";
import { updateResumeContent } from "../services/llmService";

const ResumeInput = ({ onResumeLoaded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSaveResume = () => {
    if (!resumeText.trim()) {
      setError("Please enter your resume text");
      return;
    }

    try {
      // Parse the resume text
      const parsedResume = parseResumeText(resumeText);

      // Update the AI's knowledge base
      updateResumeContent(resumeText);

      // Show success message
      setSuccess(
        `Resume loaded successfully! Found ${parsedResume.skills.length} skills and experience information.`
      );
      setError("");

      // Notify parent component
      if (onResumeLoaded) {
        onResumeLoaded(parsedResume);
      }

      // Collapse the input
      setIsExpanded(false);
    } catch (error) {
      console.error("Error processing resume text:", error);
      setError("Failed to process resume text. Please try again.");
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        background: "rgba(0, 255, 255, 0.1)",
        border: "1px solid #00ffff",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#00ffff",
            textShadow: "0 0 5px #00ffff",
          }}
        >
          Add Resume Information
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={isExpanded ? <SaveIcon /> : <EditIcon />}
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            color: "#00ffff",
            borderColor: "#00ffff",
            "&:hover": {
              borderColor: "#33ffff",
              backgroundColor: "rgba(0, 255, 255, 0.1)",
            },
          }}
        >
          {isExpanded ? "Save" : "Edit"}
        </Button>
      </Box>

      <Collapse in={isExpanded}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#cccccc",
              mb: 2,
              fontSize: "0.9rem",
            }}
          >
            Copy and paste your resume text here to make the AI assistant
            smarter about your background:
          </Typography>

          <TextField
            multiline
            rows={6}
            fullWidth
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#ffffff",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderColor: "#00ffff",
                "& fieldset": {
                  borderColor: "#00ffff",
                },
                "&:hover fieldset": {
                  borderColor: "#33ffff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00ffff",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#cccccc",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#888888",
                opacity: 1,
              },
            }}
          />

          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleSaveResume}
              sx={{
                backgroundColor: "#00ffff",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#33ffff",
                },
              }}
            >
              Save Resume
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setResumeText("");
                setError("");
                setSuccess("");
              }}
              sx={{
                color: "#00ffff",
                borderColor: "#00ffff",
                "&:hover": {
                  borderColor: "#33ffff",
                  backgroundColor: "rgba(0, 255, 255, 0.1)",
                },
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
      </Collapse>

      {error && (
        <Alert
          severity="error"
          sx={{
            mt: 2,
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            border: "1px solid #ff0000",
            color: "#ffffff",
          }}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{
            mt: 2,
            backgroundColor: "rgba(0, 255, 0, 0.1)",
            border: "1px solid #00ff00",
            color: "#ffffff",
          }}
        >
          {success}
        </Alert>
      )}

      {!isExpanded && (
        <Typography
          variant="body2"
          sx={{
            color: "#cccccc",
            textAlign: "center",
            fontSize: "0.8rem",
          }}
        >
          Click "Edit" to add your resume information and make the AI assistant
          smarter about your background.
        </Typography>
      )}
    </Paper>
  );
};

export default ResumeInput;
