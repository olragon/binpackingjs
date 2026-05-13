# binpackingjs

[![npm version](https://img.shields.io/npm/v/binpackingjs.svg?style=flat)](https://npmjs.org/package/binpackingjs "View this project on npm")
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

A fast, fully-typed **2D and 3D bin packing** library for JavaScript and TypeScript.

- **Immutable** — input objects are never mutated; results are returned as new objects
- **Tree-shakeable** — import only `binpackingjs/2d` or `binpackingjs/3d` to keep your bundle small
- **Zero runtime dependencies**
- **ESM + CJS** — works everywhere: Node.js, Bun, Deno, browsers (via bundler)

### Algorithm references

- 2D: [A Thousand Ways to Pack the Bin](https://github.com/juj/RectangleBinPack/blob/master/RectangleBinPack.pdf) (Jukka Jylänki) — maximal rectangles with pluggable heuristics
- 3D: [Optimizing Three-Dimensional Bin Packing Through Simulation](https://www.researchgate.net/publication/228974015_Optimizing_Three-Dimensional_Bin_Packing_Through_Simulation) (Erick Dube et al.) — pivot-based placement with rotation scoring

## Playground

Live interactive demos of every feature in this README — `pack2D` / `pack3D`, all four heuristics, rotation control, and a 3D viewer — at **[olragon.github.io/binpackingjs](https://olragon.github.io/binpackingjs/)**.

Run it locally:

```bash
bun install
bun run playground:dev   # http://localhost:3031
```

Or build a static bundle for hosting:

```bash
bun run playground:build # outputs to playground/dist
```

The playground is auto-deployed to GitHub Pages on every push to `main` via `.github/workflows/playground.yml`. To enable on a fresh fork: repo Settings → Pages → Source: **GitHub Actions**.

## Install

```bash
npm install binpackingjs
# or
bun add binpackingjs
# or
yarn add binpackingjs
```

## Quick Start

### 2D Bin Packing

```typescript
import { pack2D } from 'binpackingjs/2d';

const result = pack2D({
  bins: [
    { width: 100, height: 50 },
    { width: 50, height: 50 },
  ],
  boxes: [
    { width: 15, height: 10 },
    { width: 50, height: 45 },
    { width: 40, height: 40 },
    { width: 200, height: 200 }, // Too large to fit
  ],
});

console.log(result.packedBins[0].boxes);
// [
//   { width: 40, height: 40, x: 0, y: 0, rotated: false, sourceBox: ... },
//   { width: 15, height: 10, x: 0, y: 40, rotated: false, sourceBox: ... },
// ]

console.log(result.packedBins[1].boxes);
// [
//   { width: 50, height: 45, x: 0, y: 0, rotated: false, sourceBox: ... },
// ]

console.log(result.unpackedBoxes.length); // 1 (the 200x200 box)
```

### 3D Bin Packing

```typescript
import { pack3D } from 'binpackingjs/3d';

const result = pack3D({
  bins: [
    { name: 'Small Box', width: 296, height: 296, depth: 8, maxWeight: 1000 },
  ],
  items: [
    { name: 'Item 1', width: 250, height: 250, depth: 2, weight: 200 },
    { name: 'Item 2', width: 250, height: 250, depth: 2, weight: 200 },
    { name: 'Item 3', width: 250, height: 250, depth: 2, weight: 200 },
  ],
});

console.log(result.packedBins[0].items.length); // 3
console.log(result.unfitItems.length);          // 0
```

## API Reference

### `pack2D(options): Pack2DResult`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `bins` | `Bin2D[]` | required | Available bins `{ width, height }` |
| `boxes` | `Box2D[]` | required | Boxes to pack `{ width, height, constrainRotation? }` |
| `heuristic` | `Heuristic` | `BestShortSideFit` | Placement strategy |
| `limit` | `number` | all | Max boxes to pack |

**Returns** `{ packedBins: PackedBin2D[], unpackedBoxes: Box2D[] }`

Each `PackedBin2D` contains:
- `boxes` — packed boxes with `x`, `y`, `width`, `height`, `rotated`, and `sourceBox` (reference to input)
- `efficiency` — percentage of bin area used

### `pack3D(options): Pack3DResult`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `bins` | `Bin3D[]` | required | Available bins `{ name, width, height, depth, maxWeight }` |
| `items` | `Item3D[]` | required | Items to pack `{ name, width, height, depth, weight, allowedRotations? }` |

**Returns** `{ packedBins: PackedBin3D[], unfitItems: Item3D[] }`

Each `PackedItem3D` contains `position`, `rotationType`, `dimension`, and `sourceItem` (reference to input).

## Heuristics (2D)

```typescript
import { pack2D, BestAreaFit } from 'binpackingjs/2d';

const result = pack2D({
  bins: [{ width: 100, height: 50 }],
  boxes: [{ width: 50, height: 100 }],
  heuristic: new BestAreaFit(),
});
```

| Heuristic | Description |
|-----------|-------------|
| `BestShortSideFit` | **(default)** Minimizes leftover on the shorter side |
| `BestAreaFit` | Minimizes wasted area in the chosen free rectangle |
| `BestLongSideFit` | Minimizes leftover on the longer side |
| `BottomLeft` | Places items as low and left as possible |

## Rotation Control

### 2D — Constrain rotation

```typescript
pack2D({
  bins: [{ width: 100, height: 50 }],
  boxes: [
    { width: 50, height: 100, constrainRotation: true }, // Will NOT be rotated to fit
  ],
});
```

### 3D — Restrict allowed rotations

```typescript
import { pack3D, RotationType } from 'binpackingjs/3d';

pack3D({
  bins: [{ name: 'Bin', width: 100, height: 100, depth: 300, maxWeight: 1500 }],
  items: [{
    name: 'Fragile Item',
    width: 150, height: 50, depth: 50, weight: 20,
    allowedRotations: [RotationType.WHD, RotationType.DHW], // Only 2 of 6 rotations
  }],
});
```

All 6 rotation types: `WHD`, `HWD`, `HDW`, `DHW`, `DWH`, `WDH`.

## Class-based API

For a more imperative style:

```typescript
import { Packer2D } from 'binpackingjs/2d';
import { Packer3D } from 'binpackingjs/3d';

// 2D
const packer2d = new Packer2D([{ width: 100, height: 50 }]);
const result2d = packer2d.pack([{ width: 50, height: 50 }]);

// 3D
const packer3d = new Packer3D();
packer3d.addBin({ name: 'Bin', width: 100, height: 100, depth: 100, maxWeight: 1000 });
packer3d.addItem({ name: 'Item', width: 50, height: 50, depth: 50, weight: 10 });
const result3d = packer3d.pack();
```

## Migrating from v3

v4 is a full rewrite. Key changes:

| v3 | v4 |
|---|---|
| `new Box(w, h)` then check `box.packed`, `box.x`, `box.y` | Pass plain objects; read placement from result |
| `bin.boxes` mutated in place | `result.packedBins[i].boxes` on the return value |
| `require('binpackingjs').BP2D` | `import { pack2D } from 'binpackingjs/2d'` |
| `new Packer(bins).pack(boxes)` returns packed boxes | `pack2D({ bins, boxes })` returns full result |
| `packer.addBin()` / `packer.addItem()` / `packer.pack()` (void) | `packer.pack()` returns `Pack3DResult` |
| `packer.unfitItems` after pack | `result.unfitItems` on the return value |

## License

MIT
