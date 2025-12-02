'use client';

import { motion } from 'framer-motion';
import { sections } from './GalaxyScene';

interface NavigationDotsProps {
  scrollProgress: number;
  onNavigate: (index: number) => void;
}

export function NavigationDots({ scrollProgress, onNavigate }: NavigationDotsProps) {
  const currentIndex = Math.min(
    Math.floor(scrollProgress * sections.length),
    sections.length - 1
  );

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => onNavigate(index)}
          className="group relative flex items-center justify-end gap-3"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-white/60 whitespace-nowrap">
            {section.name}
          </span>

          <div className="relative">
            <motion.div
              className="w-3 h-3 rounded-full border-2 transition-colors duration-300"
              style={{
                borderColor: currentIndex === index ? section.planetColor : 'rgba(255,255,255,0.3)',
                backgroundColor: currentIndex === index ? section.planetColor : 'transparent',
              }}
              animate={{
                scale: currentIndex === index ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: currentIndex === index ? Infinity : 0,
              }}
            />

            {currentIndex === index && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: section.planetColor }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
