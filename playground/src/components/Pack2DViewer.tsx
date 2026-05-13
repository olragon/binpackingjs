import React from "react";
import { colorForName } from "../util/colors";

type PackedBox = {
  name?: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotated: boolean;
  sourceBox: { name?: string };
};

type PackedBin = {
  width: number;
  height: number;
  efficiency: number;
  boxes: PackedBox[];
};

type UnfitBox = { name?: string; width: number; height: number };

type Props = {
  packedBins: PackedBin[];
  unfit: UnfitBox[];
  maxBinPx?: number;
  showLabels?: boolean;
};

function boxLabel(name: string | undefined, w: number, h: number, scale: number): string | null {
  // Don't label tiny boxes — text would overflow.
  if (w * scale < 26 || h * scale < 14) return null;
  if (name && (w * scale > 50 || h * scale > 22)) return `${name} · ${w}×${h}`;
  return name ?? `${w}×${h}`;
}

export function Pack2DViewer({ packedBins, unfit, maxBinPx = 360, showLabels = true }: Props) {
  // Uniform scale across bins so relative sizes are honest.
  const maxDim = Math.max(
    ...packedBins.map((b) => Math.max(b.width, b.height)),
    ...unfit.map((u) => Math.max(u.width, u.height)),
    1
  );
  const scale = maxBinPx / maxDim;

  return (
    <div className="viz-2d">
      {packedBins.map((bin, bi) => {
        const w = bin.width * scale;
        const h = bin.height * scale;
        return (
          <div className="pane" key={bi}>
            <div className="pane-label">
              bin {bi + 1} · {bin.width}×{bin.height} · {bin.efficiency.toFixed(0)}%
            </div>
            <svg width={w} height={h} viewBox={`0 0 ${bin.width} ${bin.height}`}>
              <defs>
                <pattern id={`grid-${bi}`} width={10} height={10} patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2a2e3a" strokeWidth={0.3} />
                </pattern>
              </defs>
              <rect x={0} y={0} width={bin.width} height={bin.height} fill={`url(#grid-${bi})`} />
              {bin.boxes.map((b, i) => {
                const label = showLabels ? boxLabel(b.sourceBox.name ?? b.name, b.width, b.height, scale) : null;
                const key = b.sourceBox.name ?? `${bi}-${i}-${b.x}-${b.y}`;
                // viewBox is in bin units; convert desired screen px to viewBox units.
                const fontPx = 10;
                const fontVb = fontPx / scale;
                return (
                  <g key={key}>
                    <rect
                      className="box"
                      x={b.x}
                      y={b.y}
                      width={b.width}
                      height={b.height}
                      fill={colorForName(b.sourceBox.name ?? `idx${i}`)}
                      fillOpacity={0.85}
                      strokeWidth={1 / scale}
                    />
                    {label && (
                      <text
                        className="box-label"
                        x={b.x + b.width / 2}
                        y={b.y + b.height / 2 + fontVb * 0.35}
                        fontSize={fontVb}
                      >
                        {label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        );
      })}
      {unfit.length > 0 && (
        <div className="pane unfit-pane">
          <div className="pane-label" style={{ color: "#ffb86b" }}>
            unfit ({unfit.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {unfit.map((u, i) => {
              // Render each unfit box at a clamped display size so giant oversize
              // boxes (like the README's 200×200) don't blow out the sidecar.
              const TILE = 60;
              const aspect = u.width / u.height;
              const w = aspect >= 1 ? TILE : TILE * aspect;
              const h = aspect >= 1 ? TILE / aspect : TILE;
              const showDims = u.name !== `${u.width}×${u.height}`;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width={TILE} height={TILE} viewBox={`0 0 ${TILE} ${TILE}`}>
                    <rect
                      className="unfit-box"
                      x={(TILE - w) / 2}
                      y={(TILE - h) / 2}
                      width={w}
                      height={h}
                    />
                  </svg>
                  <span style={{ fontSize: 11, color: "#9da4b2", fontFamily: "ui-monospace, monospace" }}>
                    {u.name ?? "box"}
                    {showDims ? ` · ${u.width}×${u.height}` : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
