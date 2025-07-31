import ResponsiveAppBar from "./components/ResponsiveAppBar";
import React from "react";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import TextBox from "./components/TextBox";
import ProjectsSection from "./components/ProjectsSection";
import AIChatbot from "./components/AIChatbot";

const App = React.memo(() => {
  return (
    <div>
      <ResponsiveAppBar />
      <HeroSection />
      <TextBox />
      <SkillsSection />
      <ProjectsSection />
      <AIChatbot />
    </div>
  );
});

App.displayName = "React.memo";

export default App;
