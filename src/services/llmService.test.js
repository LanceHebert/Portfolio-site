import {
  sendMessageToLLM,
  updateResumeContent,
  checkRailwayStatus,
} from "./llmService";

// Mock fetch globally
global.fetch = jest.fn();

describe("llmService", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe("sendMessageToLLM", () => {
    test("should send message to Railway backend successfully", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          response: "Test Railway response",
        }),
      });

      const result = await sendMessageToLLM("Test message");

      expect(result).toBe("Test Railway response");
      expect(fetch).toHaveBeenCalledWith(
        "https://portfolio-ai-backend-production-1fa0.up.railway.app/api/chat",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            message: "Test message",
          }),
        })
      );
    });

    test("should handle Railway API errors gracefully", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await sendMessageToLLM("Test message");

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toContain("Lance");
    });

    test("should handle network errors gracefully", async () => {
      fetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await sendMessageToLLM("Test message");

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toContain("Lance");
    });

    test("should return simulated response for experience questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("Tell me about your experience");

      expect(result).toContain("Software Engineer");
      expect(result).toContain("React");
      expect(result).toContain("Rails");
    });

    test("should return simulated response for skills questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("What are your technical skills?");

      expect(result).toContain("Technical Skills");
      expect(result).toContain("Ruby");
      expect(result).toContain("JavaScript");
    });

    test("should return simulated response for projects questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM(
        "What projects have you worked on?"
      );

      expect(result).toContain("projects");
      expect(result).toContain("React");
      expect(result).toContain("Rails");
    });

    test("should return simulated response for contact questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("How can I contact you?");

      expect(result).toContain("connect");
      expect(result).toContain("LinkedIn");
      expect(result).toContain("GitHub");
    });

    test("should return simulated response for interests questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("What are your interests?");

      expect(result).toContain("passionate");
      expect(result).toContain("Web3");
      expect(result).toContain("technology");
    });

    test("should return simulated response for resume questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("Can I see your resume?");

      expect(result).toContain("resume");
      expect(result).toContain("drive.google.com");
    });

    test("should return default response for unknown questions", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("Random question");

      expect(result).toContain("AI assistant");
      expect(result).toContain("professional background");
    });

    test("should handle empty messages", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM("");

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    test("should handle null messages", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM(null);

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    test("should handle undefined messages", async () => {
      fetch.mockRejectedValueOnce(new Error("API error"));

      const result = await sendMessageToLLM(undefined);

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });

  describe("checkRailwayStatus", () => {
    test("should return true when Railway backend is available", () => {
      const result = checkRailwayStatus();

      expect(result).toBe(true);
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
        json: async () => ({
          response: "Test response",
        }),
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

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    test("should handle response without expected fields", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const result = await sendMessageToLLM("Test message");

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    test("should handle timeout scenarios", async () => {
      fetch.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({
                    response: "Delayed response",
                  }),
                }),
              2000
            )
          )
      );

      const result = await sendMessageToLLM("Test message");

      // Should fall back to simulated response due to timeout
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    }, 10000); // Increase timeout for this test
  });
});
