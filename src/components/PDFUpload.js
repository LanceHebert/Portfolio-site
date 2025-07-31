import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { extractTextFromPDF, parseResumeText } from "../services/pdfService";
import { updateResumeContent } from "../services/llmService";

const PDFUpload = ({ onResumeLoaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");
    setFileName(file.name);

    try {
      // Extract text from PDF
      const extractedText = await extractTextFromPDF(file);

      // Parse the resume text
      const parsedResume = parseResumeText(extractedText);

      // Update the AI's knowledge base
      updateResumeContent(extractedText);

      // Show success message
      setSuccess(
        `Resume loaded successfully! Found ${parsedResume.skills.length} skills and experience information.`
      );

      // Notify parent component
      if (onResumeLoaded) {
        onResumeLoaded(parsedResume);
      }
    } catch (error) {
      console.error("Error processing PDF:", error);
      setError("Failed to process PDF file. Please try again.");
    } finally {
      setIsLoading(false);
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
      <Typography
        variant="h6"
        sx={{
          color: "#00ffff",
          mb: 2,
          textAlign: "center",
          textShadow: "0 0 5px #00ffff",
        }}
      >
        Upload Resume (Optional)
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <input
          accept=".pdf"
          style={{ display: "none" }}
          id="pdf-upload"
          type="file"
          onChange={handleFileUpload}
          disabled={isLoading}
        />
        <label htmlFor="pdf-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <CloudUploadIcon />
            }
            disabled={isLoading}
            sx={{
              color: "#00ffff",
              borderColor: "#00ffff",
              "&:hover": {
                borderColor: "#33ffff",
                backgroundColor: "rgba(0, 255, 255, 0.1)",
              },
            }}
          >
            {isLoading ? "Processing..." : "Upload PDF Resume"}
          </Button>
        </label>
      </Box>

      {fileName && (
        <Typography
          variant="body2"
          sx={{
            color: "#ffffff",
            mt: 1,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          File: {fileName}
        </Typography>
      )}

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

      <Typography
        variant="body2"
        sx={{
          color: "#cccccc",
          mt: 2,
          textAlign: "center",
          fontSize: "0.8rem",
        }}
      >
        Upload your PDF resume to make the AI assistant smarter about your
        background.
        <br />
        Max file size: 5MB
      </Typography>
    </Paper>
  );
};

export default PDFUpload;
