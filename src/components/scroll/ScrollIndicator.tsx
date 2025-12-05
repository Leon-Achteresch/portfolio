'use client';

import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  scrollProgress: number;
}

export function ScrollIndicator({ scrollProgress }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className='fixed bottom-8 left-1/2 -translate-x-1/2 z-20'
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className='flex flex-col items-center gap-3 text-white/60'
      >
        <div className='px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10'>
          <span className='text-xs font-mono uppercase tracking-widest'>
            Scrolle um die Galaxie zu erkunden
          </span>
        </div>
        <div className='w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2 bg-black/20 backdrop-blur-sm'>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className='w-1.5 h-1.5 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400'
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
