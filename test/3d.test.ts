import { describe, it, expect } from 'bun:test';
import { pack3D, Packer3D, RotationType } from '../src/3d';

describe('3D Bin Packing', () => {
  describe('pack3D', () => {
    it('edge case that needs rotation', () => {
      const result = pack3D({
        bins: [{ name: 'Le grande box', width: 100, height: 100, depth: 300, maxWeight: 1500 }],
        items: [{ name: 'Item 1', width: 150, height: 50, depth: 50, weight: 20 }],
      });
      expect(result.packedBins[0]!.items.length).toBe(1);
      expect(result.unfitItems.length).toBe(0);
    });

    it('edge case with only rotation 3 and 0 enabled', () => {
      const result = pack3D({
        bins: [{ name: 'Le grande box', width: 100, height: 100, depth: 300, maxWeight: 1500 }],
        items: [{
          name: 'Item 1', width: 150, height: 50, depth: 50, weight: 20,
          allowedRotations: [RotationType.WHD, RotationType.DHW],
        }],
      });
      expect(result.packedBins[0]!.items.length).toBe(1);
      expect(result.unfitItems.length).toBe(0);
    });

    it('three items fit into smaller bin after rotation', () => {
      const result = pack3D({
        bins: [
          { name: '1. Le petite box', width: 296, height: 296, depth: 8, maxWeight: 1000 },
          { name: '2. Le grande box', width: 2960, height: 2960, depth: 80, maxWeight: 10000 },
        ],
        items: [
          { name: 'Item 1', width: 250, height: 250, depth: 2, weight: 200 },
          { name: 'Item 2', width: 250, height: 2, depth: 250, weight: 200 },
          { name: 'Item 3', width: 2, height: 250, depth: 250, weight: 200 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(3);
      expect(result.packedBins[1]!.items.length).toBe(0);
      expect(result.unfitItems.length).toBe(0);
    });

    it('three items fit into larger bin', () => {
      const result = pack3D({
        bins: [
          { name: '1. Le petite box', width: 296, height: 296, depth: 8, maxWeight: 1000 },
          { name: '2. Le grande box', width: 2960, height: 2960, depth: 80, maxWeight: 10000 },
        ],
        items: [
          { name: 'Item 1', width: 2500, height: 2500, depth: 20, weight: 2000 },
          { name: 'Item 2', width: 2500, height: 2500, depth: 20, weight: 2000 },
          { name: 'Item 3', width: 2500, height: 2500, depth: 20, weight: 2000 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(0);
      expect(result.packedBins[1]!.items.length).toBe(3);
      expect(result.unfitItems.length).toBe(0);
    });

    it('three items don\'t fit into smaller bin due to weight', () => {
      const result = pack3D({
        bins: [
          { name: '1. Le petite box', width: 296, height: 296, depth: 8, maxWeight: 1000 },
          { name: '2. Le grande box', width: 2960, height: 2960, depth: 80, maxWeight: 10000 },
        ],
        items: [
          { name: 'Item 1', width: 250, height: 250, depth: 2, weight: 2000 },
          { name: 'Item 2', width: 250, height: 250, depth: 2, weight: 2000 },
          { name: 'Item 3', width: 250, height: 250, depth: 2, weight: 2000 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(0);
      expect(result.packedBins[1]!.items.length).toBe(3);
      expect(result.unfitItems.length).toBe(0);
    });

    it('1 bin with 7 items fit into', () => {
      const result = pack3D({
        bins: [{ name: 'Bin 1', width: 220, height: 160, depth: 100, maxWeight: 110 }],
        items: [
          { name: 'Item 1', width: 20, height: 100, depth: 30, weight: 10 },
          { name: 'Item 2', width: 100, height: 20, depth: 30, weight: 10 },
          { name: 'Item 3', width: 20, height: 100, depth: 30, weight: 10 },
          { name: 'Item 4', width: 100, height: 20, depth: 30, weight: 10 },
          { name: 'Item 5', width: 100, height: 20, depth: 30, weight: 10 },
          { name: 'Item 6', width: 100, height: 100, depth: 30, weight: 10 },
          { name: 'Item 7', width: 100, height: 100, depth: 30, weight: 10 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(7);
      expect(result.unfitItems.length).toBe(0);
    });

    it('big item is packed first', () => {
      const result = pack3D({
        bins: [{ name: 'Bin 1', width: 100, height: 100, depth: 100, maxWeight: 1000 }],
        items: [
          { name: 'Item 1', width: 50, height: 100, depth: 100, weight: 100 },
          { name: 'Item 2', width: 100, height: 100, depth: 100, weight: 100 },
          { name: 'Item 3', width: 50, height: 100, depth: 100, weight: 100 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(1);
      expect(result.unfitItems.length).toBe(2);
    });

    it('first item fits without rotation but needs rotation to fit all items', () => {
      const result = pack3D({
        bins: [
          { name: 'USPS Medium Flat Rate Box (Top Loading)', width: 11, height: 8.5, depth: 5.5, maxWeight: 1500 },
        ],
        items: [
          { name: 'Item 1', width: 8.1, height: 5.2, depth: 2.2, weight: 20 },
          { name: 'Item 2', width: 8.1, height: 5.2, depth: 3.3, weight: 20 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(2);
      expect(result.unfitItems.length).toBe(0);
    });

    it('floating point arithmetic is handled correctly', () => {
      const result = pack3D({
        bins: [{ name: 'Bin 1', width: 12, height: 12, depth: 5.5, maxWeight: 70 }],
        items: [
          { name: 'Item 1', width: 12, height: 12, depth: 0.005, weight: 0.0375 },
          { name: 'Item 2', width: 12, height: 12, depth: 0.005, weight: 0.0375 },
        ],
      });
      expect(result.packedBins[0]!.items.length).toBe(2);
      expect(result.unfitItems.length).toBe(0);
    });

    it('does not mutate input items', () => {
      const item = Object.freeze({ name: 'Item', width: 10, height: 10, depth: 10, weight: 1 });
      const result = pack3D({
        bins: [{ name: 'Bin', width: 20, height: 20, depth: 20, maxWeight: 100 }],
        items: [item],
      });
      expect(result.packedBins[0]!.items.length).toBe(1);
      expect(item.width).toBe(10);
    });

    it('packs a mixed ecommerce order into Packrift carton fixtures', () => {
      // Public fixture source: https://packrift.github.io/packaging-optimization-benchmark-corpus/cartonization-solver-fixtures.html
      const result = pack3D({
        bins: [
          { name: 'Packrift 10x6x6 carton', width: 10, height: 6, depth: 6, maxWeight: 65 },
          { name: 'Packrift 16x8x4 carton', width: 16, height: 8, depth: 4, maxWeight: 65 },
          { name: 'Packrift 20x14x6 carton', width: 20, height: 14, depth: 6, maxWeight: 65 },
          { name: 'Packrift 24x10x8 carton', width: 24, height: 10, depth: 8, maxWeight: 65 },
          { name: 'Packrift 40x20x20 carton', width: 40, height: 20, depth: 20, maxWeight: 65 },
        ],
        items: [
          { name: 'demo-small-item', width: 7.5, height: 4.5, depth: 3.5, weight: 1 },
          { name: 'demo-flat-item-1', width: 15, height: 7, depth: 2.5, weight: 2 },
          { name: 'demo-flat-item-2', width: 15, height: 7, depth: 2.5, weight: 2 },
          { name: 'demo-long-item', width: 21, height: 8.5, depth: 5, weight: 3 },
          { name: 'demo-bulk-item-1', width: 18, height: 12, depth: 5.5, weight: 4 },
          { name: 'demo-bulk-item-2', width: 18, height: 12, depth: 5.5, weight: 4 },
          { name: 'demo-bulk-item-3', width: 18, height: 12, depth: 5.5, weight: 4 },
          { name: 'demo-bulk-item-4', width: 18, height: 12, depth: 5.5, weight: 4 },
        ],
      });

      const packedItemCount = result.packedBins.reduce((count, bin) => count + bin.items.length, 0);
      const largeCarton = result.packedBins.find((bin) => bin.name === 'Packrift 40x20x20 carton');

      expect(packedItemCount).toBe(8);
      expect(largeCarton?.items.length).toBeGreaterThan(0);
      expect(result.unfitItems.length).toBe(0);
    });
  });

  describe('Packer3D class', () => {
    it('wraps pack3D correctly', () => {
      const packer = new Packer3D();
      packer.addBin({ name: 'Bin', width: 100, height: 100, depth: 100, maxWeight: 1000 });
      packer.addItem({ name: 'Item', width: 50, height: 50, depth: 50, weight: 10 });
      const result = packer.pack();
      expect(result.packedBins[0]!.items.length).toBe(1);
    });
  });
});
