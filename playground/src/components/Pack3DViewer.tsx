import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, Grid } from "@react-three/drei";
import * as THREE from "three";

export type Decoded3DItem = {
  name: string;
  position: [number, number, number];   // in user units (NOT factored)
  dimension: [number, number, number];  // in user units (NOT factored)
  color: string;
};

export type Bin3D = { width: number; height: number; depth: number };

type Props = {
  bin: Bin3D;
  items: Decoded3DItem[];
};

function BinWireframe({ bin }: { bin: Bin3D }) {
  const geometry = useMemo(() => {
    const box = new THREE.BoxGeometry(bin.width, bin.height, bin.depth);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, [bin.width, bin.height, bin.depth]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <lineSegments
      geometry={geometry}
      position={[bin.width / 2, bin.height / 2, bin.depth / 2]}
    >
      <lineBasicMaterial color="#5c7cfa" transparent opacity={0.7} />
    </lineSegments>
  );
}

function ItemMesh({ item, delayMs }: { item: Decoded3DItem; delayMs: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const startedAt = useRef<number>(performance.now() + delayMs);
  const center = useMemo<[number, number, number]>(
    () => [
      item.position[0] + item.dimension[0] / 2,
      item.position[1] + item.dimension[1] / 2,
      item.position[2] + item.dimension[2] / 2,
    ],
    [item.position, item.dimension]
  );

  useEffect(() => {
    startedAt.current = performance.now() + delayMs;
  }, [item.name, delayMs]);

  useFrame(() => {
    if (!mat.current) return;
    const t = (performance.now() - startedAt.current) / 400;
    const o = t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3);
    mat.current.opacity = o;
  });

  return (
    <mesh ref={ref} position={center}>
      <boxGeometry args={item.dimension} />
      <meshStandardMaterial
        ref={mat}
        color={item.color}
        emissive={item.color}
        emissiveIntensity={0.05}
        roughness={0.55}
        metalness={0.05}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

function CameraFit({ bin }: { bin: Bin3D }) {
  const { camera, controls } = useThree() as any;
  useEffect(() => {
    const maxDim = Math.max(bin.width, bin.height, bin.depth);
    const dist = maxDim * 1.7;
    const cx = bin.width / 2;
    const cy = bin.height / 2;
    const cz = bin.depth / 2;
    camera.position.set(cx + dist * 0.7, cy + dist * 0.55, cz + dist * 0.95);
    camera.near = Math.max(0.1, maxDim / 1000);
    camera.far = maxDim * 50;
    camera.updateProjectionMatrix();
    if (controls) {
      controls.target.set(cx, cy, cz);
      controls.update();
    }
  }, [bin.width, bin.height, bin.depth, camera, controls]);
  return null;
}

export function Pack3DViewer({ bin, items }: Props) {
  const gridSize = Math.max(bin.width, bin.depth) * 3;
  const axisLen = Math.max(60, Math.max(bin.width, bin.height, bin.depth) * 0.25);

  return (
    <Canvas camera={{ fov: 45, near: 1, far: 10000, position: [400, 400, 600] }}>
      <color attach="background" args={["#0b0c10"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[400, 800, 300]} intensity={0.9} />
      <directionalLight position={[-200, 400, -200]} intensity={0.35} />

      <Grid
        position={[bin.width / 2, 0, bin.depth / 2]}
        args={[gridSize, gridSize]}
        cellSize={20}
        cellThickness={0.6}
        cellColor="#2a2e3a"
        sectionSize={100}
        sectionThickness={1}
        sectionColor="#4c6ef5"
        fadeDistance={gridSize * 1.5}
        fadeStrength={1}
        infiniteGrid={false}
      />

      <axesHelper args={[axisLen]} />

      <BinWireframe bin={bin} />

      {items.map((it, i) => (
        <ItemMesh key={it.name} item={it} delayMs={i * 80} />
      ))}

      <CameraFit bin={bin} />
      <OrbitControls makeDefault enableDamping dampingFactor={0.12} />
      <GizmoHelper alignment="top-right" margin={[60, 60]}>
        <GizmoViewport axisColors={["#ef4444", "#10b981", "#3b82f6"]} labelColor="white" />
      </GizmoHelper>
    </Canvas>
  );
}
