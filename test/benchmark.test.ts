import { describe, test, expect } from 'bun:test';
import { pack2D } from '../src/2D/packer';
import { pack3D } from '../src/3D/packer';
import type { Box2D, Bin2D } from '../src/2D/types';
import type { Item3D, Bin3D } from '../src/3D/types';

function measureSync(fn: () => void, label: string) {
  const before = process.memoryUsage();
  const start = performance.now();
  fn();
  const elapsed = performance.now() - start;
  const after = process.memoryUsage();
  const heapDelta = (after.heapUsed - before.heapUsed) / 1024 / 1024;
  const rssDelta = (after.rss - before.rss) / 1024 / 1024;
  console.log(
    `  [${label}] ${elapsed.toFixed(1)}ms | heap Δ${heapDelta.toFixed(2)}MB | rss Δ${rssDelta.toFixed(2)}MB`
  );
  return { elapsed, heapDelta, rssDelta };
}

function makeBoxes2D(n: number, maxW = 50, maxH = 50): Box2D[] {
  return Array.from({ length: n }, (_, i) => ({
    width: (i % maxW) + 1,
    height: (i % maxH) + 1,
  }));
}

function makeItems3D(n: number): Item3D[] {
  return Array.from({ length: n }, (_, i) => ({
    name: `item-${i}`,
    width: (i % 10) + 1,
    height: (i % 8) + 1,
    depth: (i % 6) + 1,
    weight: (i % 5) + 1,
  }));
}

// ---------------------------------------------------------------------------
// 2D benchmarks
// ---------------------------------------------------------------------------
describe('2D benchmarks', () => {
  test('100 boxes / 1 bin', () => {
    const bins: Bin2D[] = [{ width: 1000, height: 1000 }];
    const boxes = makeBoxes2D(100);
    const { elapsed } = measureSync(() => {
      const r = pack2D({ bins, boxes });
      expect(r.packedBins.length).toBeGreaterThan(0);
    }, '2D 100 boxes');
    expect(elapsed).toBeLessThan(1000);
  });

  test('500 boxes / 1 bin', () => {
    const bins: Bin2D[] = [{ width: 2000, height: 2000 }];
    const boxes = makeBoxes2D(500);
    const { elapsed } = measureSync(() => {
      const r = pack2D({ bins, boxes });
      expect(r.packedBins.length).toBeGreaterThan(0);
    }, '2D 500 boxes');
    expect(elapsed).toBeLessThan(5000);
  });

  test('1000 boxes / 1 bin', () => {
    const bins: Bin2D[] = [{ width: 5000, height: 5000 }];
    const boxes = makeBoxes2D(1000);
    const { elapsed } = measureSync(() => {
      const r = pack2D({ bins, boxes });
      expect(r.packedBins.length).toBeGreaterThan(0);
    }, '2D 1000 boxes');
    expect(elapsed).toBeLessThan(30000);
  });

  test('500 boxes / 5 bins', () => {
    const bins: Bin2D[] = Array.from({ length: 5 }, () => ({ width: 500, height: 500 }));
    const boxes = makeBoxes2D(500);
    const { elapsed } = measureSync(() => {
      const r = pack2D({ bins, boxes });
      expect(r.packedBins.length).toBe(5);
    }, '2D 500 boxes / 5 bins');
    expect(elapsed).toBeLessThan(30000);
  });
});

// ---------------------------------------------------------------------------
// 3D benchmarks
// ---------------------------------------------------------------------------
describe('3D benchmarks', () => {
  test('50 items / 1 bin', () => {
    const bins: Bin3D[] = [{ name: 'bin', width: 100, height: 100, depth: 100, maxWeight: 10000 }];
    const items = makeItems3D(50);
    const { elapsed } = measureSync(() => {
      const r = pack3D({ bins, items });
      expect(r.packedBins.length).toBeGreaterThan(0);
    }, '3D 50 items');
    expect(elapsed).toBeLessThan(2000);
  });

  test('200 items / 1 bin', () => {
    const bins: Bin3D[] = [{ name: 'bin', width: 200, height: 200, depth: 200, maxWeight: 100000 }];
    const items = makeItems3D(200);
    const { elapsed } = measureSync(() => {
      const r = pack3D({ bins, items });
      expect(r.packedBins.length).toBeGreaterThan(0);
    }, '3D 200 items');
    expect(elapsed).toBeLessThan(10000);
  });

  test('500 items / 1 bin', () => {
    const bins: Bin3D[] = [{ name: 'bin', width: 500, height: 500, depth: 500, maxWeight: 500000 }];
    const items = makeItems3D(500);
    const { elapsed } = measureSync(() => {
      const r = pack3D({ bins, items });
      expect(r.packedBins.length).toBeGreaterThan(0);
    }, '3D 500 items');
    expect(elapsed).toBeLessThan(60000);
  });

  test('100 items / 5 bins', () => {
    const bins: Bin3D[] = Array.from({ length: 5 }, (_, i) => ({
      name: `bin-${i}`,
      width: 50 + i * 10,
      height: 50 + i * 10,
      depth: 50 + i * 10,
      maxWeight: 10000,
    }));
    const items = makeItems3D(100);
    const { elapsed } = measureSync(() => {
      const r = pack3D({ bins, items });
      expect(r.packedBins.length).toBe(5);
    }, '3D 100 items / 5 bins');
    expect(elapsed).toBeLessThan(10000);
  });
});

// ---------------------------------------------------------------------------
// Load / stress tests
// ---------------------------------------------------------------------------
describe('load tests', () => {
  test('2D: 2000 boxes should not OOM or hang', () => {
    const bins: Bin2D[] = [{ width: 10000, height: 10000 }];
    const boxes = makeBoxes2D(2000);
    const { elapsed, heapDelta } = measureSync(() => {
      const r = pack2D({ bins, boxes });
      expect(r.packedBins.length).toBeGreaterThan(0);
    }, '2D 2000 boxes LOAD');
    expect(elapsed).toBeLessThan(120000);
    expect(heapDelta).toBeLessThan(512);
  });

  test('3D: 500 items large bin should not OOM or hang', () => {
    const bins: Bin3D[] = [{ name: 'big', width: 500, height: 500, depth: 500, maxWeight: 500_000 }];
    const items = makeItems3D(500);
    const { elapsed, heapDelta } = measureSync(() => {
      const r = pack3D({ bins, items });
      expect(r.packedBins.length).toBeGreaterThan(0);
    }, '3D 500 items LOAD');
    expect(elapsed).toBeLessThan(120000);
    expect(heapDelta).toBeLessThan(512);
  });

  test('2D: many small boxes in tight bin (worst-case fragmentation)', () => {
    const bins: Bin2D[] = [{ width: 30, height: 30 }];
    const boxes: Box2D[] = Array.from({ length: 500 }, () => ({ width: 7, height: 7 }));
    const { elapsed } = measureSync(() => {
      const r = pack2D({ bins, boxes });
      const packed = r.packedBins.reduce((s, b) => s + b.boxes.length, 0);
      expect(packed).toBeGreaterThan(0);
      expect(r.unpackedBoxes.length).toBeGreaterThan(0);
    }, '2D fragmentation stress');
    expect(elapsed).toBeLessThan(30000);
  });

  test('3D: identical items (uniform packing)', () => {
    const bins: Bin3D[] = [{ name: 'bin', width: 100, height: 100, depth: 100, maxWeight: 100000 }];
    const items: Item3D[] = Array.from({ length: 200 }, (_, i) => ({
      name: `cube-${i}`,
      width: 10,
      height: 10,
      depth: 10,
      weight: 1,
    }));
    const { elapsed } = measureSync(() => {
      const r = pack3D({ bins, items });
      const packed = r.packedBins.reduce((s, b) => s + b.items.length, 0);
      expect(packed).toBeGreaterThan(0);
    }, '3D uniform cubes');
    expect(elapsed).toBeLessThan(30000);
  });

  test('3D: items larger than bin (all rejected)', () => {
    const bins: Bin3D[] = [{ name: 'tiny', width: 1, height: 1, depth: 1, maxWeight: 100 }];
    const items = Array.from({ length: 100 }, (_, i) => ({
      name: `big-${i}`,
      width: 10,
      height: 10,
      depth: 10,
      weight: 1,
    }));
    const { elapsed } = measureSync(() => {
      const r = pack3D({ bins, items });
      expect(r.unfitItems.length).toBe(100);
    }, '3D all-rejected');
    expect(elapsed).toBeLessThan(5000);
  });

  test('2D: zero-area bin (edge case)', () => {
    const bins: Bin2D[] = [{ width: 0, height: 100 }];
    const boxes: Box2D[] = [{ width: 10, height: 10 }];
    const { elapsed } = measureSync(() => {
      const r = pack2D({ bins, boxes });
      expect(r.unpackedBoxes.length).toBe(1);
    }, '2D zero-width bin');
    expect(elapsed).toBeLessThan(1000);
  });
});
