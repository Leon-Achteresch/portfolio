'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface NebulaProps {
  count?: number;
  position?: [number, number, number];
  color?: string;
  scale?: number;
}

export function Nebula({
  count = 2000,
  position = [0, 0, 0],
  color = '#4f46e5',
  scale = 1,
}: NebulaProps) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = (Math.random() * 15 + 5) * scale;

      positions[i3] =
        r * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 5;
      positions[i3 + 1] =
        r * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 5;
      positions[i3 + 2] = r * Math.cos(phi) + (Math.random() - 0.5) * 5;

      sizes[i] = Math.random() * 3 + 1;
    }

    return [positions, sizes];
  }, [count, scale]);

  useFrame(state => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[positions, 3]} />
        <bufferAttribute attach='attributes-size' args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
