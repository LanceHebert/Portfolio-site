import {
  sendMessageToLLM,
  checkOllamaStatus,
  updateResumeContent,
} from "./llmService";

// Mock fetch globally
global.fetch = jest.fn();

describe("llmService", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    fetch.mockClear();
  });

  describe("sendMessageToLLM", () => {
    test("should send message to Railway backend successfully", async () => {
      const mockResponse = {
        response: "Hello! I am Lance's AI assistant. How can I help you today?",
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await sendMessageToLLM("Hello");

      expect(fetch).toHaveBeenCalledWith(
        "https://portfolio-ai-backend-production-1fa0.up.railway.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Hello",
          }),
        }
      );

      expect(result).toBe(mockResponse.response);
    });

    test("should handle Railway API errors gracefully", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await sendMessageToLLM("Hello");

      // Should fall back to simulated response
      expect(result).toContain("Hi! I'm Lance's AI assistant");
    });

    test("should handle network errors gracefully", async () => {
      fetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await sendMessageToLLM("Hello");

      // Should fall back to simulated response
      expect(result).toContain("Hi! I'm Lance's AI assistant");
    });

    test("should return simulated response for experience questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("Tell me about your experience");

      expect(result).toContain("Lance is a Software Engineer with experience");
    });

    test("should return simulated response for skills questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("What are your technical skills?");

      expect(result).toContain("Lance's Technical Skills");
    });

    test("should return simulated response for projects questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM(
        "What projects have you worked on?"
      );

      expect(result).toContain("Lance has worked on various projects");
    });

    test("should return simulated response for contact questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("How can I contact you?");

      expect(result).toContain("You can connect with Lance through");
    });

    test("should return simulated response for interests questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("What are your interests?");

      expect(result).toContain("Lance is passionate about");
    });

    test("should return simulated response for resume questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("Can I see your resume?");

      expect(result).toContain("You can view Lance's resume here");
    });

    test("should return default response for unknown questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("Random question");

      expect(result).toContain("Hi! I'm Lance's AI assistant");
    });

    test("should handle empty messages", async () => {
      const result = await sendMessageToLLM("");

      expect(result).toContain("Hi! I'm Lance's AI assistant");
    });

    test("should handle null messages", async () => {
      const result = await sendMessageToLLM(null);

      expect(result).toContain("Hi! I'm Lance's AI assistant");
    });

    test("should handle undefined messages", async () => {
      const result = await sendMessageToLLM(undefined);

      expect(result).toContain("Hi! I'm Lance's AI assistant");
    });
  });

  describe("checkOllamaStatus", () => {
    test("should return true when Ollama is running", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
      });

      const result = await checkOllamaStatus();

      expect(fetch).toHaveBeenCalledWith("http://localhost:11434/api/tags");
      expect(result).toBe(true);
    });

    test("should return false when Ollama is not running", async () => {
      fetch.mockRejectedValueOnce(new Error("Connection refused"));

      const result = await checkOllamaStatus();

      expect(result).toBe(false);
    });

    test("should return false when Ollama returns error", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      const result = await checkOllamaStatus();

      expect(result).toBe(false);
    });
  });

  describe("updateResumeContent", () => {
    test("should update resume content", () => {
      const testContent = "Updated resume content";

      updateResumeContent(testContent);

      // Since the function updates a module-level variable, we can't easily test it
      // But we can verify the function doesn't throw
      expect(() => updateResumeContent(testContent)).not.toThrow();
    });

    test("should handle empty content", () => {
      expect(() => updateResumeContent("")).not.toThrow();
    });

    test("should handle null content", () => {
      expect(() => updateResumeContent(null)).not.toThrow();
    });
  });

  describe("API delay simulation", () => {
    test("should have a delay before API calls", async () => {
      const startTime = Date.now();

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ response: "Test response" }),
      });

      await sendMessageToLLM("Test message");

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should have at least 1000ms delay (as specified in the service)
      expect(duration).toBeGreaterThanOrEqual(1000);
    });
  });

  describe("Error handling edge cases", () => {
    test("should handle malformed JSON response", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      const result = await sendMessageToLLM("Test message");

      expect(result).toContain("Hi! I'm Lance's AI assistant");
    });

    test("should handle response without expected fields", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const result = await sendMessageToLLM("Test message");

      expect(result).toContain("Hi! I'm Lance's AI assistant");
    });

    test("should handle timeout scenarios", async () => {
      fetch.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ response: "Delayed response" }),
                }),
              2000
            )
          )
      );

      const result = await sendMessageToLLM("Test message");

      // Should fall back to simulated response due to timeout
      expect(result).toContain("Hi! I'm Lance's AI assistant");
    }, 10000); // Increase timeout for this test
  });
});
