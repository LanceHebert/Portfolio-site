import { Parallax } from "react-parallax";
import SynthBG from "../images/japansynth.jpeg";
import React from "react";

const HeroSection = React.memo(() => (
  <Parallax className="image" bgImage={SynthBG} strength={800}>
    <div className="content" id="home">
      <p>
        <span className="img-txt neonTextY">
          Software <br />
          Engineer
        </span>{" "}
        <br /> <span className="titleName neonTextG">Lance Hebert</span>
      </p>

      <div className="arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </Parallax>
));

export default HeroSection;
