import React, { useMemo, useState } from "react";
import { pack2D } from "../../../src/2D";
import { DemoCard } from "../components/DemoCard";
import { Pack2DViewer } from "../components/Pack2DViewer";
import { seed_quickStart2D, type Bin2D, type Box2D } from "../util/seeds";

const README_INPUT: { bins: Bin2D[]; boxes: Box2D[] } = {
  bins: [
    { width: 100, height: 50 },
    { width: 50, height: 50 },
  ],
  boxes: [
    { name: "A", width: 15, height: 10 },
    { name: "B", width: 50, height: 45 },
    { name: "C", width: 40, height: 40 },
    { name: "D", width: 200, height: 200 },
  ],
};

function formatCode(input: { bins: Bin2D[]; boxes: Box2D[] }): string {
  const bins = input.bins.map((b) => `    { width: ${b.width}, height: ${b.height} }`).join(",\n");
  const boxes = input.boxes
    .map((b) => `    { width: ${b.width}, height: ${b.height} }${b.width > 150 ? " // too large to fit" : ""}`)
    .join(",\n");
  return `import { pack2D } from 'binpackingjs/2d';

const result = pack2D({
  bins: [
${bins},
  ],
  boxes: [
${boxes},
  ],
});`;
}

export function QuickStart2D() {
  const [input, setInput] = useState(README_INPUT);
  const result = useMemo(() => pack2D(input as any), [input]);
  const code = useMemo(() => formatCode(input), [input]);

  const efficiencies = result.packedBins.map((b: any) => b.efficiency);
  const packedCount = result.packedBins.reduce((s: number, b: any) => s + b.boxes.length, 0);
  const unfitCount = (result as any).unpackedBoxes.length;

  return (
    <DemoCard
      kicker="2D · Quick start"
      title="pack2D — rectangles into bins"
      description="Pass an array of bins and an array of boxes. pack2D returns the placements and any boxes that didn't fit. Bigger boxes are tried first; smaller bins are tried first."
      code={code}
      viz={
        <Pack2DViewer
          packedBins={result.packedBins as any}
          unfit={(result as any).unpackedBoxes}
        />
      }
      stats={[
        { label: "packed", value: packedCount, tone: "ok" },
        { label: "unfit", value: unfitCount, tone: unfitCount > 0 ? "warn" : undefined },
        ...efficiencies.map((e: number, i: number) => ({
          label: `bin ${i + 1} eff`,
          value: `${e.toFixed(0)}%`,
        })),
      ]}
      onReshuffle={() => setInput(seed_quickStart2D())}
    />
  );
}
