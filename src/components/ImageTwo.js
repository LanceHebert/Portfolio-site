import { Parallax } from "react-parallax";
import SynthHD from "../images/synthHD.jpeg";
import Bounce from 'react-reveal/Bounce';
import React from 'react';



const ImageTwo = () => (
  <Parallax className="image" bgImage={SynthHD} strength={800}>
    <div
      style={{ textAlign: "center", paddingTop: "60px", paddingBottom: "60px" }}
    >
      <span className="img-txt AboutTitle" id="projects">Projects</span>
      <Bounce left cascade>
      <div className="projectContainer shrink ">
        <div className="card ">
          <div className="face face1">
            <div className="projectContent">
              <div className="icon">
                <img className="projectImg" src="../images/painPoint.png" alt="project painPoint"/>
              </div>
            </div>
          </div>
          <div className="face face2">
            <div className="projectContent">
              <h3>
                <span className="AboutTitle projectTitle"> Pain Point</span>
              </h3>
              

              <a
                href="https://github.com/LanceHebert/pain_point"
                target="_blank" rel="noopener noreferrer"
                className="projectLinkText"
              >
                Code
              </a>

              <a
                className="projectLinkText"
                href="https://www.loom.com/share/f97df21b1b2043d1a31ca52334706479"
                target="_blank" rel="noopener noreferrer"
              >
                Demo
              </a>
              <div className="projectDescription">
                <p>
                  App allows user to pick physical therapist exercise plan and stores results.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="face face1">
            <div className="projectContent">
              <div className="icon">
              <img className="projectImg" src="../images/duelist.png" alt="project duelist" />
              </div>
            </div>
          </div>
          <div className="face face2">
            <div className="projectContent">
            <h3>
                <span className="AboutTitle projectTitle"> Duelist</span>
              </h3>
              

              <a
                href="https://github.com/LanceHebert/phase-4-project-react-rails-api"
                target="_blank" rel="noopener noreferrer"
                className="projectLinkText"
              >
                Code
              </a>

              <a
                className="projectLinkText"
                href="https://www.loom.com/share/c81c57ec61d54378a2e0977e3b1d8a62"
                target="_blank" rel="noopener noreferrer"
              >
                Demo
              </a>
              <div className="projectDescription">
                <p>
                App allows User to create/save character with stats and randomized equipment
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="face face1">
            <div className="projectContent">
              <div className="icon">
              <img className="projectImg" src="../images/poddr.png" alt="project poddr"/>
              </div>
            </div>
          </div>
          <div className="face face2">
            <div className="projectContent">
            <h3>
                <span className="AboutTitle projectTitle"> Poddr</span>
              </h3>
              

              <a
                href="https://github.com/LanceHebert/Podcast-Recommender-Project-2"
                target="_blank" rel="noopener noreferrer"
                className="projectLinkText"
              >
                Code
              </a>

              <a
                className="projectLinkText"
                href="https://www.loom.com/share/12a522060170467a842d5dc5d4b38881"
                target="_blank" rel="noopener noreferrer"
              >
                Demo
              </a>
              <div className="projectDescription">
                <p>
                App allows user to search through Spotify API and like displayed podcast episodes 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Bounce>
    </div>
    
  </Parallax>
);

export default ImageTwo;
