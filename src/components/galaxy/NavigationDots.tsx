'use client';

import { motion } from 'framer-motion';
import { navigationSections, sections } from './constants';

interface NavigationDotsProps {
  scrollProgress: number;
  onNavigate: (index: number) => void;
}

export function NavigationDots({
  scrollProgress,
  onNavigate,
}: NavigationDotsProps) {
  const currentSectionIndex = Math.min(
    Math.floor(scrollProgress * sections.length),
    sections.length - 1
  );

  const getCurrentMainSection = () => {
    for (let i = navigationSections.length - 1; i >= 0; i--) {
      if (currentSectionIndex >= navigationSections[i].sectionIndex) {
        return i;
      }
    }
    return 0;
  };

  const currentMain = getCurrentMainSection();

  return (
    <div className='fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6'>
      {navigationSections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => onNavigate(section.sectionIndex)}
          className='group relative flex items-center justify-end gap-3'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className='opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-white/60 whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-sm'>
            {section.name}
          </span>

          <div className='relative'>
            <motion.div
              className='w-3 h-3 rounded-full border-2 transition-colors duration-300'
              style={{
                borderColor:
                  currentMain === index
                    ? section.color
                    : 'rgba(255,255,255,0.3)',
                backgroundColor:
                  currentMain === index ? section.color : 'transparent',
              }}
              animate={{
                scale: currentMain === index ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: currentMain === index ? Infinity : 0,
              }}
            />

            {currentMain === index && (
              <motion.div
                className='absolute inset-0 rounded-full'
                style={{ backgroundColor: section.color }}
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

      <div className='mt-4 flex flex-col items-center gap-1'>
        <div className='w-px h-16 bg-gradient-to-b from-white/20 to-transparent' />
        <span className='text-[10px] font-mono text-white/30 writing-mode-vertical'>
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </div>
  );
}
