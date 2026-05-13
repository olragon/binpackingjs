import React from "react";

export function Hero() {
  return (
    <div className="hero">
      <span className="badge">binpackingjs · v4</span>
      <h1>2D & 3D bin packing, visualised.</h1>
      <p className="lede">
        A faithful, zero-dependency JavaScript library that packs rectangles into bins
        and cuboids into containers. Every feature from the README is demoed below
        with the exact code that produces it.
      </p>
      <div className="links">
        <a href="https://github.com/olragon/binpackingjs" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.npmjs.com/package/binpackingjs" target="_blank" rel="noreferrer">
          npm
        </a>
        <a href="https://github.com/juj/RectangleBinPack/blob/master/RectangleBinPack.pdf" target="_blank" rel="noreferrer">
          2D algorithm (Jylänki)
        </a>
        <a
          href="https://www.researchgate.net/publication/228974015_Optimizing_Three-Dimensional_Bin_Packing_Through_Simulation"
          target="_blank"
          rel="noreferrer"
        >
          3D algorithm (Dube)
        </a>
      </div>
    </div>
  );
}
