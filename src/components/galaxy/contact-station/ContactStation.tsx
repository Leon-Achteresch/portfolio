'use client';

import { Suspense } from 'react';
import { DataParticles, OrbitRing } from '../shared';
import { ContactPanel } from './ContactPanel';
import { TimelineCard } from './TimelineCard';

interface ContactStationProps {
  planetPosition: [number, number, number];
  planetSize: number;
}

function ContactStationInner({
  planetPosition,
  planetSize,
}: ContactStationProps) {
  const contactOffset: [number, number, number] = [
    planetPosition[0] + 5,
    planetPosition[1] + 1,
    planetPosition[2] + 8,
  ];

  const timelineOffset: [number, number, number] = [
    planetPosition[0] - 6,
    planetPosition[1] + 2,
    planetPosition[2] + 6,
  ];

  return (
    <group>
      <ContactPanel position={contactOffset} />
      <TimelineCard position={timelineOffset} />

      <DataParticles
        planetPosition={planetPosition}
        planetSize={planetSize}
        particleCount={250}
        color='#f59e0b'
        rotationSpeed={0.0015}
      />

      <OrbitRing
        planetPosition={planetPosition}
        radius={planetSize * 2.2}
        color='#f59e0b'
        opacity={0.15}
      />
      <OrbitRing
        planetPosition={planetPosition}
        radius={planetSize * 3}
        color='#f97316'
        opacity={0.1}
        tilt={0.3}
      />
    </group>
  );
}

export function ContactStation(props: ContactStationProps) {
  return (
    <Suspense fallback={null}>
      <ContactStationInner {...props} />
    </Suspense>
  );
}
