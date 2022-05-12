
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import React from "react";
import ImageOne from "./components/ImageOne";
import ImageThree from "./components/ImageThree";
import TextBox from "./components/TextBox";
import ImageTwo from "./components/ImageTwo"

function App() { 

  return (
    <>
   
      <ResponsiveAppBar /> 
      <ImageOne />
      <TextBox />
      <ImageThree />
      {/* <TextBox /> */}
      <ImageTwo />
    </>
  );
}

export default App;
