'use client';

import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface ProfileHologramProps {
  position: [number, number, number];
}

export function ProfileHologram({ position }: ProfileHologramProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const texture = useTexture('/image.png');
  texture.colorSpace = THREE.SRGBColorSpace;

  const hologramMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        time: { value: 0 },
        hovered: { value: 0 },
        glowColor: { value: new THREE.Color('#3b82f6') },
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

          float scanLine = sin(vUv.y * 60.0 + time * 2.0) * 0.015;
          float flicker = 0.98 + sin(time * 12.0) * 0.01;

          float edgeGlow = 1.0 - smoothstep(0.0, 0.15, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));

          vec3 hologramColor = mix(texColor.rgb, glowColor, 0.05 + hovered * 0.05);
          hologramColor += scanLine;
          hologramColor *= flicker;
          hologramColor += glowColor * edgeGlow * (0.3 + hovered * 0.2);

          float alpha = 0.95;

          gl_FragColor = vec4(hologramColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [texture]);

  useFrame(state => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = state.clock.elapsedTime;
        material.uniforms.hovered.value = hovered ? 1.0 : 0.0;
      }
    }

    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <planeGeometry args={[4.4, 4.4]} />
        <meshBasicMaterial
          color={hovered ? '#60a5fa' : '#3b82f6'}
          transparent
          opacity={hovered ? 0.4 : 0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={meshRef}
        material={hologramMaterial}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[4, 4]} />
      </mesh>

      <mesh position={[-2.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.1, 4.2]} />
        <meshBasicMaterial color='#3b82f6' transparent opacity={0.8} />
      </mesh>
      <mesh position={[2.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.1, 4.2]} />
        <meshBasicMaterial color='#3b82f6' transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 2.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 0.1]} />
        <meshBasicMaterial color='#3b82f6' transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -2.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 0.1]} />
        <meshBasicMaterial color='#3b82f6' transparent opacity={0.8} />
      </mesh>

      {[-2.05, 2.05].map(x =>
        [-2.05, 2.05].map(y => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.02]}>
            <circleGeometry args={[0.1, 8]} />
            <meshBasicMaterial color='#60a5fa' transparent opacity={0.9} />
          </mesh>
        ))
      )}

      <pointLight color='#3b82f6' intensity={2} distance={10} />
    </group>
  );
}
