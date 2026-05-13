import { describe, it, expect } from 'bun:test';

describe('Build verification', () => {
  it('ESM main entry exports pack2D and pack3D', async () => {
    const mod = await import('../dist/esm/index.js');
    expect(typeof mod.pack2D).toBe('function');
    expect(typeof mod.pack3D).toBe('function');
  });

  it('ESM 2D entry exports pack2D', async () => {
    const mod = await import('../dist/esm/2D/index.js');
    expect(typeof mod.pack2D).toBe('function');
    expect(typeof mod.Packer2D).toBe('function');
  });

  it('ESM 3D entry exports pack3D', async () => {
    const mod = await import('../dist/esm/3D/index.js');
    expect(typeof mod.pack3D).toBe('function');
    expect(typeof mod.Packer3D).toBe('function');
  });

  it('CJS main entry works', () => {
    const mod = require('../dist/cjs/index.js');
    expect(typeof mod.pack2D).toBe('function');
    expect(typeof mod.pack3D).toBe('function');
  });

  it('ESM pack2D produces correct results', async () => {
    const { pack2D } = await import('../dist/esm/index.js');
    const result = pack2D({
      bins: [{ width: 100, height: 50 }],
      boxes: [{ width: 50, height: 50 }, { width: 10, height: 40 }],
    });
    expect(result.packedBins[0].boxes.length).toBe(2);
  });

  it('ESM pack3D produces correct results', async () => {
    const { pack3D } = await import('../dist/esm/index.js');
    const result = pack3D({
      bins: [{ name: 'Bin', width: 100, height: 100, depth: 100, maxWeight: 1000 }],
      items: [{ name: 'Item', width: 50, height: 50, depth: 50, weight: 10 }],
    });
    expect(result.packedBins[0].items.length).toBe(1);
  });
});
