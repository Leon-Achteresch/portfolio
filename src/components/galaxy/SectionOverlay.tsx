'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { sections } from './GalaxyScene';

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
    <div className="fixed top-8 left-8 z-20 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: currentSection.planetColor }}
          />
          <span className="text-sm font-mono uppercase tracking-widest text-white/60">
            {currentSection.name}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
