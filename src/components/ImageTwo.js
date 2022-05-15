import { Parallax } from "react-parallax";
import SynthHD from "../images/synthHD.jpeg";

const ImageTwo = () => (
  <Parallax className="image" bgImage={SynthHD} strength={800}>
    <div
      style={{ textAlign: "center", paddingTop: "60px", paddingBottom: "60px" }}
    >
      <span className="img-txt AboutTitle">Projects</span>
      <div class="projectContainer">
        <div class="card">
          <div class="face face1">
            <div class="projectContent">
              <div class="icon">
                <img className="projectImg" src="../images/painPoint.png" />
              </div>
            </div>
          </div>
          <div class="face face2">
            <div class="projectContent">
              <h3>
                <span className="AboutTitle projectTitle"> Pain Point</span>
              </h3>
              <br />

              <a
                href="https://github.com/LanceHebert/pain_point"
                target="_blank"
                className="projectLinkText"
              >
                Code
              </a>

              <a
                className="projectLinkText"
                href="https://www.loom.com/share/f97df21b1b2043d1a31ca52334706479"
                target="_blank"
              >
                Demo
              </a>
              <div className="projectDescription">
                <p>
                  App allows user to pick a physical therapist exercise plan and
                  records/displays user data.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="face face1">
            <div class="projectContent">
              <div class="icon">
              <img className="projectImg" src="../images/duelist.png" />
              </div>
            </div>
          </div>
          <div class="face face2">
            <div class="projectContent">
            <h3>
                <span className="AboutTitle projectTitle"> Duelist</span>
              </h3>
              <br />

              <a
                href="https://github.com/LanceHebert/phase-4-project-react-rails-api"
                target="_blank"
                className="projectLinkText"
              >
                Code
              </a>

              <a
                className="projectLinkText"
                href="https://www.loom.com/share/c81c57ec61d54378a2e0977e3b1d8a62"
                target="_blank"
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
        <div class="card">
          <div class="face face1">
            <div class="projectContent">
              <div class="icon">
              <img className="projectImg" src="../images/poddr.png" />
              </div>
            </div>
          </div>
          <div class="face face2">
            <div class="projectContent">
            <h3>
                <span className="AboutTitle projectTitle"> Poddr</span>
              </h3>
              <br />

              <a
                href="https://github.com/LanceHebert/Podcast-Recommender-Project-2"
                target="_blank"
                className="projectLinkText"
              >
                Code
              </a>

              <a
                className="projectLinkText"
                href="https://www.loom.com/share/12a522060170467a842d5dc5d4b38881"
                target="_blank"
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
    </div>
  </Parallax>
);

export default ImageTwo;
