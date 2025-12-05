'use client';

import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='fixed inset-0 z-50 bg-[#030712] flex items-center justify-center'
    >
      <div className='text-center'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='mb-8'
        >
          <div className='w-24 h-24 mx-auto relative'>
            <div className='absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping' />
            <div className='absolute inset-2 rounded-full border-2 border-cyan-500/50 animate-pulse' />
            <div
              className='absolute inset-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-spin'
              style={{ animationDuration: '3s' }}
            />
            <div className='absolute inset-0 flex items-center justify-center' />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'
        >
          Initialisiere Galaxie...
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className='w-48 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto'
        />
      </div>
    </motion.div>
  );
}
