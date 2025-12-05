'use client';

import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface FloatingInfoPanelProps {
  position: [number, number, number];
}

export function FloatingInfoPanel({ position }: FloatingInfoPanelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(state => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html center distanceFactor={15} style={{ pointerEvents: 'auto' }}>
        <div className='w-[450px] select-none'>
          <div className='bg-gradient-to-br from-slate-900/95 to-blue-950/95 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6 shadow-2xl shadow-blue-500/20'>
            <div className='flex items-center gap-3 mb-4'>
              <span className='w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse' />
              <span className='text-sm text-blue-400 font-mono'>
                Bereit für neue Abenteuer
              </span>
            </div>

            <h1 className='text-3xl font-bold text-white mb-2'>
              Hallo, ich bin{' '}
              <span className='bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent'>
                Leon Achteresch
              </span>
            </h1>

            <p className='text-xl text-white/80 mb-1'>
              Full-Stack Software Entwickler
            </p>

            <p className='text-sm text-white/50 mb-6 leading-relaxed'>
              Ich entwickle moderne, skalierbare Webanwendungen mit Fokus auf
              Benutzerfreundlichkeit und Performance. Spezialisiert auf React,
              Next.js und TypeScript.
            </p>

            <div className='flex gap-3 mb-6'>
              <a
                href='/CV.pdf'
                target='_blank'
                className='px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow flex items-center gap-2'
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
                    d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
                Lebenslauf
              </a>
              <a
                href='mailto:leon.achteresch@gmail.com'
                className='px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-colors flex items-center gap-2'
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
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                Kontakt
              </a>
            </div>

            <div className='flex items-center gap-4'>
              <a
                href='https://github.com/Leon-Achteresch'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all group'
              >
                <svg
                  className='w-5 h-5 text-white/60 group-hover:text-blue-400 transition-colors'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                </svg>
              </a>
              <a
                href='https://www.linkedin.com/in/leon-achteresch-b2a7472aa/'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all group'
              >
                <svg
                  className='w-5 h-5 text-white/60 group-hover:text-blue-400 transition-colors'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
              </a>
              <a
                href='mailto:leon.achteresch@gmail.com'
                className='p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all group'
              >
                <svg
                  className='w-5 h-5 text-white/60 group-hover:text-blue-400 transition-colors'
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
              </a>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
