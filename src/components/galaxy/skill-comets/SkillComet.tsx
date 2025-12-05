'use client';

import { Html, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { type Skill } from '../constants';

interface SkillCometProps {
  skill: Skill;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  orbitTilt: number;
  planetPosition: [number, number, number];
}

function SkillCometInner({
  skill,
  orbitRadius,
  orbitSpeed,
  orbitOffset,
  orbitTilt,
  planetPosition,
}: SkillCometProps) {
  const groupRef = useRef<THREE.Group>(null);
  const spriteRef = useRef<THREE.Sprite>(null);
  const [hovered, setHovered] = useState(false);

  const texture = useTexture(skill.icon);

  const trailPositions = useMemo(() => {
    const positions = new Float32Array(30 * 3);
    return positions;
  }, []);

  const trailOpacities = useMemo(() => {
    const opacities = new Float32Array(30);
    for (let i = 0; i < 30; i++) {
      opacities[i] = 1 - i / 30;
    }
    return opacities;
  }, []);

  useFrame(state => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime * orbitSpeed + orbitOffset;

    const x = planetPosition[0] + Math.cos(time) * orbitRadius;
    const baseY = planetPosition[1] + Math.sin(time * 0.5) * 2;
    const z = planetPosition[2] + Math.sin(time) * orbitRadius;

    const tiltedY = baseY + Math.sin(time) * orbitRadius * Math.sin(orbitTilt);

    groupRef.current.position.set(x, tiltedY, z);

    if (spriteRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
      const baseScale = hovered ? 2 : 1.5;
      const scale = baseScale * pulse;
      spriteRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group ref={groupRef}>
      <sprite
        ref={spriteRef}
        scale={[1.5, 1.5, 1]}
        renderOrder={10}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <spriteMaterial
          map={texture}
          transparent
          opacity={hovered ? 1 : 0.95}
          depthTest={false}
          depthWrite={false}
        />
      </sprite>

      <pointLight
        color={hovered ? '#10b981' : '#22d3ee'}
        intensity={hovered ? 3 : 1}
        distance={5}
      />

      <mesh scale={[1, 1, 1]} renderOrder={5}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color={hovered ? '#10b981' : '#22d3ee'}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      <points renderOrder={1}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            args={[trailPositions, 3]}
          />
          <bufferAttribute
            attach='attributes-opacity'
            args={[trailOpacities, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color='#22d3ee'
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {hovered && (
        <Html
          position={[0, 1.8, 0]}
          center
          distanceFactor={8}
          style={{
            transition: 'all 0.2s ease',
            opacity: hovered ? 1 : 0,
            transform: `scale(${hovered ? 1 : 0.5})`,
            pointerEvents: 'none',
          }}
        >
          <div className='px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 backdrop-blur-md border border-white/20 shadow-xl shadow-emerald-500/30'>
            <span className='text-white font-bold text-sm whitespace-nowrap tracking-wide'>
              {skill.label}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

export function SkillComet(props: SkillCometProps) {
  return (
    <Suspense fallback={null}>
      <SkillCometInner {...props} />
    </Suspense>
  );
}
