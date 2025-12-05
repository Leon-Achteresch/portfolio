'use client';

import { Suspense } from 'react';
import { DataParticles, OrbitRing } from '../shared';
import { FloatingInfoPanel } from './FloatingInfoPanel';

interface HeroStationProps {
  planetPosition: [number, number, number];
  planetSize: number;
}

function HeroStationInner({ planetPosition, planetSize }: HeroStationProps) {
  const infoOffset: [number, number, number] = [
    planetPosition[0] + 3.5,
    planetPosition[1] + 0.5,
    planetPosition[2] + 6,
  ];

  return (
    <group>
      <FloatingInfoPanel position={infoOffset} />

      <DataParticles
        planetPosition={planetPosition}
        planetSize={planetSize}
        particleCount={200}
        color='#60a5fa'
        rotationSpeed={0.002}
      />

      <OrbitRing
        planetPosition={planetPosition}
        radius={planetSize * 2}
        color='#3b82f6'
        opacity={0.15}
      />
      <OrbitRing
        planetPosition={planetPosition}
        radius={planetSize * 2.8}
        color='#06b6d4'
        opacity={0.1}
      />
    </group>
  );
}

export function HeroStation(props: HeroStationProps) {
  return (
    <Suspense fallback={null}>
      <HeroStationInner {...props} />
    </Suspense>
  );
}
