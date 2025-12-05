'use client';

import { Project } from '@/types/project';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Scene } from './Scene';

interface GalaxySceneProps {
  scrollProgress: number;
  onProjectSelect?: (project: Project) => void;
}

export function GalaxyScene({
  scrollProgress,
  onProjectSelect,
}: GalaxySceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='fixed inset-0 bg-[#030712]'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0' style={{ zIndex: 1 }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{ fov: 65, near: 0.1, far: 1000, position: [2, 0, 18] }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'auto' }}
      >
        <Suspense fallback={null}>
          <Scene
            scrollProgress={scrollProgress}
            onProjectSelect={onProjectSelect}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
