import ResponsiveAppBar from "./components/ResponsiveAppBar";
import React from "react";
import ImageOne from "./components/ImageOne";
import ImageThree from "./components/ImageThree";
import TextBox from "./components/TextBox";
import ImageTwo from "./components/ImageTwo";
import AIChatbot from "./components/AIChatbot";

const App = React.memo(() => {
  return (
    <div>
      <ResponsiveAppBar />
      <ImageOne />
      <TextBox />
      <ImageThree />
      <ImageTwo />
      <AIChatbot />
    </div>
  );
});

export default App;
