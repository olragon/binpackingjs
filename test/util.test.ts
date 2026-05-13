import { describe, it, expect } from 'bun:test';
import { factoredInteger } from '../src/3d/util';

describe('util', () => {
  it('factoredInteger()', () => {
    expect(factoredInteger(1)).toBe(100000);
    expect(factoredInteger(123)).toBe(12300000);
    expect(factoredInteger(0.00001)).toBe(1);
    expect(factoredInteger(0.123456)).toBe(12346);
    expect(factoredInteger(0.123454)).toBe(12345);
  });
});
