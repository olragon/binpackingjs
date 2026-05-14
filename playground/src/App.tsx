import React from "react";
import { Hero } from "./sections/Hero";
import { QuickStart2D } from "./sections/QuickStart2D";
import { Heuristics2D } from "./sections/Heuristics2D";
import { Rotation2D } from "./sections/Rotation2D";
import { QuickStart3D } from "./sections/QuickStart3D";
import { Rotation3D } from "./sections/Rotation3D";
import { ImperativeAPI } from "./sections/ImperativeAPI";

export function App() {
  return (
    <div className="page">
      <Hero />
      <QuickStart2D />
      <Heuristics2D />
      <Rotation2D />
      <QuickStart3D />
      <Rotation3D />
      <ImperativeAPI />
      <footer>
        Built with binpackingjs + React + three.js · runs entirely in the browser
        <br />
        Library by{" "}
        <a href="https://github.com/olragon" target="_blank" rel="noreferrer">@olragon</a>
        {" · "}Playground by{" "}
        <a href="https://github.com/seanparkross" target="_blank" rel="noreferrer">@seanparkross</a>
      </footer>
    </div>
  );
}
