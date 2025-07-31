// PDF Text Extraction Service - Simplified Version
// For now, we'll use a text-based approach that you can manually input

// Extract text from PDF file (simplified version)
export async function extractTextFromPDF(file) {
  try {
    // For now, we'll simulate PDF extraction
    // You can manually copy text from your PDF and paste it
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = function (e) {
        // This is a simplified approach - in a real implementation,
        // you'd use a PDF parsing library that's compatible with your React version
        const text =
          "PDF text extraction is available. Please manually input your resume text for now.";
        resolve(text);
      };

      reader.onerror = function () {
        reject(new Error("Failed to read file"));
      };

      reader.readAsText(file);
    });
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF file");
  }
}

// Clean and format extracted text
export function cleanExtractedText(text) {
  return text
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, "\n") // Remove empty lines
    .trim();
}

// Parse resume text into structured information
export function parseResumeText(text) {
  const cleanedText = cleanExtractedText(text);

  // Extract key sections (basic parsing)
  const sections = {
    fullText: cleanedText,
    skills: extractSkills(cleanedText),
    experience: extractExperience(cleanedText),
    education: extractEducation(cleanedText),
  };

  return sections;
}

// Basic skill extraction
function extractSkills(text) {
  const skillKeywords = [
    "javascript",
    "react",
    "ruby",
    "rails",
    "postgresql",
    "sqlite",
    "git",
    "postman",
    "html",
    "css",
    "bootstrap",
    "node.js",
    "python",
    "mongodb",
    "aws",
    "docker",
    "typescript",
    "angular",
    "vue",
    "php",
    "java",
    "c++",
    "c#",
    ".net",
  ];

  const foundSkills = skillKeywords.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return foundSkills;
}

// Basic experience extraction
function extractExperience(text) {
  // Look for common experience indicators
  const experienceIndicators = [
    "experience",
    "work history",
    "employment",
    "job",
    "position",
    "software engineer",
    "developer",
    "programmer",
    "full-stack",
    "frontend",
    "backend",
    "web developer",
  ];

  const hasExperience = experienceIndicators.some((indicator) =>
    text.toLowerCase().includes(indicator.toLowerCase())
  );

  return hasExperience
    ? "Experience information found in resume"
    : "No specific experience details found";
}

// Basic education extraction
function extractEducation(text) {
  const educationKeywords = [
    "education",
    "degree",
    "bachelor",
    "master",
    "phd",
    "university",
    "college",
    "computer science",
    "software engineering",
    "information technology",
  ];

  const hasEducation = educationKeywords.some((keyword) =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );

  return hasEducation
    ? "Education information found in resume"
    : "No specific education details found";
}
