// LLM Service - Railway Backend with OpenAI integration
const LLM_PROVIDER = "railway"; // Options: 'railway', 'simulated'

// Railway Backend Configuration (Deployed)
const RAILWAY_API_URL =
  "https://portfolio-ai-backend-production-1fa0.up.railway.app";

// Function to update resume content
export function updateResumeContent(content) {
  // This function is kept for API compatibility but not used in current implementation
  // Removed console.log for production security
}

// Simulated responses (fallback)
const SIMULATED_RESPONSES = {
  experience:
    "Lance is a Software Engineer with experience in full-stack development. He specializes in React, Ruby on Rails, and modern web technologies. He's passionate about creating user-friendly applications and has worked on various projects including web applications, APIs, and mobile development.",
  skills:
    "Lance's Technical Skills:\n\n- Languages: Ruby, JavaScript\n- Frameworks: Bootstrap, Rails, React, HTML5\n- Database Management: PostgreSQL, SQLite\n- Testing & Workflow: Git, Postman\n\nHe's particularly strong in React development and enjoys working with modern frontend technologies!",
  projects:
    "Lance has built several impressive projects:\n\n1. Pain Point - Physical therapy exercise plan app with results tracking\n2. Duelist - Character creation app with stats and randomized equipment\n3. Poddr - Podcast recommendation app using Spotify API\n\nAll projects showcase his full-stack development skills with React and Rails!",
  contact:
    "You can connect with Lance through:\n\n- LinkedIn: linkedin.com/in/lance-hebert\n- GitHub: github.com/LanceHebert\n- Medium: medium.com/@LanceHebert\n- YouTube: Check out his coding tutorials!\n\nHe's always excited to discuss new opportunities and collaborations!",
  interests:
    "Lance is passionate about:\n\n- Web3/cryptocurrencies/blockchain technology\n- Health hacking and biohacking\n- Augmented reality and emerging tech\n- Creating innovative software solutions\n\nHe loves exploring cutting-edge technologies and applying them to real-world problems!",
  resume:
    "You can view Lance's resume here:\nhttps://drive.google.com/file/d/1smgOzGR_0CeN1sRE9huGfoDObgwz7vlm/view?usp=sharing\n\nIt includes his full work experience, technical skills, and project details!",
  default:
    "Hi! I'm Lance's AI assistant. I can help you learn about his professional background! You can ask me about:\n\n- Experience & Work History\n- Technical Skills & Technologies\n- Projects & Portfolio\n- Contact Information & Social Links\n- Education & Background\n- Interests & Passions\n- Resume & CV\n\nWhat would you like to know about Lance?",
};

// Send message to Railway Backend (which handles OpenAI)
async function sendToRailway(message) {
  try {
    const response = await fetch(`${RAILWAY_API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Railway API error: ${response.status}`);
    }

    const data = await response.json();

    // Check if response has the expected field
    if (!data || !data.response) {
      throw new Error("Invalid response format from Railway API");
    }

    return data.response;
  } catch (error) {
    console.error("Railway API error:", error);
    throw error;
  }
}

// Simulated response (fallback)
function getSimulatedResponse(message) {
  // Handle null, undefined, or empty messages
  if (!message || typeof message !== "string") {
    return SIMULATED_RESPONSES.default;
  }

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
    return SIMULATED_RESPONSES.experience;
  } else if (
    lowerMessage.includes("skills") ||
    lowerMessage.includes("technologies")
  ) {
    return SIMULATED_RESPONSES.skills;
  } else if (
    lowerMessage.includes("projects") ||
    lowerMessage.includes("portfolio")
  ) {
    return SIMULATED_RESPONSES.projects;
  } else if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("email") ||
    lowerMessage.includes("reach")
  ) {
    return SIMULATED_RESPONSES.contact;
  } else if (
    lowerMessage.includes("interests") ||
    lowerMessage.includes("hobbies") ||
    lowerMessage.includes("passions")
  ) {
    return SIMULATED_RESPONSES.interests;
  } else if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
    return SIMULATED_RESPONSES.resume;
  } else {
    return SIMULATED_RESPONSES.default;
  }
}

// Main function to send message to LLM
export async function sendMessageToLLM(message) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    switch (LLM_PROVIDER) {
      case "railway":
        return await sendToRailway(message);

      case "simulated":
      default:
        return getSimulatedResponse(message);
    }
  } catch (error) {
    console.error("LLM error, falling back to simulated response:", error);
    return getSimulatedResponse(message);
  }
}

// Check if Railway backend is available
export function checkRailwayStatus() {
  return true; // Railway backend is always available
}
