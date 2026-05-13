import { describe, it, expect } from 'bun:test';
import { pack2D, BestShortSideFit } from '../src/2d';
import { pack3D } from '../src/3d';

describe('Bug Reproductions', () => {
  describe('Issue #42 - 2D packing fails to place boxes vertically', () => {
    it('should pack 10 identical boxes vertically when only vertical stacking fits', () => {
      const boxes = Array.from({ length: 10 }, () => ({ width: 8604, height: 17470 }));
      const result = pack2D({
        bins: [{ width: 12992, height: 251568 }],
        boxes,
        heuristic: new BestShortSideFit(),
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(10);
    });

    it('should pack 5 boxes vertically in a tall narrow bin', () => {
      const boxes = Array.from({ length: 5 }, () => ({ width: 80, height: 100 }));
      const result = pack2D({
        bins: [{ width: 90, height: 600 }],
        boxes,
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(5);
    });
  });

  describe('Issue #37 - 3D packing depth issue', () => {
    it('should fit 4 items in a bin of exactly 2x2x1 item dimensions', () => {
      const result = pack3D({
        bins: [{ name: 'bin_of_4', width: 18.75 * 2, height: 7.25 * 2, depth: 4 * 1, maxWeight: 10000 }],
        items: Array.from({ length: 4 }, (_, i) => ({
          name: `item_${i + 1}`, width: 18.75, height: 7.25, depth: 4, weight: 1,
        })),
      });
      expect(result.packedBins[0]!.items.length).toBe(4);
      expect(result.unfitItems.length).toBe(0);
    });

    it('should fit 8 items in a bin of exactly 2x2x2 item dimensions', () => {
      const result = pack3D({
        bins: [{ name: 'bin_of_8', width: 18.75 * 2, height: 7.25 * 2, depth: 4 * 2, maxWeight: 10000 }],
        items: Array.from({ length: 8 }, (_, i) => ({
          name: `item_${i + 1}`, width: 18.75, height: 7.25, depth: 4, weight: 1,
        })),
      });
      expect(result.packedBins[0]!.items.length).toBe(8);
      expect(result.unfitItems.length).toBe(0);
    });

    it('should fit 8 identical cubes in a bin exactly 2x their size', () => {
      const result = pack3D({
        bins: [{ name: 'cube_bin', width: 20, height: 20, depth: 20, maxWeight: 10000 }],
        items: Array.from({ length: 8 }, (_, i) => ({
          name: `cube_${i + 1}`, width: 10, height: 10, depth: 10, weight: 1,
        })),
      });
      expect(result.packedBins[0]!.items.length).toBe(8);
      expect(result.unfitItems.length).toBe(0);
    });
  });
});
