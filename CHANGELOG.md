# Changelog

## 4.0.0 (2026-05-13)

### Breaking Changes

- **TypeScript rewrite** — entire codebase rewritten in TypeScript with strict mode
- **Immutable design** — input objects (boxes, items, bins) are never mutated; packing returns new result objects
- **New functional API** — `pack2D()` and `pack3D()` replace the mutation-based class API
- **ESM-first** — published as ES modules with CommonJS fallback; sub-path exports (`binpackingjs/2d`, `binpackingjs/3d`) enable tree-shaking
- **Bun toolchain** — webpack, Babel, and mocha replaced with Bun for build, test, and install
- **Zero runtime dependencies** — all dev dependencies removed from production bundle

### New Features

- `pack2D(options)` — functional API returning `{ packedBins, unpackedBoxes }`
- `pack3D(options)` — functional API returning `{ packedBins, unfitItems }`
- Full TypeScript type definitions shipped with the package
- `PackedBox2D` includes `rotated` flag and `sourceBox` reference back to input
- `PackedItem3D` includes `position`, `dimension`, `rotationType`, and `sourceItem` reference
- `PackedBin2D` includes `efficiency` percentage
- Sub-path exports for smaller bundles: `import { pack2D } from 'binpackingjs/2d'`

### Bug Fixes (carried from v3.1.0)

- Fixed 2D `pruneFreeList()` skipping free rectangles due to misplaced loop increment (#42)
- Fixed 3D `scoreRotation()` choosing suboptimal rotations that waste depth space (#37)
- Fixed 3D `getBiggerBinThan()` using `this.bins` instead of `this.bins.length` in loop condition

### Migration

See the [migration guide in the README](README.md#migrating-from-v3).

---

## 3.1.0 (2026-05-13)

### Bug Fixes

- Fix 2D `pruneFreeList` bug: `i++` moved to outer loop so free rectangles are not skipped during pruning (#42, credit to @traaan PR #27)
- Fix 3D `scoreRotation` heuristic: use tiling efficiency instead of squared dimension ratios (#37)
- Fix broken 2D paper link in README (#29)

### Other

- Add bug reproduction tests for #42 and #37
- Upgrade all dependencies, fix security vulnerabilities
- Upgrade mocha 8 to 11

---

## 3.0.2

- Support constraining box rotation in 2D packing
- Update dependencies

## 3.0.1

- Fix scoring rotation order in 3D packing
- Floating point precision handling via `factoredInteger()`

## 3.0.0

- Initial public release
- 2D bin packing with 4 heuristic strategies
- 3D bin packing with 6 rotation types and weight constraints
- UMD build for browser and Node.js
