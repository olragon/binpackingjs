import React, { useMemo, useState } from "react";
import { pack2D } from "../../../src/2D";
import { DemoCard } from "../components/DemoCard";
import { Pack2DViewer } from "../components/Pack2DViewer";
import { seed_rotation2D, type Bin2D, type Box2D } from "../util/seeds";

const README_INPUT: { bin: Bin2D; portraitBox: Box2D } = {
  bin: { width: 100, height: 40 },
  portraitBox: { name: "A", width: 30, height: 80 },
};

export function Rotation2D() {
  const [input, setInput] = useState(README_INPUT);

  const free = useMemo(
    () => pack2D({ bins: [input.bin], boxes: [{ ...input.portraitBox, constrainRotation: false }] } as any),
    [input]
  );
  const locked = useMemo(
    () => pack2D({ bins: [input.bin], boxes: [{ ...input.portraitBox, constrainRotation: true }] } as any),
    [input]
  );

  const code = `// Same box (${input.portraitBox.width}×${input.portraitBox.height}) into a ${input.bin.width}×${input.bin.height} bin.
// Without the flag: pack2D rotates it to fit.
// With constrainRotation: true: locked orientation → unfit.

pack2D({
  bins: [{ width: ${input.bin.width}, height: ${input.bin.height} }],
  boxes: [{ width: ${input.portraitBox.width}, height: ${input.portraitBox.height}, constrainRotation: true }],
});`;

  return (
    <DemoCard
      kicker="2D · Rotation"
      title="constrainRotation locks a box's orientation"
      description="By default, pack2D will rotate boxes 90° if that helps them fit. Set constrainRotation: true on any box to require it stay in the given orientation — useful for items with a defined ‘up’."
      code={code}
      viz={
        <div className="compare-pair">
          <div className="cell">
            <div className="cell-label">
              <span className="name">without flag</span>
              auto-rotated to fit
            </div>
            <Pack2DViewer
              packedBins={free.packedBins as any}
              unfit={(free as any).unpackedBoxes}
              maxBinPx={260}
            />
          </div>
          <div className="cell">
            <div className="cell-label">
              <span className="name">constrainRotation: true</span>
              stays portrait → unfit
            </div>
            <Pack2DViewer
              packedBins={locked.packedBins as any}
              unfit={(locked as any).unpackedBoxes}
              maxBinPx={260}
            />
          </div>
        </div>
      }
      onReshuffle={() => setInput(seed_rotation2D())}
    />
  );
}
