import { describe, test, expect } from 'bun:test';
import { Score } from '../src/2D/score';
import { pack3D } from '../src/3D/packer';
import { pack2D } from '../src/2D/packer';
import { factoredInteger, toOriginal } from '../src/3D/util';

// ---------------------------------------------------------------------------
// H4: Score.subtract adds instead of subtracting
// ---------------------------------------------------------------------------
describe('H4: Score.subtract should subtract, not add', () => {
  test('subtract(5) should decrease both scores by 5', () => {
    const score = new Score(10, 20);
    const result = score.subtract(5);
    expect(result.score1).toBe(5);  // 10 - 5 = 5
    expect(result.score2).toBe(15); // 20 - 5 = 15
  });

  test('subtract(0) should return identical scores', () => {
    const score = new Score(7, 13);
    const result = score.subtract(0);
    expect(result.score1).toBe(7);
    expect(result.score2).toBe(13);
  });
});

// ---------------------------------------------------------------------------
// H2: maxWeight === 0 treated as "unlimited weight"
// ---------------------------------------------------------------------------
describe('H2: maxWeight=0 should reject all items', () => {
  test('bin with maxWeight=0 should not accept any item', () => {
    const result = pack3D({
      bins: [{ name: 'zero-weight-bin', width: 100, height: 100, depth: 100, maxWeight: 0 }],
      items: [{ name: 'item', width: 1, height: 1, depth: 1, weight: 1 }],
    });
    // With maxWeight=0, the bin should accept nothing
    expect(result.unfitItems.length).toBe(1);
    expect(result.unfitItems[0]!.name).toBe('item');
  });
});

// ---------------------------------------------------------------------------
// H1: Infinite recursion in packToBin via getBiggerBinThan
// ---------------------------------------------------------------------------
describe('H1: packToBin should not infinitely recurse with same-volume bins', () => {
  test('two bins of equal volume where first fails weight check should not crash', () => {
    // Two bins with same volume but different maxWeight
    // First bin can't hold the item's weight, getBiggerBinThan returns second (same vol)
    // Without a guard, this causes infinite recursion
    const result = pack3D({
      bins: [
        { name: 'bin-a', width: 10, height: 10, depth: 10, maxWeight: 0.001 },
        { name: 'bin-b', width: 10, height: 10, depth: 10, maxWeight: 0.001 },
      ],
      items: [{ name: 'heavy-item', width: 5, height: 5, depth: 5, weight: 100 }],
    });
    // Should complete without stack overflow
    expect(result.unfitItems.length).toBe(1);
  });

  test('chain of same-volume bins should terminate', () => {
    const bins = Array.from({ length: 5 }, (_, i) => ({
      name: `bin-${i}`,
      width: 10,
      height: 10,
      depth: 10,
      maxWeight: 0.001,
    }));
    const fn = () =>
      pack3D({
        bins,
        items: [{ name: 'heavy', width: 5, height: 5, depth: 5, weight: 999 }],
      });
    expect(fn).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// M1: factoredInteger internal overflow (documented risk)
// ---------------------------------------------------------------------------
describe('M1: factoredInteger volume overflow', () => {
  test('factoredInteger(30) cubed overflows internally', () => {
    // Documents that internal factored calculations can overflow
    const side = factoredInteger(30);
    expect(side).toBe(3_000_000);
    const volume = side * side * side;
    expect(volume).toBeGreaterThan(Number.MAX_SAFE_INTEGER);
  });

  test('PackedBin3D.volume uses original units and does not overflow', () => {
    const result = pack3D({
      bins: [{ name: 'bin', width: 30, height: 30, depth: 30, maxWeight: 1000 }],
      items: [{ name: 'item', width: 10, height: 10, depth: 10, weight: 1 }],
    });
    const bin = result.packedBins.find((b) => b.items.length > 0);
    expect(bin).toBeDefined();
    expect(bin!.volume).toBe(27000); // 30*30*30 in original units
    expect(bin!.volume).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
  });
});

// ---------------------------------------------------------------------------
// M2/M3: Packed 3D results use factored units, not original
// ---------------------------------------------------------------------------
describe('M2: packed 3D items should report positions in original units', () => {
  test('packed item position should be in same unit system as input', () => {
    const result = pack3D({
      bins: [{ name: 'bin', width: 100, height: 100, depth: 100, maxWeight: 1000 }],
      items: [{ name: 'item', width: 50, height: 50, depth: 50, weight: 10 }],
    });

    const packedBin = result.packedBins.find((b) => b.items.length > 0);
    expect(packedBin).toBeDefined();
    const item = packedBin!.items[0]!;

    // Position should be in original units (0, not 0*100000)
    expect(item.position[0]).toBe(0);
    // Dimension should be in original units (50, not 50*100000)
    expect(item.dimension[0]).toBeLessThanOrEqual(100);

    // Width/height/depth of the bin should match the input
    expect(packedBin!.width).toBe(100);
    // Volume should be in original cubic units
    expect(packedBin!.volume).toBeLessThanOrEqual(100 * 100 * 100);
  });
});

// ---------------------------------------------------------------------------
// M11: toOriginal round-trip
// ---------------------------------------------------------------------------
describe('M11: toOriginal should invert factoredInteger', () => {
  test('round-trip for integer values', () => {
    expect(toOriginal(factoredInteger(42))).toBe(42);
  });

  test('round-trip for decimal values', () => {
    expect(toOriginal(factoredInteger(3.14159))).toBeCloseTo(3.14159, 4);
  });

  test('round-trip for zero', () => {
    expect(toOriginal(factoredInteger(0))).toBe(0);
  });

  test('factoredInteger of negative should round-trip', () => {
    expect(toOriginal(factoredInteger(-7.5))).toBe(-7.5);
  });
});

// ---------------------------------------------------------------------------
// L10: factoredInteger edge cases
// ---------------------------------------------------------------------------
describe('L10: factoredInteger edge cases', () => {
  test('zero', () => {
    expect(factoredInteger(0)).toBe(0);
  });

  test('negative', () => {
    expect(factoredInteger(-1)).toBe(-100000);
  });

  test('NaN propagates', () => {
    expect(factoredInteger(NaN)).toBeNaN();
  });

  test('Infinity propagates', () => {
    expect(factoredInteger(Infinity)).toBe(Infinity);
  });
});

// ---------------------------------------------------------------------------
// H5: Double-evaluation break in 2D packing loop
// ---------------------------------------------------------------------------
describe('H5: 2D packing should not break prematurely', () => {
  test('all fitting boxes should be packed even with many bins', () => {
    // Create a scenario with multiple small boxes that should all fit
    const bins = [{ width: 100, height: 100 }];
    const boxes = Array.from({ length: 10 }, () => ({ width: 10, height: 10 }));
    const result = pack2D({ bins, boxes });
    // All 10 boxes (10x10) should fit in a 100x100 bin
    expect(result.unpackedBoxes.length).toBe(0);
    const totalPacked = result.packedBins.reduce((sum, b) => sum + b.boxes.length, 0);
    expect(totalPacked).toBe(10);
  });
});
