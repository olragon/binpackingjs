// Per-demo randomisers. Each function returns a fresh input that *preserves the
// spirit* of the README example (e.g. QuickStart2D always includes one oversize
// box so the unfit handling stays visible).

function rand(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export type Box2D = { name?: string; width: number; height: number; constrainRotation?: boolean };
export type Bin2D = { width: number; height: number };

export function seed_quickStart2D(): { bins: Bin2D[]; boxes: Box2D[] } {
  const binCount = rand(2, 3);
  const bins: Bin2D[] = Array.from({ length: binCount }, () => ({
    width: rand(80, 130),
    height: rand(40, 80),
  }));
  const fitting = rand(3, 5);
  const boxes: Box2D[] = Array.from({ length: fitting }, (_, i) => ({
    name: `${i + 1}`,
    width: rand(15, 55),
    height: rand(15, 45),
  }));
  boxes.push({ name: "XXL", width: 200, height: 200 });
  return { bins, boxes };
}

export function seed_heuristics2D(): { bin: Bin2D; boxes: Box2D[] } {
  const bin: Bin2D = { width: 150, height: 100 };
  const n = rand(8, 12);
  const boxes: Box2D[] = Array.from({ length: n }, (_, i) => ({
    name: `${i + 1}`,
    width: rand(15, 70),
    height: rand(15, 50),
  }));
  return { bin, boxes };
}

export function seed_rotation2D(): { bin: Bin2D; portraitBox: Box2D } {
  // Bin wider than tall; box taller than the bin's height so rotation is required to fit.
  const bin: Bin2D = { width: rand(90, 130), height: rand(30, 50) };
  const w = rand(20, Math.min(40, bin.height - 5));
  const h = rand(bin.height + 20, bin.width - 10);
  return { bin, portraitBox: { name: "A", width: w, height: h } };
}

export type Item3D = {
  name: string;
  width: number;
  height: number;
  depth: number;
  weight: number;
};

export function seed_quickStart3D(): {
  bin: { name: string; width: number; height: number; depth: number; maxWeight: number };
  items: Item3D[];
} {
  const n = rand(2, 5);
  const depth = rand(2, 12);
  const items: Item3D[] = Array.from({ length: n }, (_, i) => ({
    name: `Item ${i + 1}`,
    width: rand(180, 260),
    height: rand(180, 260),
    depth,
    weight: rand(100, 300),
  }));
  return {
    bin: { name: "Small Box", width: 296, height: 296, depth: 8 + depth * n, maxWeight: 5000 },
    items,
  };
}

export function seed_rotation3D(): {
  bin: { name: string; width: number; height: number; depth: number; maxWeight: number };
  longItem: Item3D;
} {
  // Bin is shallow on w/h but deep on d. A "long" item only fits when its
  // longest axis is rotated onto the depth axis.
  const wh = rand(50, 80);
  const d = rand(180, 240);
  const long = rand(d - 30, d - 5);
  return {
    bin: { name: "Tall Bin", width: wh, height: wh, depth: d, maxWeight: 1500 },
    longItem: {
      name: "Stick",
      width: long,
      height: rand(20, wh - 10),
      depth: rand(20, wh - 10),
      weight: 200,
    },
  };
}
