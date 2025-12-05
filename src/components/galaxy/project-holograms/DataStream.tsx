'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface DataStreamProps {
  planetPosition: [number, number, number];
  planetSize: number;
}

export function DataStream({ planetPosition, planetSize }: DataStreamProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = planetSize * 2 + Math.random() * 15;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [planetSize]);

  useFrame(() => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const angle = Math.atan2(positions[idx + 2], positions[idx]);
      const radius = Math.sqrt(positions[idx] ** 2 + positions[idx + 2] ** 2);
      const newAngle = angle + 0.001;

      positions[idx] = Math.cos(newAngle) * radius;
      positions[idx + 2] = Math.sin(newAngle) * radius;

      positions[idx + 1] += 0.015;
      if (positions[idx + 1] > 5) positions[idx + 1] = -5;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} position={planetPosition}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color='#a855f7'
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
