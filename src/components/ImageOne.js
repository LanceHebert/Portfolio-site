import { Parallax } from "react-parallax";
import SynthBG from "../images/japansynth.jpeg";

const ImageOne = () => (
  <Parallax className="image" bgImage={SynthBG} strength={800}>
    <div className="content">
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
);

export default ImageOne;
