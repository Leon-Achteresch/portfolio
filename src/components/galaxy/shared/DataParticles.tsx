'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface DataParticlesProps {
  planetPosition: [number, number, number];
  planetSize: number;
  particleCount?: number;
  color?: string;
  rotationSpeed?: number;
}

export function DataParticles({
  planetPosition,
  planetSize,
  particleCount = 200,
  color = '#60a5fa',
  rotationSpeed = 0.002,
}: DataParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = planetSize * 2 + Math.random() * 8;
      const height = (Math.random() - 0.5) * 6;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [planetSize, particleCount]);

  useFrame(() => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const angle = Math.atan2(positions[idx + 2], positions[idx]);
      const radius = Math.sqrt(positions[idx] ** 2 + positions[idx + 2] ** 2);
      const newAngle = angle + rotationSpeed;

      positions[idx] = Math.cos(newAngle) * radius;
      positions[idx + 2] = Math.sin(newAngle) * radius;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} position={planetPosition}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
