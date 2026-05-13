import React, { useMemo, useState } from "react";
import {
  pack2D,
  BestShortSideFit,
  BestAreaFit,
  BestLongSideFit,
  BottomLeft,
} from "../../../src/2D";
import { DemoCard } from "../components/DemoCard";
import { Pack2DViewer } from "../components/Pack2DViewer";
import { seed_heuristics2D, type Bin2D, type Box2D } from "../util/seeds";

const README_INPUT: { bin: Bin2D; boxes: Box2D[] } = {
  bin: { width: 150, height: 100 },
  boxes: [
    { name: "1", width: 60, height: 30 },
    { name: "2", width: 40, height: 40 },
    { name: "3", width: 50, height: 25 },
    { name: "4", width: 25, height: 50 },
    { name: "5", width: 70, height: 20 },
    { name: "6", width: 35, height: 35 },
    { name: "7", width: 20, height: 45 },
    { name: "8", width: 45, height: 30 },
    { name: "9", width: 30, height: 30 },
    { name: "10", width: 55, height: 15 },
  ],
};

const HEURISTICS = [
  { name: "BestShortSideFit", make: () => new BestShortSideFit() },
  { name: "BestAreaFit", make: () => new BestAreaFit() },
  { name: "BestLongSideFit", make: () => new BestLongSideFit() },
  { name: "BottomLeft", make: () => new BottomLeft() },
];

export function Heuristics2D() {
  const [input, setInput] = useState(README_INPUT);

  const results = useMemo(() => {
    return HEURISTICS.map((h) => {
      const res = pack2D({
        bins: [input.bin],
        boxes: input.boxes,
        heuristic: h.make(),
      } as any);
      return { name: h.name, res };
    });
  }, [input]);

  const code = `import {
  pack2D,
  BestShortSideFit, BestAreaFit, BestLongSideFit, BottomLeft,
} from 'binpackingjs/2d';

// Same bin + boxes, four placement strategies
for (const heuristic of [
  new BestShortSideFit(),
  new BestAreaFit(),
  new BestLongSideFit(),
  new BottomLeft(),
]) {
  pack2D({ bins, boxes, heuristic });
}`;

  return (
    <DemoCard
      kicker="2D · Heuristics"
      title="Four placement strategies, same input"
      description="The heuristic decides which free rectangle a new box drops into. Different heuristics produce different packings — sometimes denser, sometimes less so. The default is BestShortSideFit."
      code={code}
      viz={
        <div className="heuristics-grid">
          {results.map((r) => {
            const eff = (r.res.packedBins[0] as any)?.efficiency ?? 0;
            return (
              <div className="cell" key={r.name}>
                <div className="cell-label">
                  <span className="name">{r.name}</span>
                  <span className="eff">{eff.toFixed(0)}% · {((r.res as any).unpackedBoxes).length} unfit</span>
                </div>
                <Pack2DViewer
                  packedBins={r.res.packedBins as any}
                  unfit={(r.res as any).unpackedBoxes}
                  maxBinPx={240}
                  showLabels={false}
                />
              </div>
            );
          })}
        </div>
      }
      onReshuffle={() => setInput(seed_heuristics2D())}
    />
  );
}
