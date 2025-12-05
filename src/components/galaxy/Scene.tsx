'use client';

import { smoothstep } from '@/lib/math';
import { Project } from '@/types/project';
import { Environment } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Nebula } from './Nebula';
import { Planet } from './Planet';
import { Spaceship } from './Spaceship';
import { Stars } from './Stars';
import { planets } from './constants/planets';
import { sections } from './constants/sections';
import { ContactStation } from './contact-station';
import { HeroStation } from './hero-station';
import { ProjectHolograms } from './project-holograms';
import { SkillComets } from './skill-comets';

interface SceneProps {
  scrollProgress: number;
  onProjectSelect?: (project: Project) => void;
}

function CameraController({
  cameraPosition,
  lookAtPosition,
}: {
  cameraPosition: [number, number, number];
  lookAtPosition: [number, number, number];
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...cameraPosition));
  const targetLookAt = useRef(new THREE.Vector3(...lookAtPosition));

  useEffect(() => {
    targetPos.current.set(...cameraPosition);
    targetLookAt.current.set(...lookAtPosition);
  }, [cameraPosition, lookAtPosition]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.1);
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    currentLookAt.lerp(targetLookAt.current, 0.1);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

export function Scene({ scrollProgress, onProjectSelect }: SceneProps) {
  const currentIndex = Math.min(
    Math.floor(scrollProgress * sections.length),
    sections.length - 1
  );
  const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
  const rawProgress = (scrollProgress * sections.length) % 1;
  const localProgress = smoothstep(0, 1, rawProgress);

  const currentSection = sections[currentIndex];
  const nextSection = sections[nextIndex];

  const spaceshipPosition: [number, number, number] = [
    THREE.MathUtils.lerp(
      currentSection.cameraPosition[0],
      nextSection.cameraPosition[0],
      localProgress
    ) + 2.5,
    THREE.MathUtils.lerp(
      currentSection.cameraPosition[1],
      nextSection.cameraPosition[1],
      localProgress
    ) - 1.5,
    THREE.MathUtils.lerp(
      currentSection.cameraPosition[2],
      nextSection.cameraPosition[2],
      localProgress
    ) - 4,
  ];

  const cameraPosition: [number, number, number] = [
    THREE.MathUtils.lerp(
      currentSection.cameraPosition[0],
      nextSection.cameraPosition[0],
      localProgress
    ),
    THREE.MathUtils.lerp(
      currentSection.cameraPosition[1],
      nextSection.cameraPosition[1],
      localProgress
    ),
    THREE.MathUtils.lerp(
      currentSection.cameraPosition[2],
      nextSection.cameraPosition[2],
      localProgress
    ),
  ];

  const lookAtPosition: [number, number, number] = [
    THREE.MathUtils.lerp(
      currentSection.position[0],
      nextSection.position[0],
      localProgress
    ),
    THREE.MathUtils.lerp(
      currentSection.position[1],
      nextSection.position[1],
      localProgress
    ),
    THREE.MathUtils.lerp(
      currentSection.position[2],
      nextSection.position[2],
      localProgress
    ),
  ];

  const direction = new THREE.Vector3(
    lookAtPosition[0] - cameraPosition[0],
    lookAtPosition[1] - cameraPosition[1],
    lookAtPosition[2] - cameraPosition[2]
  ).normalize();

  const rotationY = Math.atan2(direction.x, direction.z);
  const rotationX = -Math.asin(direction.y) * 0.3;

  return (
    <>
      <CameraController
        cameraPosition={cameraPosition}
        lookAtPosition={lookAtPosition}
      />

      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[0, 50, -50]} intensity={0.3} color='#60a5fa' />

      <Stars count={12000} radius={300} />

      <Nebula
        position={[-20, 10, -30]}
        color='#4f46e5'
        scale={2.5}
        count={4000}
      />
      <Nebula
        position={[40, -15, -60]}
        color='#7c3aed'
        scale={2}
        count={3000}
      />
      <Nebula
        position={[-30, 5, -100]}
        color='#ec4899'
        scale={3}
        count={3500}
      />
      <Nebula
        position={[20, 20, -140]}
        color='#06b6d4'
        scale={2.2}
        count={2500}
      />
      <Nebula
        position={[50, 5, -20]}
        color='#22c55e'
        scale={1.5}
        count={2000}
      />
      <Nebula
        position={[-50, -10, -70]}
        color='#f97316'
        scale={1.8}
        count={2200}
      />

      {planets.map(planet => (
        <Planet
          key={planet.id}
          position={planet.position}
          size={planet.size}
          color={planet.planetColor}
          emissiveColor={planet.planetEmissive}
          hasRing={planet.hasRing}
          ringColor={planet.planetColor}
        />
      ))}

      <HeroStation
        planetPosition={planets[0].position}
        planetSize={planets[0].size}
      />

      <SkillComets
        planetPosition={planets[1].position}
        planetSize={planets[1].size}
      />

      <ProjectHolograms
        planetPosition={planets[2].position}
        planetSize={planets[2].size}
        onProjectSelect={onProjectSelect}
      />

      <ContactStation
        planetPosition={planets[3].position}
        planetSize={planets[3].size}
      />

      <Spaceship
        targetPosition={spaceshipPosition}
        targetRotation={[rotationX, rotationY + Math.PI, 0]}
      />

      <Environment preset='night' />

      <fog attach='fog' args={['#030712', 50, 250]} />
    </>
  );
}
