'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface SpaceshipProps {
  targetPosition: [number, number, number];
  targetRotation?: [number, number, number];
}

useGLTF.preload('/models/xwing_lp.glb');

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

  const { scene } = useGLTF('/models/xwing_lp.glb');

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#1e293b',
          emissive: '#3b82f6',
          emissiveIntensity: 0.15,
          metalness: 0.9,
          roughness: 0.2,
        });
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    return () => {
      clonedScene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });
    };
  }, [clonedScene]);

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
        <primitive
          object={clonedScene}
          scale={2}
          rotation={[0, Math.PI, 0]}
        />

        <mesh ref={engineGlowRef} position={[0, 0, 0.8]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color='#60a5fa' transparent opacity={0.8} />
        </mesh>

        <pointLight
          position={[0, 0, 1]}
          color='#60a5fa'
          intensity={3}
          distance={5}
        />

        <pointLight
          position={[0, 0, -0.5]}
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
