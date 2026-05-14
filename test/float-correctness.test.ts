import { describe, it, expect } from 'bun:test';
import { pack2D } from '../src/2d';
import { pack3D } from '../src/3d';
import { BestShortSideFit, BestLongSideFit, BestAreaFit, BottomLeft } from '../src/2d';

describe('Float / Decimal correctness', () => {

  describe('2D: classic float traps', () => {
    it('0.1 + 0.2 width boxes should fill a 0.3-wide bin', () => {
      // 0.1 + 0.2 !== 0.3 in IEEE 754
      const result = pack2D({
        bins: [{ width: 0.3, height: 1 }],
        boxes: [
          { width: 0.1, height: 1 },
          { width: 0.2, height: 1 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(2);
    });

    it('three 0.1-wide boxes should fit in a 0.3-wide bin', () => {
      const result = pack2D({
        bins: [{ width: 0.3, height: 1 }],
        boxes: [
          { width: 0.1, height: 1 },
          { width: 0.1, height: 1 },
          { width: 0.1, height: 1 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(3);
    });

    it('1/3 width boxes: three should fit in a 1-wide bin', () => {
      const third = 1 / 3;
      const result = pack2D({
        bins: [{ width: 1, height: 1 }],
        boxes: [
          { width: third, height: 1 },
          { width: third, height: 1 },
          { width: third, height: 1 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(3);
    });

    it('very small dimensions: 0.001 boxes in a 0.01 bin', () => {
      const result = pack2D({
        bins: [{ width: 0.01, height: 0.01 }],
        boxes: [
          { width: 0.005, height: 0.005 },
          { width: 0.005, height: 0.005 },
          { width: 0.005, height: 0.005 },
          { width: 0.005, height: 0.005 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(4);
    });

    it('exact-fit with float dimensions across all heuristics', () => {
      const heuristics = [new BestShortSideFit(), new BestLongSideFit(), new BestAreaFit(), new BottomLeft()];
      for (const heuristic of heuristics) {
        const result = pack2D({
          bins: [{ width: 0.5, height: 0.5 }],
          boxes: [{ width: 0.5, height: 0.5 }],
          heuristic,
        });
        const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
        expect(totalPacked).toBe(1);
      }
    });

    it('box dimensions summing to bin width with accumulated float error', () => {
      // 5 x 0.1 = should be 0.5, but float accumulation may drift
      const result = pack2D({
        bins: [{ width: 0.5, height: 0.1 }],
        boxes: [
          { width: 0.1, height: 0.1 },
          { width: 0.1, height: 0.1 },
          { width: 0.1, height: 0.1 },
          { width: 0.1, height: 0.1 },
          { width: 0.1, height: 0.1 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(5);
    });

    it('large integer dimensions should work correctly', () => {
      const result = pack2D({
        bins: [{ width: 1000000, height: 1000000 }],
        boxes: [
          { width: 500000, height: 500000 },
          { width: 500000, height: 500000 },
          { width: 500000, height: 500000 },
          { width: 500000, height: 500000 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(4);
    });
  });

  describe('3D: factor correctness', () => {
    it('round-trip factor preserves 5 decimal places', () => {
      const result = pack3D({
        bins: [{ name: 'B', width: 10, height: 10, depth: 10, maxWeight: 100 }],
        items: [{ name: 'I', width: 1.12345, height: 2.67891, depth: 3.00001, weight: 0.5 }],
      });
      const item = result.packedBins[0]!.items[0]!;
      expect(item.width).toBe(1.12345);
      expect(item.height).toBe(2.67891);
      expect(item.depth).toBe(3.00001);
    });

    it('dynamic factor preserves all input decimal places (up to 10)', () => {
      const result = pack3D({
        bins: [{ name: 'B', width: 10, height: 10, depth: 10, maxWeight: 100 }],
        items: [{ name: 'I', width: 1.123456, height: 1.123454, depth: 1, weight: 1 }],
      });
      const item = result.packedBins[0]!.items[0]!;
      expect(item.width).toBe(1.123456);
      expect(item.height).toBe(1.123454);
    });

    it('0.1 + 0.2 depth items in 0.3-depth bin', () => {
      const result = pack3D({
        bins: [{ name: 'B', width: 12, height: 12, depth: 0.3, maxWeight: 100 }],
        items: [
          { name: 'I1', width: 12, height: 12, depth: 0.1, weight: 1 },
          { name: 'I2', width: 12, height: 12, depth: 0.2, weight: 1 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(2);
      expect(result.unfitItems.length).toBe(0);
    });

    it('very small items with very small weight', () => {
      const result = pack3D({
        bins: [{ name: 'B', width: 1, height: 1, depth: 1, maxWeight: 1 }],
        items: [
          { name: 'I1', width: 0.00001, height: 0.00001, depth: 0.00001, weight: 0.00001 },
          { name: 'I2', width: 0.00001, height: 0.00001, depth: 0.00001, weight: 0.00001 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(2);
    });

    it('weight comparison with float precision', () => {
      // Three items of weight 0.1 should fit in maxWeight 0.3
      const result = pack3D({
        bins: [{ name: 'B', width: 30, height: 10, depth: 10, maxWeight: 0.3 }],
        items: [
          { name: 'I1', width: 10, height: 10, depth: 10, weight: 0.1 },
          { name: 'I2', width: 10, height: 10, depth: 10, weight: 0.1 },
          { name: 'I3', width: 10, height: 10, depth: 10, weight: 0.1 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(3);
      expect(result.unfitItems.length).toBe(0);
    });

    it('integer overflow guard: FACTOR * large dimension', () => {
      // FACTOR = 100000, dimension = 50000 → internal = 5,000,000,000
      // volume = 5e9 * 5e9 * 5e9 = exceeds safe integer
      // Check it doesn't crash and handles gracefully
      const result = pack3D({
        bins: [{ name: 'B', width: 50000, height: 50000, depth: 50000, maxWeight: 1000000 }],
        items: [{ name: 'I', width: 10000, height: 10000, depth: 10000, weight: 100 }],
      });
      expect(result.packedBins[0]!.items.length).toBe(1);
    });

    it('positions are correctly de-factored', () => {
      const result = pack3D({
        bins: [{ name: 'B', width: 10, height: 10, depth: 10, maxWeight: 100 }],
        items: [
          { name: 'I1', width: 5.5, height: 10, depth: 10, weight: 10 },
          { name: 'I2', width: 4.5, height: 10, depth: 10, weight: 10 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(2);
      const positions = result.packedBins[0]!.items.map(i => i.position[0]);
      // one at 0, the other offset by the first item's width
      expect(positions).toContain(0);
    });
  });

  describe('2D: score comparison edge cases', () => {
    it('identical-score boxes are both placed', () => {
      const result = pack2D({
        bins: [{ width: 2, height: 1 }],
        boxes: [
          { width: 1, height: 1 },
          { width: 1, height: 1 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(2);
    });
  });

  describe('User-given factor', () => {
    it('2D: user can provide custom factor', () => {
      const result = pack2D({
        bins: [{ width: 0.3, height: 1 }],
        boxes: [
          { width: 0.1, height: 1 },
          { width: 0.2, height: 1 },
        ],
        factor: 1000,
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(2);
    });

    it('3D: user can provide custom factor', () => {
      const result = pack3D({
        bins: [{ name: 'B', width: 12, height: 12, depth: 0.3, maxWeight: 100 }],
        items: [
          { name: 'I1', width: 12, height: 12, depth: 0.1, weight: 1 },
          { name: 'I2', width: 12, height: 12, depth: 0.2, weight: 1 },
        ],
        factor: 1000,
      });
      expect(result.packedBins[0]!.items.length).toBe(2);
    });

    it('2D: factor=1 means no factoring (raw floats)', () => {
      const result = pack2D({
        bins: [{ width: 100, height: 100 }],
        boxes: [
          { width: 50, height: 50 },
          { width: 50, height: 50 },
          { width: 50, height: 50 },
          { width: 50, height: 50 },
        ],
        factor: 1,
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(4);
    });

    it('3D: factor=1 works for integer-only inputs', () => {
      const result = pack3D({
        bins: [{ name: 'B', width: 20, height: 20, depth: 20, maxWeight: 100 }],
        items: [{ name: 'I', width: 10, height: 10, depth: 10, weight: 10 }],
        factor: 1,
      });
      expect(result.packedBins[0]!.items.length).toBe(1);
    });
  });
});
