import React from "react";
import Game from "./components/Game";
import { About } from "./components/About";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <About />
      <Game />
    </div>
  );
};
export default App;
