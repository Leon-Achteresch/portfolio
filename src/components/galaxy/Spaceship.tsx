'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface SpaceshipProps {
  targetPosition: [number, number, number];
  targetRotation?: [number, number, number];
}

export function Spaceship({
  targetPosition,
  targetRotation = [0, 0, 0],
}: SpaceshipProps) {
  const groupRef = useRef<THREE.Group>(null);
  const engineGlowRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);

  const currentPosition = useRef(new THREE.Vector3(0, 0, 10));
  const currentRotation = useRef(new THREE.Euler(0, 0, 0));
  const velocity = useRef(new THREE.Vector3());

  const trailPositions = useMemo(() => {
    const positions = new Float32Array(150);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = i * 0.5;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const target = new THREE.Vector3(...targetPosition);
    const direction = target.clone().sub(currentPosition.current);
    const distance = direction.length();

    if (distance > 0.1) {
      direction.normalize();
      const speed = Math.min(distance * 2, 8) * delta;
      velocity.current.lerp(direction.multiplyScalar(speed), 0.1);
      currentPosition.current.add(velocity.current);
    }

    const targetRot = new THREE.Euler(...targetRotation);
    currentRotation.current.x +=
      (targetRot.x - currentRotation.current.x) * 0.05;
    currentRotation.current.y +=
      (targetRot.y - currentRotation.current.y) * 0.05;
    currentRotation.current.z +=
      (targetRot.z - currentRotation.current.z) * 0.05;

    const wobble = Math.sin(state.clock.elapsedTime * 3) * 0.02;
    const sway = Math.cos(state.clock.elapsedTime * 2) * 0.015;

    groupRef.current.position.copy(currentPosition.current);
    groupRef.current.position.y += wobble;
    groupRef.current.position.x += sway;
    groupRef.current.rotation.copy(currentRotation.current);

    if (engineGlowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 10) * 0.3 + 1;
      engineGlowRef.current.scale.setScalar(pulse);
    }

    if (trailRef.current) {
      const positions = trailRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 49; i > 0; i--) {
        positions[i * 3] = positions[(i - 1) * 3];
        positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
        positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
      }
      positions[0] = currentPosition.current.x;
      positions[1] = currentPosition.current.y;
      positions[2] = currentPosition.current.z;
      trailRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh>
          <boxGeometry args={[0.8, 0.3, 2]} />
          <meshStandardMaterial
            color='#1e293b'
            emissive='#3b82f6'
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0.2, -0.3]}>
          <boxGeometry args={[0.3, 0.15, 0.5]} />
          <meshStandardMaterial
            color='#0f172a'
            emissive='#60a5fa'
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        <mesh position={[-0.5, 0, 0.3]}>
          <boxGeometry args={[0.6, 0.1, 0.8]} />
          <meshStandardMaterial
            color='#1e293b'
            emissive='#3b82f6'
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0.5, 0, 0.3]}>
          <boxGeometry args={[0.6, 0.1, 0.8]} />
          <meshStandardMaterial
            color='#1e293b'
            emissive='#3b82f6'
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        <mesh ref={engineGlowRef} position={[0, 0, 1.2]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color='#60a5fa' transparent opacity={0.8} />
        </mesh>

        <pointLight
          position={[0, 0, 1.5]}
          color='#60a5fa'
          intensity={3}
          distance={5}
        />

        <pointLight
          position={[0, 0, -1]}
          color='#3b82f6'
          intensity={1}
          distance={3}
        />
      </group>

      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            args={[trailPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color='#60a5fa'
          size={0.1}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </>
  );
}
