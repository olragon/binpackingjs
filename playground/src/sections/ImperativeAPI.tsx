import React from "react";
import { DemoCard } from "../components/DemoCard";
import { CodeBlock } from "../components/CodeBlock";

const PACKER_2D = `import { Packer2D } from 'binpackingjs/2d';

const packer = new Packer2D([{ width: 100, height: 50 }]);
const result = packer.pack([
  { width: 50, height: 50 },
]);

// result.packedBins[0].boxes
// result.unpackedBoxes`;

const PACKER_3D = `import { Packer3D } from 'binpackingjs/3d';

const packer = new Packer3D();
packer.addBin({ name: 'Bin', width: 100, height: 100, depth: 100, maxWeight: 1000 });
packer.addItem({ name: 'Item', width: 50, height: 50, depth: 50, weight: 10 });
const result = packer.pack();

// result.packedBins[0].items
// result.unfitItems`;

export function ImperativeAPI() {
  return (
    <DemoCard
      kicker="API · Class form"
      title="Packer2D & Packer3D — imperative builder"
      description="Same algorithm, alternative API surface. Prefer the functional pack2D / pack3D when you have the full input upfront; reach for the class form when you're collecting bins or items incrementally."
      viz={
        <div className="imperative-row" style={{ padding: 16, width: "100%" }}>
          <div>
            <h3>2D</h3>
            <CodeBlock source={PACKER_2D} />
          </div>
          <div>
            <h3>3D</h3>
            <CodeBlock source={PACKER_3D} />
          </div>
        </div>
      }
    />
  );
}
