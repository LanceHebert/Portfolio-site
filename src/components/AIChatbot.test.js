import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AIChatbot from "./AIChatbot";

// Mock the llmService
jest.mock("../services/llmService", () => ({
  sendMessageToLLM: jest.fn(),
  checkOllamaStatus: jest.fn(),
}));

// Mock Material-UI components
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  Box: ({ children, ...props }) => <div {...props}>{children}</div>,
  Paper: ({ children, ...props }) => <div {...props}>{children}</div>,
  TextField: ({ onChange, value, onKeyPress, ...props }) => (
    <input
      data-testid="chat-input"
      onChange={onChange}
      value={value}
      onKeyPress={onKeyPress}
      {...props}
    />
  ),
  Typography: ({ children, ...props }) => <div {...props}>{children}</div>,
  CircularProgress: () => <div data-testid="loading-spinner">Loading...</div>,
  IconButton: ({ children, onClick, disabled, ...props }) => (
    <button
      data-testid="send-button"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  ),
  Avatar: ({ children, ...props }) => <div {...props}>{children}</div>,
  Fab: ({ children, onClick, ...props }) => (
    <button data-testid="chat-fab" onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Dialog: ({ children, open, onClose, ...props }) => (
    <div
      data-testid="chat-dialog"
      style={{ display: open ? "block" : "none" }}
      {...props}
    >
      {children}
    </div>
  ),
  DialogTitle: ({ children, ...props }) => <div {...props}>{children}</div>,
  DialogContent: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

// Mock Material-UI icons
jest.mock("@mui/icons-material", () => ({
  Send: () => <span data-testid="send-icon">Send</span>,
  Person: () => <span data-testid="person-icon">Person</span>,
  Close: () => <span data-testid="close-icon">Close</span>,
  Chat: () => <span data-testid="chat-icon">Chat</span>,
}));

describe("AIChatbot Component", () => {
  let mockSendMessageToLLM;
  let mockCheckOllamaStatus;

  // Helper function to get the correct send button
  const getSendButton = () => {
    const sendButtons = screen.getAllByTestId("send-button");
    return sendButtons.find((button) =>
      button.querySelector('[data-testid="send-icon"]')
    );
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();

    // Get the mocked functions
    const llmService = require("../services/llmService");
    mockSendMessageToLLM = llmService.sendMessageToLLM;
    mockCheckOllamaStatus = llmService.checkOllamaStatus;
  });

  test("renders chatbot interface", () => {
    render(<AIChatbot />);

    // Check if the main elements are rendered
    expect(screen.getByText(/ChadGPT/i)).toBeInTheDocument();
    expect(screen.getByTestId("chat-fab")).toBeInTheDocument();
    expect(screen.getByTestId("chat-icon")).toBeInTheDocument();
  });

  test("allows user to type in chat input", () => {
    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    fireEvent.change(input, { target: { value: "Hello, how are you?" } });

    expect(input.value).toBe("Hello, how are you?");
  });

  test("sends message when send button is clicked", async () => {
    mockSendMessageToLLM.mockResolvedValue(
      "Hello! I am Lance's AI assistant. How can I help you today?"
    );

    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    const sendButton = getSendButton();

    // Type a message
    fireEvent.change(input, { target: { value: "Hello" } });

    // Click send button
    fireEvent.click(sendButton);

    // Wait for the API call
    await waitFor(() => {
      expect(mockSendMessageToLLM).toHaveBeenCalledWith("Hello");
    });

    // Check if the response is displayed
    await waitFor(() => {
      expect(
        screen.getByText(/Hello! I am Lance's AI assistant/)
      ).toBeInTheDocument();
    });
  });

  test("sends message when Enter key is pressed", async () => {
    mockSendMessageToLLM.mockResolvedValue("Thanks for your message!");

    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");

    // Type a message and press Enter
    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

    // Wait for the API call
    await waitFor(() => {
      expect(mockSendMessageToLLM).toHaveBeenCalledWith("Test message");
    });
  });

  test("shows loading state while waiting for response", async () => {
    // Create a promise that we can resolve later
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockSendMessageToLLM.mockReturnValue(promise);

    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    const sendButton = getSendButton();

    // Type and send message
    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(sendButton);

    // Check if loading spinner appears
    await waitFor(() => {
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    // Check if send button is disabled during loading
    expect(sendButton).toBeDisabled();

    // Resolve the promise
    resolvePromise("Response received");

    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });

  test("handles API errors gracefully", async () => {
    mockSendMessageToLLM.mockRejectedValue(new Error("API Error"));

    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    const sendButton = getSendButton();

    // Type and send message
    fireEvent.change(input, { target: { value: "Test error" } });
    fireEvent.click(sendButton);

    // Wait for error handling
    await waitFor(() => {
      expect(
        screen.getByText(/I'm sorry, I'm having trouble/)
      ).toBeInTheDocument();
    });
  });

  test("clears input after sending message", async () => {
    mockSendMessageToLLM.mockResolvedValue("Response");

    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    const sendButton = getSendButton();

    // Type and send message
    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.click(sendButton);

    // Wait for input to be cleared
    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  test("does not send empty messages", () => {
    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    const sendButton = getSendButton();

    // Try to send empty message
    fireEvent.click(sendButton);

    // Check that API was not called
    expect(mockSendMessageToLLM).not.toHaveBeenCalled();
  });

  test("does not send whitespace-only messages", () => {
    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    const sendButton = getSendButton();

    // Try to send whitespace-only message
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(sendButton);

    // Check that API was not called
    expect(mockSendMessageToLLM).not.toHaveBeenCalled();
  });

  test("displays conversation history", async () => {
    mockSendMessageToLLM
      .mockResolvedValueOnce("First response")
      .mockResolvedValueOnce("Second response");

    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    const sendButton = screen.getByTestId("send-button");

    // Send first message
    fireEvent.change(input, { target: { value: "First message" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("First response")).toBeInTheDocument();
    });

    // Send second message
    fireEvent.change(input, { target: { value: "Second message" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Second response")).toBeInTheDocument();
    });

    // Check that both messages are in the conversation
    expect(screen.getByText("First message")).toBeInTheDocument();
    expect(screen.getByText("Second message")).toBeInTheDocument();
    expect(screen.getByText("First response")).toBeInTheDocument();
    expect(screen.getByText("Second response")).toBeInTheDocument();
  });

  test("handles special characters in messages", async () => {
    mockSendMessageToLLM.mockResolvedValue("Response with special chars");

    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    const sendButton = screen.getByTestId("send-button");

    // Send message with special characters
    const specialMessage = "Hello! How are you? 😊 @#$%^&*()";
    fireEvent.change(input, { target: { value: specialMessage } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSendMessageToLLM).toHaveBeenCalledWith(specialMessage);
    });
  });

  test("maintains scroll position for long conversations", async () => {
    // Mock scrollIntoView
    const mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    mockSendMessageToLLM.mockResolvedValue("Response");

    render(<AIChatbot />);

    // Open the chat dialog first
    const chatFab = screen.getByTestId("chat-fab");
    fireEvent.click(chatFab);

    const input = screen.getByTestId("chat-input");
    const sendButton = screen.getByTestId("send-button");

    // Send a message
    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(sendButton);

    // Check if scrollIntoView was called
    await waitFor(() => {
      expect(mockScrollIntoView).toHaveBeenCalled();
    });
  });
});
