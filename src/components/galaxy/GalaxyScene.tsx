'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Stars } from './Stars';
import { Nebula } from './Nebula';
import { Planet } from './Planet';
import { Spaceship } from './Spaceship';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Section {
  id: string;
  name: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  planetColor: string;
  planetEmissive: string;
  size: number;
  hasRing: boolean;
}

const sections: Section[] = [
  {
    id: 'hero',
    name: 'Start',
    position: [0, 0, 0],
    cameraPosition: [0, 2, 12],
    planetColor: '#3b82f6',
    planetEmissive: '#1d4ed8',
    size: 3,
    hasRing: true,
  },
  {
    id: 'skills',
    name: 'Skills',
    position: [-25, 5, -40],
    cameraPosition: [-25, 7, -30],
    planetColor: '#10b981',
    planetEmissive: '#059669',
    size: 4,
    hasRing: false,
  },
  {
    id: 'projects',
    name: 'Projekte',
    position: [30, -8, -80],
    cameraPosition: [30, -6, -70],
    planetColor: '#8b5cf6',
    planetEmissive: '#7c3aed',
    size: 5,
    hasRing: true,
  },
  {
    id: 'about',
    name: 'Über mich',
    position: [-15, 10, -130],
    cameraPosition: [-15, 12, -120],
    planetColor: '#f59e0b',
    planetEmissive: '#d97706',
    size: 3.5,
    hasRing: false,
  },
];

function Scene({ scrollProgress }: { scrollProgress: number }) {
  const currentIndex = Math.min(
    Math.floor(scrollProgress * sections.length),
    sections.length - 1
  );
  const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
  const localProgress = (scrollProgress * sections.length) % 1;

  const currentSection = sections[currentIndex];
  const nextSection = sections[nextIndex];

  const spaceshipPosition: [number, number, number] = [
    THREE.MathUtils.lerp(currentSection.cameraPosition[0], nextSection.cameraPosition[0], localProgress) + 2,
    THREE.MathUtils.lerp(currentSection.cameraPosition[1], nextSection.cameraPosition[1], localProgress) - 1,
    THREE.MathUtils.lerp(currentSection.cameraPosition[2], nextSection.cameraPosition[2], localProgress) - 3,
  ];

  const cameraPosition: [number, number, number] = [
    THREE.MathUtils.lerp(currentSection.cameraPosition[0], nextSection.cameraPosition[0], localProgress),
    THREE.MathUtils.lerp(currentSection.cameraPosition[1], nextSection.cameraPosition[1], localProgress),
    THREE.MathUtils.lerp(currentSection.cameraPosition[2], nextSection.cameraPosition[2], localProgress),
  ];

  const lookAtPosition: [number, number, number] = [
    THREE.MathUtils.lerp(currentSection.position[0], nextSection.position[0], localProgress),
    THREE.MathUtils.lerp(currentSection.position[1], nextSection.position[1], localProgress),
    THREE.MathUtils.lerp(currentSection.position[2], nextSection.position[2], localProgress),
  ];

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={60}
        near={0.1}
        far={1000}
      />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      <Stars count={8000} radius={200} />

      <Nebula position={[-20, 10, -30]} color="#4f46e5" scale={2} count={3000} />
      <Nebula position={[40, -15, -60]} color="#7c3aed" scale={1.5} count={2000} />
      <Nebula position={[-30, 5, -100]} color="#ec4899" scale={2.5} count={2500} />
      <Nebula position={[20, 20, -140]} color="#06b6d4" scale={1.8} count={2000} />

      {sections.map((section) => (
        <Planet
          key={section.id}
          position={section.position}
          size={section.size}
          color={section.planetColor}
          emissiveColor={section.planetEmissive}
          hasRing={section.hasRing}
          ringColor={section.planetColor}
        />
      ))}

      <Spaceship
        targetPosition={spaceshipPosition}
        targetRotation={[0, Math.PI + localProgress * 0.5, 0]}
      />

      <Environment preset="night" />

      <fog attach="fog" args={['#030712', 30, 200]} />
    </>
  );
}

interface GalaxySceneProps {
  scrollProgress: number;
}

export function GalaxyScene({ scrollProgress }: GalaxySceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#030712]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export { sections };
