'use client';

import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface TimelineCardProps {
  position: [number, number, number];
}

export function TimelineCard({ position }: TimelineCardProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(state => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8 + 1) * 0.15;
    }
  });

  const timeline = [
    {
      year: '2022',
      title: 'Ausbildung Fachinformatiker',
      subtitle: 'Anwendungsentwicklung',
      current: false,
    },
    {
      year: '2025',
      title: 'Softwareentwickler',
      subtitle: 'Full-Stack Development',
      current: true,
    },
  ];

  return (
    <group ref={groupRef} position={position}>
      <Html center distanceFactor={15} style={{ pointerEvents: 'none' }}>
        <div className='w-[280px] select-none'>
          <div className='bg-slate-900/90 backdrop-blur-sm rounded-xl border border-amber-500/30 p-4 shadow-lg shadow-amber-500/10'>
            <h3 className='text-sm font-bold text-amber-400 mb-3'>Karriere</h3>
            <div className='space-y-3'>
              {timeline.map(item => (
                <div key={item.year} className='flex items-start gap-3'>
                  <div
                    className={`p-1.5 rounded-lg ${
                      item.current
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-white/5 text-white/50'
                    }`}
                  >
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <div>
                    <div className='flex items-center gap-2 mb-0.5'>
                      <span className='px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20'>
                        {item.year}
                      </span>
                      {item.current && (
                        <span className='flex items-center gap-1 text-[10px] text-green-400'>
                          <span className='w-1 h-1 rounded-full bg-green-500 animate-pulse' />
                          Aktuell
                        </span>
                      )}
                    </div>
                    <div className='text-white text-sm font-medium'>
                      {item.title}
                    </div>
                    <div className='text-amber-400/60 text-xs'>
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
