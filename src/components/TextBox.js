import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLinkedin,
  faGithub,
  faYoutube,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

function TextBox() {
  const medium = <FontAwesomeIcon className="icon" icon={faMedium} />;
  const linkedin = <FontAwesomeIcon className="icon"icon={faLinkedin} />;
  const github = <FontAwesomeIcon className="icon"icon={faGithub} />;
  const youtube = <FontAwesomeIcon className="icon"icon={faYoutube} />;

  return (
    <div>
      <section className="container ">
        <div className="AboutBox row ">
          
          <div className="AboutImg column">
            <div className="row pfpRow">
            <img
              className="pfp layer"
              src="../images/synthy2.png"
              alt="Profile"
            />
            <img
              className="pfpbg3 layer"
              src="../images/synthy.png"
              alt="Profile"
            />
            <img
              className="layer pfpbg2"
              src="../images/bgpfp.png"
              alt="Profile"
            />
            <img
              className="layer pfpbg1"
              src="../images/blackbg.png"
              alt="Profile"
            />
            </div>
            <div className="row">
            <button className="GlowButton">Resume</button>
            </div>
          
          </div>
          <div className="AboutText  column">
            <h3 className="AboutTitle">About Me</h3>
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
              <br />
              <br />
              <br />
              <br />
              Interests include: <ul><li>Web3/cryptocurrencies/blockchain</li>  <li>Health
              hacking</li>
               <li>Augmented reality</li>.
              </ul>
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
                  <div className="row icon">
                  {linkedin}
                    {github}
                    {medium}
                    {youtube}
                    </div>
                </div>
              </div>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TextBox;
