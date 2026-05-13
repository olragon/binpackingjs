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
      </footer>
    </div>
  );
}
