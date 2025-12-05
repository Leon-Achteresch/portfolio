'use client';

import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface ContactPanelProps {
  position: [number, number, number];
}

export function ContactPanel({ position }: ContactPanelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(state => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html center distanceFactor={15} style={{ pointerEvents: 'auto' }}>
        <div className='w-[480px] select-none'>
          <div className='bg-gradient-to-br from-amber-950/95 to-orange-950/95 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-6 shadow-2xl shadow-amber-500/20'>
            <div className='text-center mb-6'>
              <h2 className='text-2xl font-bold text-white mb-2'>
                Lass uns{' '}
                <span className='bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent'>
                  zusammenarbeiten
                </span>
              </h2>

              <p className='text-sm text-white/60'>
                Hast du ein spannendes Projekt oder eine Idee? Ich freue mich
                auf deine Nachricht!
              </p>
            </div>

            <div className='space-y-3 mb-6'>
              <a
                href='mailto:leon.achteresch@gmail.com'
                className='flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group'
              >
                <div className='w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors'>
                  <svg
                    className='w-6 h-6 text-amber-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <div className='flex-1'>
                  <div className='text-white font-medium'>E-Mail</div>
                  <div className='text-amber-400/70 text-sm'>
                    leon.achteresch@gmail.com
                  </div>
                </div>
                <svg
                  className='w-5 h-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </a>

              <a
                href='https://github.com/Leon-Achteresch'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group'
              >
                <div className='w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors'>
                  <svg
                    className='w-6 h-6 text-amber-400'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                  </svg>
                </div>
                <div className='flex-1'>
                  <div className='text-white font-medium'>GitHub</div>
                  <div className='text-amber-400/70 text-sm'>
                    Leon-Achteresch
                  </div>
                </div>
                <svg
                  className='w-5 h-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </a>

              <a
                href='https://www.linkedin.com/in/leon-achteresch-b2a7472aa/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group'
              >
                <div className='w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors'>
                  <svg
                    className='w-6 h-6 text-amber-400'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                </div>
                <div className='flex-1'>
                  <div className='text-white font-medium'>LinkedIn</div>
                  <div className='text-amber-400/70 text-sm'>
                    leon-achteresch
                  </div>
                </div>
                <svg
                  className='w-5 h-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </a>
            </div>

            <a
              href='/CV.pdf'
              target='_blank'
              className='flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              Lebenslauf herunterladen
            </a>
          </div>
        </div>
      </Html>
    </group>
  );
}
