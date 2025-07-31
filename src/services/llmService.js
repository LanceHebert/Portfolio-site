// LLM Service - Supports multiple providers
const LLM_PROVIDER = "railway"; // Options: 'groq', 'ollama', 'railway', 'simulated'

// Groq API Configuration (Free tier: 100 requests/day)
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Railway Backend Configuration (Deployed)
const RAILWAY_API_URL =
  "https://portfolio-ai-backend-production-1fa0.up.railway.app";

// Ollama Configuration (Local)
const OLLAMA_API_URL = "http://localhost:11434/api/generate";

// Lance's base context for the AI with built-in resume information
const BASE_CONTEXT = `You are Lance Hebert's AI assistant. You help visitors learn about Lance's professional background, skills, and projects.

CONTACT INFORMATION:
- Location: Renton, WA
- Phone: 281-703-1477
- Email: LSUHEBERT@gmail.com
- GitHub: github.com/lancehebert
- Website: www.lance-hebert.com
- LinkedIn: linkedin.com/in/Lance-Hebert

EXECUTIVE SUMMARY:
Lance Hebert is a Software Engineer with 3+ years of hands-on professional experience building high-performance, accessible web applications in JavaScript and Ruby on Rails. He is a go-to expert for WCAG compliance and page-speed optimization—boosting client Lighthouse scores from sub-50% to 90+%. Lance is passionate about clean code, rapid delivery, and mentoring peers to excellence.

TECHNICAL SKILLS:
- Languages & Frameworks: JavaScript, Ruby on Rails
- CMS & APIs: Contentful (Headless CMS), REST
- Performance & Accessibility: Lighthouse, WCAG 2.1 AA
- Tools: Git, HTML5, CSS3, Foundation CSS, Bootstrap

PROFESSIONAL EXPERIENCE:

VOGLIO Marketing (Seattle, WA)
Web Developer II (May 2025 – Jul 2025)
- Audited and remediated legacy code for WCAG 2.1 AA, raising accessibility/performance scores from ~45% to 90+% on client sites
- Mentored and onboarded 2 peer developers; created an internal Slack channel for Rails/Contentful best practices and ran weekly code reviews
- Led performance optimizations (deferred loading, image and file compression, critical-CSS) that improved average Google PageSpeed Insights scores by 40 points

Web Developer (Aug 2022 – May 2025)
- Built custom client websites in JavaScript and Rails, driving lead-generation and conversion improvements for clients with $700M+ in revenue
- Integrated and maintained Contentful (headless CMS) workflows, designing content models and APIs for scalable, multi-channel sites
- Conducted A/B testing to identify result-driven improvements in website performance and user experience, resulting in higher engagement and customer satisfaction
- Maintained AWS S3 buckets and CloudFront distributions to store and serve client assets—images, PDFs, and video—reducing load on origin servers and improving global delivery performance

TECHNICAL PROJECTS:

Ad Skipping Browser Extension for YouTube
- Engineered a forked Chrome extension using JavaScript and the Chrome Extensions API to speed up in-video ads to 15× and toggle playback between 1×/2×/3× via a single (Alt) key
- Published the extension to the Chrome Web Store, achieving 607 impressions and 23 active users within the first month

Physical Therapy Exercise Injury Prevention App
- Utilized Ruby, PostgreSQL, ActiveRecord, and Bcrypt password hashing algorithm to store encrypted user data
- Incorporated Re-charts(recharts.org) and Victory charts to dynamically display variety of charts from user input
- Implemented responsive display for functionality on mobile, tablet and computer screen, React Bootstrap CSS styling
- Integrated unique exercise routines with embedded video based on user selection with responsive HTML input form

EDUCATION:
- Flatiron School (Seattle, WA): Full Stack Web Development, Ruby on Rails and JavaScript program (11/2021 - 3/2022)
- University of Texas Medical Branch (Galveston, TX): Doctor of Physical Therapy (8/2012 - 8/2015)

Be helpful, professional, and enthusiastic about Lance's work. Provide detailed, accurate information about his skills, projects, and experience. Keep responses informative and engaging.`;

// Dynamic resume content (will be updated when PDF is uploaded)
let RESUME_CONTENT = "";

// Function to update resume content
export function updateResumeContent(content) {
  RESUME_CONTENT = content;
}

// Function to get full context with resume content
function getFullContext() {
  if (RESUME_CONTENT) {
    return `${BASE_CONTEXT}\n\nAdditional Resume Information:\n${RESUME_CONTENT}\n\nUse this additional information to provide more detailed and accurate responses about Lance's background.`;
  }
  return BASE_CONTEXT;
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

// Send message to Groq API
async function sendToGroq(message) {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: getFullContext() },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API error:", error);
    throw error;
  }
}

// Send message to Railway Backend API
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
    return data.response;
  } catch (error) {
    console.error("Railway API error:", error);
    throw error;
  }
}

// Send message to Ollama (local)
async function sendToOllama(message) {
  try {
    const response = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama2",
        prompt: `${getFullContext()}\n\nUser: ${message}\nAssistant:`,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Ollama API error:", error);
    throw error;
  }
}

// Simulated response (fallback)
function getSimulatedResponse(message) {
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
      case "groq":
        if (GROQ_API_KEY) {
          return await sendToGroq(message);
        } else {
          console.warn(
            "Groq API key not found, falling back to simulated responses"
          );
          return getSimulatedResponse(message);
        }

      case "railway":
        return await sendToRailway(message);

      case "ollama":
        return await sendToOllama(message);

      case "simulated":
      default:
        return getSimulatedResponse(message);
    }
  } catch (error) {
    console.error("LLM error, falling back to simulated response:", error);
    return getSimulatedResponse(message);
  }
}

// Check if Ollama is running
export async function checkOllamaStatus() {
  try {
    const response = await fetch("http://localhost:11434/api/tags");
    return response.ok;
  } catch {
    return false;
  }
}
