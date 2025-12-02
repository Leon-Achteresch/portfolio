'use client';

import { useEffect, useRef, useState } from 'react';
import { GalaxyScene, SectionOverlay, NavigationDots, ContentSections, sections } from '@/components/galaxy';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 0.99);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (index: number) => {
    if (!containerRef.current) return;
    const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = (index / sections.length) * scrollHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-[#030712] flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto relative">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" />
                  <div className="absolute inset-2 rounded-full border-2 border-cyan-500/50 animate-pulse" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-spin" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    
                  </div>
                </div>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              >
                Initialisiere Galaxie...
              </motion.h2>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="w-48 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GalaxyScene scrollProgress={scrollProgress} />

      <SectionOverlay scrollProgress={scrollProgress} />
      <NavigationDots scrollProgress={scrollProgress} onNavigate={navigateToSection} />

      <div ref={containerRef} className="relative">
        <ContentSections />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
