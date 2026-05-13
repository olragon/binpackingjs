import React, { useMemo, useState } from "react";
import { pack3D } from "../../../src/3D";
import { DemoCard } from "../components/DemoCard";
import { Pack3DViewer, type Decoded3DItem } from "../components/Pack3DViewer";
import { seed_quickStart3D, type Item3D } from "../util/seeds";
import { colorForName } from "../util/colors";

const FACTOR = 100000;

const README_INPUT = {
  bin: { name: "Small Box", width: 296, height: 296, depth: 8, maxWeight: 1000 },
  items: [
    { name: "Item 1", width: 250, height: 250, depth: 2, weight: 200 },
    { name: "Item 2", width: 250, height: 250, depth: 2, weight: 200 },
    { name: "Item 3", width: 250, height: 250, depth: 2, weight: 200 },
  ],
};

function decode(packedBin: any): Decoded3DItem[] {
  return (packedBin?.items ?? []).map((p: any) => ({
    name: p.name,
    position: [p.position[0] / FACTOR, p.position[1] / FACTOR, p.position[2] / FACTOR],
    dimension: [p.dimension[0] / FACTOR, p.dimension[1] / FACTOR, p.dimension[2] / FACTOR],
    color: colorForName(p.name),
  }));
}

export function QuickStart3D() {
  const [input, setInput] = useState<{ bin: typeof README_INPUT.bin; items: Item3D[] }>(README_INPUT);
  const result = useMemo(() => pack3D({ bins: [input.bin], items: input.items }), [input]);
  const items = useMemo(() => decode(result.packedBins[0]), [result]);

  const code = `import { pack3D } from 'binpackingjs/3d';

const result = pack3D({
  bins: [{
    name: '${input.bin.name}',
    width: ${input.bin.width}, height: ${input.bin.height}, depth: ${input.bin.depth},
    maxWeight: ${input.bin.maxWeight},
  }],
  items: [
${input.items
  .map(
    (i) =>
      `    { name: '${i.name}', width: ${i.width}, height: ${i.height}, depth: ${i.depth}, weight: ${i.weight} }`
  )
  .join(",\n")},
  ],
});

result.packedBins[0].items.length; // ${result.packedBins[0]?.items.length ?? 0}
result.unfitItems.length;           // ${result.unfitItems.length}`;

  const totalWeight = input.items.reduce((s, i) => s + i.weight, 0);

  return (
    <DemoCard
      kicker="3D · Quick start"
      title="pack3D — cuboids into containers"
      description="Same shape as pack2D but with depth and weight. Items are rotated freely across all 6 orientations to find a fit. Weight is enforced per bin via maxWeight."
      code={code}
      viz={
        <div className="viz-3d" style={{ height: "100%", width: "100%", display: "flex" }}>
          <Pack3DViewer bin={input.bin} items={items} />
        </div>
      }
      stats={[
        { label: "packed", value: result.packedBins[0]?.items.length ?? 0, tone: "ok" },
        { label: "unfit", value: result.unfitItems.length, tone: result.unfitItems.length > 0 ? "warn" : undefined },
        { label: "total weight", value: `${totalWeight} / ${input.bin.maxWeight}` },
      ]}
      onReshuffle={() => setInput(seed_quickStart3D())}
    />
  );
}
