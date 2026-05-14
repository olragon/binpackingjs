import React, { useMemo, useState } from "react";
import { pack3D, RotationType } from "../../../src/3d";
import { DemoCard } from "../components/DemoCard";
import { Pack3DViewer, type Decoded3DItem } from "../components/Pack3DViewer";
import { seed_rotation3D, type Item3D } from "../util/seeds";
import { colorForName } from "../util/colors";


const README_INPUT = {
  bin: { name: "Tall Bin", width: 60, height: 60, depth: 200, maxWeight: 1500 },
  longItem: { name: "Stick", width: 150, height: 50, depth: 50, weight: 20 } as Item3D,
};

function decode(packedBin: any): Decoded3DItem[] {
  return (packedBin?.items ?? []).map((p: any) => ({
    name: p.name,
    position: [p.position[0], p.position[1], p.position[2]],
    dimension: [p.dimension[0], p.dimension[1], p.dimension[2]],
    color: colorForName(p.name),
  }));
}

export function Rotation3D() {
  const [input, setInput] = useState(README_INPUT);

  const unrestricted = useMemo(
    () => pack3D({ bins: [input.bin], items: [input.longItem] }),
    [input]
  );
  const locked = useMemo(
    () =>
      pack3D({
        bins: [input.bin],
        items: [{ ...input.longItem, allowedRotations: [RotationType.WHD] }],
      } as any),
    [input]
  );

  const code = `import { pack3D, RotationType } from 'binpackingjs/3d';

// Item ${input.longItem.width}×${input.longItem.height}×${input.longItem.depth} in a ${input.bin.width}×${input.bin.height}×${input.bin.depth} bin.
// allowedRotations restricts the set of orientations pack3D may try.
pack3D({
  bins,
  items: [{
    ...item,
    allowedRotations: [RotationType.WHD],  // no rotation
  }],
});`;

  const lockedItems = decode(locked.packedBins[0]);
  const freeItems = decode(unrestricted.packedBins[0]);

  return (
    <DemoCard
      kicker="3D · Rotation"
      title="allowedRotations restricts orientations"
      description="By default pack3D tries all 6 rotations of an item (WHD, HWD, HDW, DHW, DWH, WDH) and scores them by tile efficiency. Pass allowedRotations on an item to whitelist a subset — useful for ‘this side up’ items or fragile goods."
      code={code}
      viz={
        <div className="compare-pair">
          <div className="cell">
            <div className="cell-label">
              <span className="name">all 6 rotations</span>
              packs rotated
            </div>
            <div className="viz-3d" style={{ height: 280, width: "100%" }}>
              <Pack3DViewer bin={input.bin} items={freeItems} />
            </div>
          </div>
          <div className="cell">
            <div className="cell-label">
              <span className="name">allowedRotations: [WHD]</span>
              locked → {locked.unfitItems.length > 0 ? "unfit" : "fits"}
            </div>
            <div className="viz-3d" style={{ height: 280, width: "100%" }}>
              <Pack3DViewer bin={input.bin} items={lockedItems} />
            </div>
          </div>
        </div>
      }
      stats={[
        {
          label: "free",
          value: unrestricted.packedBins[0]?.items.length === 1 ? "packed" : "unfit",
          tone: unrestricted.packedBins[0]?.items.length === 1 ? "ok" : "warn",
        },
        {
          label: "locked",
          value: locked.packedBins[0]?.items.length === 1 ? "packed" : "unfit",
          tone: locked.packedBins[0]?.items.length === 1 ? "ok" : "warn",
        },
      ]}
      onReshuffle={() =>
        setInput(() => {
          const s = seed_rotation3D();
          return { bin: s.bin, longItem: s.longItem };
        })
      }
    />
  );
}
