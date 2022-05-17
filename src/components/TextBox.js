import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLinkedin,
  faGithub,
  faYoutube,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

function TextBox() {
  const medium = <a className="AboutIcon" href="https://medium.com/@LanceHebert" target="_blank"  rel="noreferrer"><FontAwesomeIcon  icon={faMedium} /></a>;
  const linkedin = <a className="AboutIcon" href="https://www.linkedin.com/in/lance-hebert/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>;
  const github = <a className="AboutIcon" href="https://github.com/LanceHebert"  target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>;
  const youtube = <a className="AboutIcon" href="https://www.youtube.com/watch?v=MnXgZ8i7UcM&list=PL-GaE70oSjOmWxBPc2xSiYvPuwALj_hsI" target="_blank" rel="noreferrer" ><FontAwesomeIcon icon={faYoutube} /></a>;

  return (
    <div>
      <section className="container " id="resume">
        <div className="AboutBox row ">
          
          <div className="AboutImg column">
            <div className="row pfpRow">
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
            </div>
            <div className="row">
           <a href="https://docs.google.com/document/d/1CuCUW7MhomgDNbrxFZcMUOEtBHZHlRpbsMG85HeEM9M/edit?usp=sharing" target="_blank" rel="noreferrer"><button  className="GlowButton">Resume</button></a>
            </div>
          
          </div>
          <div className="AboutText  column">
          <a name="resume">
            <h3 className="AboutTitle">About Me</h3>
            </a>
            <p className="AboutText">
              Hey there, I'm a physical therapist turned software developer
              residing in Washington State.
              <br />
              <br />
              The "Pandemic Pivot" allowed me to reassess my career choice and
              start pursuing something I am passionate about. I am excited to
              integrate my leadership background in healthcare with the
              knowledge I have gained in Ruby on Rails and JavaScript React
              based programming.
              </p>
              <br />
              <br />
              <br />
              <br />
              Interests include: <li>Web3/cryptocurrencies/blockchain</li>  <li>Health
              hacking</li>
               <li>Augmented reality</li>
              
              <br />
              <br />
              <div className="SocialsBox column">
                <hr />
                <div>
                  <div>
                    <h2 className="AboutTitle">Socials</h2>
                  </div>
                  {/* <div row>
                    <button className="GlowButton">Resume</button>
                    
                    
                  </div> */}
                  <div className="row AboutIcon">
                  {linkedin}
                  {github}
                  {medium}
                  {youtube}
                    </div>
                </div>
              </div>
           
          </div>
        </div>
      </section>
    </div>
  );
}

export default TextBox;
