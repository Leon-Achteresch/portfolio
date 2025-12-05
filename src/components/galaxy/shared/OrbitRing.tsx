'use client';

import * as THREE from 'three';

interface OrbitRingProps {
  planetPosition: [number, number, number];
  radius: number;
  color: string;
  opacity: number;
  tilt?: number;
}

export function OrbitRing({
  planetPosition,
  radius,
  color,
  opacity,
  tilt = 0,
}: OrbitRingProps) {
  return (
    <mesh position={planetPosition} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
