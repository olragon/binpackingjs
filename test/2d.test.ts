import { describe, it, expect } from 'bun:test';
import { pack2D, Packer2D, BestAreaFit, BestShortSideFit } from '../src/2d';

describe('2D Bin Packing', () => {
  describe('pack2D', () => {
    it('does nothing when no bin and no box passed', () => {
      const result = pack2D({ bins: [], boxes: [] });
      expect(result.packedBins).toEqual([]);
      expect(result.unpackedBoxes).toEqual([]);
    });

    it('puts single box in single bin', () => {
      const box = { width: 9000, height: 3000 };
      const result = pack2D({
        bins: [{ width: 9600, height: 3100 }],
        boxes: [box],
      });
      expect(result.unpackedBoxes.length).toBe(0);
      expect(result.packedBins[0]!.boxes.length).toBe(1);
      expect(result.packedBins[0]!.boxes[0]!.x).toBe(0);
      expect(result.packedBins[0]!.boxes[0]!.y).toBe(0);
      expect(result.packedBins[0]!.boxes[0]!.width).toBe(9000);
      expect(result.packedBins[0]!.boxes[0]!.height).toBe(3000);
    });

    it('puts rotated box in single bin', () => {
      const box = { width: 1000, height: 9000 };
      const result = pack2D({
        bins: [{ width: 9600, height: 3100 }],
        boxes: [box],
      });
      expect(result.packedBins[0]!.boxes.length).toBe(1);
      expect(result.packedBins[0]!.boxes[0]!.rotated).toBe(true);
    });

    it('puts large box in large bin', () => {
      const bins = [
        { width: 9600, height: 3100 },
        { width: 10000, height: 4500 },
        { width: 12000, height: 4500 },
      ];
      const result = pack2D({
        bins,
        boxes: [{ width: 11000, height: 2000 }],
      });
      expect(result.unpackedBoxes.length).toBe(0);
      expect(result.packedBins[0]!.boxes.length).toBe(0);
      expect(result.packedBins[1]!.boxes.length).toBe(0);
      expect(result.packedBins[2]!.boxes.length).toBe(1);
    });

    it('puts two boxes in single bin', () => {
      const result = pack2D({
        bins: [{ width: 9600, height: 3100 }],
        boxes: [
          { width: 8000, height: 1500 },
          { width: 1000, height: 9000 },
        ],
      });
      expect(result.packedBins[0]!.boxes.length).toBe(2);
    });

    it('puts two boxes in separate bins', () => {
      const result = pack2D({
        bins: [
          { width: 9600, height: 3100 },
          { width: 9600, height: 3100 },
        ],
        boxes: [
          { width: 5500, height: 2000 },
          { width: 5000, height: 2000 },
        ],
      });
      expect(result.packedBins[0]!.boxes.length).toBe(1);
      expect(result.packedBins[1]!.boxes.length).toBe(1);
    });

    it('does not put in bin too large box', () => {
      const result = pack2D({
        bins: [{ width: 9600, height: 3100 }],
        boxes: [{ width: 10000, height: 10 }],
      });
      expect(result.unpackedBoxes.length).toBe(1);
      expect(result.packedBins[0]!.boxes.length).toBe(0);
    });

    it('puts in bin only fitting boxes', () => {
      const result = pack2D({
        bins: [{ width: 9600, height: 3100 }],
        boxes: [
          { width: 4000, height: 3000 },
          { width: 4000, height: 3000 },
          { width: 4000, height: 3000 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(2);
      expect(result.unpackedBoxes.length).toBe(1);
    });

    it('respects limit', () => {
      const result = pack2D({
        bins: [{ width: 9600, height: 3100 }],
        boxes: [
          { width: 1000, height: 1000 },
          { width: 1000, height: 1000 },
        ],
        limit: 1,
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(1);
    });

    it('does not mutate input boxes', () => {
      const box = { width: 1000, height: 9000 };
      const frozen = Object.freeze(box);
      const result = pack2D({
        bins: [{ width: 9600, height: 3100 }],
        boxes: [frozen],
      });
      expect(result.packedBins[0]!.boxes.length).toBe(1);
      expect(box.width).toBe(1000);
      expect(box.height).toBe(9000);
    });

    it('puts multiple boxes into multiple bins', () => {
      const result = pack2D({
        bins: [
          { width: 100, height: 50 },
          { width: 50, height: 50 },
        ],
        boxes: [
          { width: 15, height: 10 },
          { width: 50, height: 45 },
          { width: 40, height: 40 },
          { width: 200, height: 200 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(3);
      expect(result.unpackedBoxes.length).toBe(1);
    });

    it('allows custom heuristic', () => {
      const result = pack2D({
        bins: [{ width: 100, height: 50 }],
        boxes: [{ width: 50, height: 100 }],
        heuristic: new BestAreaFit(),
      });
      expect(result.packedBins[0]!.boxes.length).toBe(1);
    });

    it('can work with float', () => {
      const result = pack2D({
        bins: [
          { width: 1, height: 1 },
          { width: 0.5, height: 0.5 },
        ],
        boxes: [
          { width: 0.2, height: 1 / 7 },
          { width: 0.2, height: 0.5 },
          { width: 0.25, height: 0.25 },
          { width: 0.5, height: 0.5 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(4);
    });

    it('constrains rotation on boxes', () => {
      const result = pack2D({
        bins: [{ width: 100, height: 50 }],
        boxes: [
          { width: 50, height: 100, constrainRotation: true },
          { width: 50, height: 100 },
        ],
      });
      const totalPacked = result.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(totalPacked).toBe(1);
    });
  });

  describe('Packer2D class', () => {
    it('wraps pack2D correctly', () => {
      const packer = new Packer2D([{ width: 100, height: 50 }]);
      const result = packer.pack([
        { width: 50, height: 50 },
        { width: 10, height: 40 },
      ]);
      expect(result.packedBins[0]!.boxes.length).toBe(2);
    });
  });
});
