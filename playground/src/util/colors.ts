function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// 137 is coprime with 360 — spreads short/adjacent names across the wheel.
export function colorForName(name: string): string {
  const hue = (hashName(name) * 137) % 360;
  return `hsl(${hue}, 70%, 55%)`;
}

