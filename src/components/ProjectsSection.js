import { Parallax } from "react-parallax";
import SynthHD from "../images/synthHD.jpeg";
import React, { useState, useEffect } from "react";
import ScrollAnimation from "./ScrollAnimation";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const ProjectsSection = React.memo(() => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const projects = [
    {
      name: "Giga-Speed YouTube Ad Skipper",
      image: "../images/giga-speed-extension.png",
      description:
        "Chrome extension that automatically speeds up YouTube ads to 15x and provides intuitive manual speed controls with Alt key cycling.",
      codeLink: "https://github.com/LanceHebert/Giga-Speed-ad-Skipper",
      demoLink:
        "https://chromewebstore.google.com/detail/giga-speed-youtube-ad-ski/npdmbgbdlkhkpjoohocoeeiokdajlmjj?hl=en",
    },
    {
      name: "Pain Point",
      image: "../images/painPoint.png",
      description:
        "App allows user to pick physical therapist exercise plan and stores results.",
      codeLink: "https://github.com/LanceHebert/pain_point",
      demoLink: "https://www.loom.com/share/f97df21b1b2043d1a31ca52334706479",
    },
    {
      name: "Duelist",
      image: "../images/duelist.png",
      description:
        "App allows User to create/save character with stats and randomized equipment",
      codeLink:
        "https://github.com/LanceHebert/phase-4-project-react-rails-api",
      demoLink: "https://www.loom.com/share/c81c57ec61d54378a2e0977e3b1d8a62",
    },
    {
      name: "Poddr",
      image: "../images/poddr.png",
      description:
        "App allows user to search through Spotify API and like displayed podcast episodes",
      codeLink: "https://github.com/LanceHebert/Podcast-Recommender-Project-2",
      demoLink: "https://www.loom.com/share/12a522060170467a842d5dc5d4b38881",
    },
  ];

  // Auto-rotate carousel every 8 seconds (slower), but pause when user is interacting
  useEffect(() => {
    if (isUserInteracting) return; // Don't auto-rotate when user is interacting

    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 8000); // Increased from 5000ms to 8000ms

    return () => clearInterval(interval);
  }, [projects.length, isUserInteracting]);

  const nextProject = () => {
    setIsUserInteracting(true);
    setCurrentProject((prev) => (prev + 1) % projects.length);

    // Resume auto-rotation after 3 seconds of no interaction
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  const prevProject = () => {
    setIsUserInteracting(true);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);

    // Resume auto-rotation after 3 seconds of no interaction
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  const currentProjectData = projects[currentProject];

  // Calculate positions for jukebox effect - all stack from right to left, centered
  const getProjectPosition = (index) => {
    const totalProjects = projects.length;
    const relativePosition =
      (index - currentProject + totalProjects) % totalProjects;

    // Position projects in a layered stack from right to left, centered
    if (relativePosition === 0) {
      return {
        zIndex: 10,
        transform: "translateX(0px) scale(1)",
        opacity: 1,
      }; // Current (centered)
    } else if (relativePosition === 1) {
      return {
        zIndex: 9,
        transform: "translateX(60px) scale(0.9)",
        opacity: 0.8,
      }; // Next (right)
    } else if (relativePosition === 2) {
      return {
        zIndex: 8,
        transform: "translateX(120px) scale(0.8)",
        opacity: 0.6,
      }; // Next+1 (further right)
    } else if (relativePosition === 3) {
      return {
        zIndex: 7,
        transform: "translateX(180px) scale(0.7)",
        opacity: 0.4,
      }; // Next+2 (furthest right)
    } else if (relativePosition === totalProjects - 1) {
      return {
        zIndex: 9,
        transform: "translateX(-60px) scale(0.9)",
        opacity: 0.8,
      }; // Previous (left)
    } else {
      return {
        zIndex: 6,
        transform: "translateX(240px) scale(0.6)",
        opacity: 0.2,
      }; // Hidden (far right)
    }
  };

  return (
    <Parallax className="image" bgImage={SynthHD} strength={800}>
      <div className="section-header">
        <span className="img-txt AboutTitle" id="projects">
          Projects
        </span>
        <ScrollAnimation className="bounce-in-left">
          <div className="jukebox-carousel-container">
            {/* Navigation Arrows */}
            <IconButton
              onClick={prevProject}
              className="jukebox-nav-button jukebox-nav-left"
              sx={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                backgroundColor: "rgba(0, 255, 255, 0.1)",
                border: "2px solid #00ffff",
                color: "#00ffff",
                "&:hover": {
                  backgroundColor: "rgba(0, 255, 255, 0.2)",
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronLeft />
            </IconButton>

            <IconButton
              onClick={nextProject}
              className="jukebox-nav-button jukebox-nav-right"
              sx={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                backgroundColor: "rgba(0, 255, 255, 0.1)",
                border: "2px solid #00ffff",
                color: "#00ffff",
                "&:hover": {
                  backgroundColor: "rgba(0, 255, 255, 0.2)",
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronRight />
            </IconButton>

            {/* Jukebox Image Stack */}
            <div className="jukebox-image-stack">
              {projects.map((project, index) => {
                const position = getProjectPosition(index);
                return (
                  <div
                    key={index}
                    className="jukebox-image-container"
                    style={{
                      zIndex: position.zIndex,
                      transform: position.transform,
                      opacity: position.opacity,
                    }}
                  >
                    <img
                      className="jukebox-project-image"
                      src={project.image}
                      alt={`project ${project.name}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Project Information */}
            <div className="jukebox-info-container">
              <h3 className="jukebox-project-title">
                <span className="AboutTitle">{currentProjectData.name}</span>
              </h3>

              <div className="jukebox-project-links">
                <a
                  href={currentProjectData.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jukebox-link-button"
                >
                  Code
                </a>
                <a
                  href={currentProjectData.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jukebox-link-button"
                >
                  {currentProjectData.name.includes("Giga-Speed")
                    ? "Link"
                    : "Demo"}
                </a>
              </div>

              <div className="jukebox-project-description">
                <p>{currentProjectData.description}</p>
              </div>
            </div>

            {/* Jukebox Indicators */}
            <div className="jukebox-indicators">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`jukebox-indicator ${
                    index === currentProject ? "active" : ""
                  }`}
                  onClick={() => {
                    setIsUserInteracting(true);
                    setCurrentProject(index);

                    // Resume auto-rotation after 3 seconds of no interaction
                    setTimeout(() => setIsUserInteracting(false), 3000);
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </Parallax>
  );
});

export default ProjectsSection;
