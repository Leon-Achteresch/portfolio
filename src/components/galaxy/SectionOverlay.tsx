'use client';

import { motion } from 'framer-motion';
import { sections } from './constants';

interface SectionOverlayProps {
  scrollProgress: number;
}

export function SectionOverlay({ scrollProgress }: SectionOverlayProps) {
  const currentIndex = Math.min(
    Math.floor(scrollProgress * sections.length),
    sections.length - 1
  );
  const currentSection = sections[currentIndex];

  return (
    <div className='fixed top-8 left-8 z-20 pointer-events-none'>
      <motion.div
        className='mt-4 text-xs font-mono text-white/30'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className='inline-flex items-center gap-2'>
          <span className='w-1 h-1 rounded-full bg-cyan-500 animate-pulse' />
          {currentSection.name}
        </span>
      </motion.div>
    </div>
  );
}
