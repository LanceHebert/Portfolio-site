import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock the components to avoid complex rendering issues
jest.mock("./components/ResponsiveAppBar", () => {
  return function MockResponsiveAppBar() {
    return <div data-testid="responsive-app-bar">ResponsiveAppBar</div>;
  };
});

jest.mock("./components/HeroSection", () => {
  return function MockHeroSection() {
    return <div data-testid="hero-section">HeroSection</div>;
  };
});

jest.mock("./components/ProjectsSection", () => {
  return function MockProjectsSection() {
    return <div data-testid="projects-section">ProjectsSection</div>;
  };
});

jest.mock("./components/SkillsSection", () => {
  return function MockSkillsSection() {
    return <div data-testid="skills-section">SkillsSection</div>;
  };
});

jest.mock("./components/TextBox", () => {
  return function MockTextBox() {
    return <div data-testid="text-box">TextBox</div>;
  };
});

jest.mock("./components/AIChatbot", () => {
  return function MockAIChatbot() {
    return <div data-testid="ai-chatbot">AIChatbot</div>;
  };
});

describe("App Component", () => {
  test("renders all main components", () => {
    render(<App />);

    // Check that all main components are rendered
    expect(screen.getByTestId("responsive-app-bar")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("text-box")).toBeInTheDocument();
    expect(screen.getByTestId("skills-section")).toBeInTheDocument();
    expect(screen.getByTestId("projects-section")).toBeInTheDocument();
    expect(screen.getByTestId("ai-chatbot")).toBeInTheDocument();
  });

  test("renders components in correct order", () => {
    render(<App />);

    const container = screen.getByTestId("responsive-app-bar").parentElement;
    const children = Array.from(container.children);

    // Check the order of components
    expect(children[0]).toHaveAttribute("data-testid", "responsive-app-bar");
    expect(children[1]).toHaveAttribute("data-testid", "hero-section");
    expect(children[2]).toHaveAttribute("data-testid", "text-box");
    expect(children[3]).toHaveAttribute("data-testid", "skills-section");
    expect(children[4]).toHaveAttribute("data-testid", "projects-section");
    expect(children[5]).toHaveAttribute("data-testid", "ai-chatbot");
  });

  test("uses React.memo for performance optimization", () => {
    // Check if App component is memoized
    expect(App.displayName || App.name).toBe("React.memo");
  });
});
