import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollAnimation from "./ScrollAnimation";

import {
  faLinkedin,
  faGithub,
  faYoutube,
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
  const youtube = (
    <a
      className="AboutIcon"
      href="https://www.youtube.com/watch?v=MnXgZ8i7UcM&list=PL-GaE70oSjOmWxBPc2xSiYvPuwALj_hsI"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faYoutube} />
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
                  src="../images/synthy2.png"
                  alt="Profile layer"
                />
                <img
                  className="pfpbg3 layer"
                  src="../images/synthy.png"
                  alt="Profile layer 2"
                />
                <img
                  className="layer pfpbg2"
                  src="../images/bgpfp.png"
                  alt="Profile layer 3"
                />
                <img
                  className="layer pfpbg1"
                  src="../images/blackbg.png"
                  alt="Profile layer 4"
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
                Hey there, I'm a physical therapist turned software developer
                residing in Washington State.
              </ScrollAnimation>
              <br />
              <br />
              <ScrollAnimation className="fade-in-left">
                The "Pandemic Pivot" allowed me to reassess my career choice and
                start pursuing something I am passionate about. I am excited to
                integrate my leadership background in healthcare with the
                knowledge I have gained in Ruby on Rails and JavaScript React
                based programming.
              </ScrollAnimation>
            </p>

            <br />
            <br />
            <br />
            <br />
            <ScrollAnimation className="fade-in-left">
              <span className="interests-label">Interests include:</span>{" "}
              <li>Web3/cryptocurrencies/blockchain</li> <li>Health hacking</li>
              <li>Augmented reality</li>
            </ScrollAnimation>
            <br />
            <br />
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
                    {youtube}
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
