import { Parallax } from "react-parallax";
import SynthHD from "../images/synthHD.jpeg";

const ImageTwo = () => (
  <Parallax className="image" bgImage={SynthHD} strength={800}>
    <div style={{ textAlign: "center",paddingTop:"60px",paddingBottom:"60px" }} >
      <span className="img-txt AboutTitle"  >Projects</span>
      <div class="projectContainer">
        <div class="card">
          <div class="face face1">
            <div class="projectContent">
              <div class="icon">
                  
                <img className="projectImg" src="../images/painPoint.png" />
                {/* <i class="fa fa-linkedin-square" aria-hidden="true"></i> */}
              </div>
            </div>
          </div>
          <div class="face face2">
            <div class="projectContent">
              <h3>
                 <span className="AboutTitle"> Pain Point</span>
                  <br />
                <a
                  href="https://www.linkedin.com/in/adamdipinto/"
                  target="_blank"
                >
                  Code
                </a>
                <a
                  href="https://www.linkedin.com/in/adamdipinto/"
                  target="_blank"
                >
                  Demo
                </a>
              </h3>
              <p>
              App allows user to pick a physical therapist exercise plan and records/displays user data. 

              </p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="face face1">
            <div class="projectContent">
              <div class="icon">
                <i class="fa fa-twitter-square" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="face face2">
            <div class="projectContent">
              <h3>
                <a href="https://twitter.com/AdamDipinto" target="_blank">
                  @AdamDipinto
                </a>
              </h3>
              <p>
                This is where I read news and network with different social
                groups.
              </p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="face face1">
            <div class="projectContent">
              <div class="icon">
                <i class="fa fa-github-square" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="face face2">
            <div class="projectContent">
              <h3>
                <a href="https://github.com/atom888" target="_blank">
                  atom888
                </a>
              </h3>
              <p>This is where I share code and work on projects.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Parallax>
);

export default ImageTwo;
