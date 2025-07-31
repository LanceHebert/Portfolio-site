import { Parallax } from "react-parallax";
import StarSynth from "../images/starssynth.jpeg";
import React from "react";
import ScrollAnimation from "./ScrollAnimation";

const SkillsSection = React.memo(() => (
  <Parallax className="image" bgImage={StarSynth} strength={800}>
    <div className="AboutTitle section-header" id="skills">
      <span className="img-txt">Technical Skills</span>
    </div>

    <div className="row1-container">
      <ScrollAnimation className="fade-in">
        <div className="box box-down cyan">
          <h2 className="cardTitle">Languages</h2>
          <p className="cardText">Ruby,Javascript</p>
          <img
            className="skillIcon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
            alt=""
          />{" "}
          <img
            className="skillIcon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg"
            alt=""
          />
        </div>
      </ScrollAnimation>
      <ScrollAnimation className="fade-in">
        <div className="box red">
          <h2 className="cardTitle">Frameworks</h2>
          <p className="cardText">Bootstrap,Rails,React,HTML5</p>
          <img
            className="skillIcon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
            alt=""
          />
          <img
            className="skillIcon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
            alt=""
          />
          <img
            className="skillIcon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/rails/rails-original-wordmark.svg"
            alt=""
          />
          <img
            className="skillIcon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg"
            alt=""
          />
        </div>
      </ScrollAnimation>
      <ScrollAnimation className="fade-in">
        <div className="box box-down blue">
          <h2 className="cardTitle">Database Management</h2>
          <p className="cardText">PostgreSQL,SQLite</p>
          <img
            className="skillIcon"
            src="https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg"
            alt=""
          />
          <img
            className="skillIcon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg"
            alt=""
          />
        </div>
      </ScrollAnimation>
    </div>
    <ScrollAnimation className="fade-in">
      <div className="row2-container">
        <div className="box orange">
          <h2 className="cardTitle">Testing & Workflow</h2>
          <p className="cardText">Git,Postman</p>
          <img
            className="skillIcon"
            src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
            alt=""
          />
          <img
            className="skillIcon"
            src="https://imgs.search.brave.com/P8tgN3JjEO3M5UgZG_t4k8XKgJ8MKecubq1JiMRTuAU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jZG4u/ZnJlZWJpZXN1cHBs/eS5jb20vbG9nb3Mv/bGFyZ2UvMngvZ2l0/LWljb24tbG9nby1w/bmctdHJhbnNwYXJl/bnQucG5n"
            alt=""
          />
        </div>
      </div>
    </ScrollAnimation>
    <footer>
      <p className="attribution">Design inspired by Jared Parsons.</p>
    </footer>

    {/* </div> */}
  </Parallax>
));

export default SkillsSection;
