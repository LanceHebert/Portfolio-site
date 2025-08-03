import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollAnimation from "./ScrollAnimation";

import {
  faLinkedin,
  faGithub,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

const TextBox = React.memo(() => {
  const medium = (
    <a
      className="AboutIcon"
      href="https://medium.com/@LanceHebert"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faMedium} />
    </a>
  );
  const linkedin = (
    <a
      className="AboutIcon"
      href="https://www.linkedin.com/in/lance-hebert/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faLinkedin} />
    </a>
  );
  const github = (
    <a
      className="AboutIcon"
      href="https://github.com/LanceHebert"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faGithub} />
    </a>
  );

  return (
    <div>
      <section className="container " id="resume">
        <div className="AboutBox row ">
          <div className="AboutImg column">
            <div className="row pfpRow">
              <ScrollAnimation className="fade-in-left">
                <img
                  className="pfp layer"
                  src="../images/Lance-Hebert.png"
                  alt="Lance Hebert Profile"
                />
              </ScrollAnimation>
            </div>
            <div className="row">
              <ScrollAnimation className="fade-in-left">
                <a
                  href="https://drive.google.com/file/d/1smgOzGR_0CeN1sRE9huGfoDObgwz7vlm/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="GlowButton">Resume</button>
                </a>
              </ScrollAnimation>
            </div>
          </div>
          <div className="AboutText  column">
            <ScrollAnimation className="fade-in-left">
              <h3 className="AboutTitle">About Me</h3>
            </ScrollAnimation>

            <p className="AboutText">
              <ScrollAnimation className="fade-in-left">
                Hi, I'm Lance Hebert. The "Pandemic Pivot" took me from
                practicing physical therapy to 3+ years as a full-time software
                engineer on-staff at a fast-paced digital marketing agency. I
                build accessible, high-performance Rails & React apps—raising
                Lighthouse scores from the 40s into the 90s, shaving 40 points
                off PageSpeed Insights, and mentoring junior devs on WCAG 2.1 AA
                and headless-CMS best practices.
              </ScrollAnimation>
              <br />
              <br />
              <ScrollAnimation className="fade-in-left">
                My healthcare background sharpened my leadership, empathy, and
                attention to detail—skills I apply daily to write clean code and
                deliver meaningful user experiences. Off-hours you'll find me on
                the ice playing hockey, experimenting with AI/Web3/AR projects,
                or leveling up in PC games.
              </ScrollAnimation>
            </p>

            <div className="SocialsBox column">
              <hr />
              <div>
                <ScrollAnimation className="fade-in">
                  <div>
                    <h2 className="AboutTitle">Socials</h2>
                  </div>
                </ScrollAnimation>
                {/* <div row>
                    <button className="GlowButton">Resume</button>
                    
                    
                  </div> */}
                <ScrollAnimation className="fade-in">
                  <div className="row AboutIcon">
                    {linkedin}
                    {github}
                    {medium}
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default TextBox;
