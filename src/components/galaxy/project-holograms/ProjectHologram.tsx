'use client';

import { Project } from '@/types/project';
import { Html, useTexture } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface ProjectHologramProps {
  project: Project;
  angle: number;
  radius: number;
  planetPosition: [number, number, number];
  index: number;
  onSelect: () => void;
  totalProjects: number;
}

function ProjectHologramInner({
  project,
  angle,
  radius,
  planetPosition,
  index,
  onSelect,
}: ProjectHologramProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const texture = useTexture(`/${project.image}`);
  texture.colorSpace = THREE.SRGBColorSpace;

  const baseAngle = useRef(angle);

  useFrame(state => {
    if (!groupRef.current) return;

    const rotationSpeed = 0.015;
    const currentAngle =
      baseAngle.current + state.clock.elapsedTime * rotationSpeed;

    const x = planetPosition[0] + Math.cos(currentAngle) * radius;
    const y = planetPosition[1] + Math.sin(currentAngle * 0.2) * 0.5;
    const z = planetPosition[2] + Math.sin(currentAngle) * radius;

    groupRef.current.position.set(x, y, z);

    groupRef.current.rotation.y = currentAngle + Math.PI / 2;

    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.02;

    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = state.clock.elapsedTime;
        material.uniforms.hovered.value = hovered ? 1.0 : 0.0;
      }
    }

    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + index) * 0.1 + 1;
      const scale = hovered ? 1.08 * pulse : 1.02 * pulse;
      glowRef.current.scale.setScalar(scale);
    }
  });

  const hologramMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        time: { value: 0 },
        hovered: { value: 0 },
        glowColor: { value: new THREE.Color('#8b5cf6') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float time;
        uniform float hovered;
        uniform vec3 glowColor;
        varying vec2 vUv;

        void main() {
          vec4 texColor = texture2D(map, vUv);

          float scanLine = sin(vUv.y * 80.0 + time * 3.0) * 0.02;
          float scanBand = smoothstep(0.0, 0.03, abs(sin(vUv.y * 8.0 - time * 1.5)));

          float flicker = 0.97 + sin(time * 15.0) * 0.015 + sin(time * 27.0) * 0.01;

          float edgeGlow = 1.0 - smoothstep(0.0, 0.1, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));

          vec3 hologramColor = mix(texColor.rgb, glowColor, 0.1 + hovered * 0.05);
          hologramColor += scanLine;
          hologramColor *= scanBand * 0.05 + 0.95;
          hologramColor *= flicker;
          hologramColor += glowColor * edgeGlow * (0.2 + hovered * 0.3);

          float alpha = 0.92 + hovered * 0.08;

          gl_FragColor = vec4(hologramColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [texture]);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelect();
    },
    [onSelect]
  );

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef} position={[0, 0, -0.08]} renderOrder={index}>
        <planeGeometry args={[6.4, 4.2]} />
        <meshBasicMaterial
          color={hovered ? '#a855f7' : '#7c3aed'}
          transparent
          opacity={hovered ? 0.5 : 0.25}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={meshRef}
        material={hologramMaterial}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        renderOrder={index + 100}
      >
        <planeGeometry args={[6, 3.8]} />
      </mesh>

      <mesh position={[-3.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.15, 4]} />
        <meshBasicMaterial color='#8b5cf6' transparent opacity={0.7} />
      </mesh>
      <mesh position={[3.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.15, 4]} />
        <meshBasicMaterial color='#8b5cf6' transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 2.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.3, 0.15]} />
        <meshBasicMaterial color='#8b5cf6' transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -2.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.3, 0.15]} />
        <meshBasicMaterial color='#8b5cf6' transparent opacity={0.7} />
      </mesh>

      {[-3.05, 3.05].map(x =>
        [-2, 2].map(y => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.03]}>
            <circleGeometry args={[0.12, 8]} />
            <meshBasicMaterial color='#a855f7' transparent opacity={0.95} />
          </mesh>
        ))
      )}

      <pointLight
        color={hovered ? '#c084fc' : '#8b5cf6'}
        intensity={hovered ? 3 : 1.2}
        distance={12}
      />

      <Html
        position={[0, -2.6, 0]}
        center
        distanceFactor={15}
        style={{ pointerEvents: 'none' }}
      >
        <div className='text-center'>
          <div className='px-4 py-2 rounded-lg bg-gradient-to-r from-purple-900/90 to-violet-900/90 backdrop-blur-sm border border-purple-500/30 shadow-lg'>
            <h3 className='text-white font-bold text-sm whitespace-nowrap'>
              {project.title}
            </h3>
            <div className='flex items-center justify-center gap-2 mt-1'>
              <span
                className={`
                w-2 h-2 rounded-full
                ${
                  project.status === 'active'
                    ? 'bg-green-500'
                    : project.status === 'completed'
                    ? 'bg-blue-500'
                    : 'bg-yellow-500'
                }
              `}
              />
              <span className='text-purple-300/80 text-xs'>
                {project.status === 'active'
                  ? 'Aktiv'
                  : project.status === 'completed'
                  ? 'Fertig'
                  : 'Pausiert'}
              </span>
            </div>
          </div>
          <div className='mt-2 text-purple-400/60 text-xs font-mono'>
            Klicken für Details
          </div>
        </div>
      </Html>

      <group position={[0, 2.4, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.2, 0.15]} />
          <meshBasicMaterial
            color={hovered ? '#c084fc' : '#8b5cf6'}
            transparent
            opacity={0.9}
          />
        </mesh>
        <pointLight color='#a855f7' intensity={0.6} distance={3} />
      </group>
    </group>
  );
}

export function ProjectHologram(props: ProjectHologramProps) {
  return (
    <Suspense fallback={null}>
      <ProjectHologramInner {...props} />
    </Suspense>
  );
}
