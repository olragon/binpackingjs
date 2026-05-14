const FACTOR = 100000;
const DECIMAL_PLACES = 5;

export function factoredInteger(value: number): number {
  return Math.round(value * FACTOR);
}

export function toOriginal(value: number): number {
  return Number((value / FACTOR).toFixed(DECIMAL_PLACES));
}
