import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock the components to avoid complex rendering issues
jest.mock("./components/ResponsiveAppBar", () => {
  return function MockResponsiveAppBar() {
    return <div data-testid="responsive-app-bar">ResponsiveAppBar</div>;
  };
});

jest.mock("./components/ImageOne", () => {
  return function MockImageOne() {
    return <div data-testid="image-one">ImageOne</div>;
  };
});

jest.mock("./components/ImageTwo", () => {
  return function MockImageTwo() {
    return <div data-testid="image-two">ImageTwo</div>;
  };
});

jest.mock("./components/ImageThree", () => {
  return function MockImageThree() {
    return <div data-testid="image-three">ImageThree</div>;
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
    expect(screen.getByTestId("image-one")).toBeInTheDocument();
    expect(screen.getByTestId("text-box")).toBeInTheDocument();
    expect(screen.getByTestId("image-three")).toBeInTheDocument();
    expect(screen.getByTestId("image-two")).toBeInTheDocument();
    expect(screen.getByTestId("ai-chatbot")).toBeInTheDocument();
  });

  test("renders components in correct order", () => {
    render(<App />);

    const container = screen.getByTestId("responsive-app-bar").parentElement;
    const children = Array.from(container.children);

    // Check the order of components
    expect(children[0]).toHaveAttribute("data-testid", "responsive-app-bar");
    expect(children[1]).toHaveAttribute("data-testid", "image-one");
    expect(children[2]).toHaveAttribute("data-testid", "text-box");
    expect(children[3]).toHaveAttribute("data-testid", "image-three");
    expect(children[4]).toHaveAttribute("data-testid", "image-two");
    expect(children[5]).toHaveAttribute("data-testid", "ai-chatbot");
  });

  test("uses React.memo for performance optimization", () => {
    // Check if App component is memoized
    expect(App.displayName || App.name).toBe("React.memo");
  });
});
