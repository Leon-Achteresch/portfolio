'use client';

import * as THREE from 'three';

interface SkillOrbitRingsProps {
  planetPosition: [number, number, number];
  planetSize: number;
}

export function SkillOrbitRings({
  planetPosition,
  planetSize,
}: SkillOrbitRingsProps) {
  return (
    <>
      <mesh position={planetPosition} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planetSize * 2 - 0.5, planetSize * 2 + 0.5, 64]} />
        <meshBasicMaterial
          color='#10b981'
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={planetPosition} rotation={[Math.PI / 2.5, 0.3, 0]}>
        <ringGeometry args={[planetSize * 3, planetSize * 3 + 0.3, 64]} />
        <meshBasicMaterial
          color='#22d3ee'
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={planetPosition} rotation={[Math.PI / 3, -0.2, 0.5]}>
        <ringGeometry args={[planetSize * 4, planetSize * 4 + 0.2, 64]} />
        <meshBasicMaterial
          color='#8b5cf6'
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
