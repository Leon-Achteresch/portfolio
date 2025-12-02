'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Ring, Text } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  emissiveColor?: string;
  name?: string;
  hasRing?: boolean;
  ringColor?: string;
  rotationSpeed?: number;
}

export function Planet({
  position,
  size = 2,
  color = '#3b82f6',
  emissiveColor = '#1d4ed8',
  name,
  hasRing = false,
  ringColor = '#60a5fa',
  rotationSpeed = 0.3,
}: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002 * rotationSpeed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.001;
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <Sphere ref={glowRef} args={[size * 1.3, 32, 32]}>
        <meshBasicMaterial
          color={emissiveColor}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      <Sphere ref={planetRef} args={[size, 64, 64]}>
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={0.3}
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>

      {hasRing && (
        <Ring
          ref={ringRef}
          args={[size * 1.4, size * 2.2, 64]}
          rotation={[Math.PI / 2.5, 0, 0]}
        >
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </Ring>
      )}

      {name && (
        <Text
          position={[0, size + 1.5, 0]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          {name}
        </Text>
      )}

      <pointLight
        position={[0, 0, 0]}
        color={emissiveColor}
        intensity={2}
        distance={size * 10}
      />
    </group>
  );
}
