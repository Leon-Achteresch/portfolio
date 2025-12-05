'use client';

import { ContactButton } from '@/components/contact';
import {
  GalaxyScene,
  NavigationDots,
  ProjectDialog,
  SectionOverlay,
  sections,
} from '@/components/galaxy';
import { LoadingScreen } from '@/components/loading';
import { ScrollIndicator } from '@/components/scroll';
import { Project } from '@/types/project';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const scrollHeight =
        containerRef.current.scrollHeight - window.innerHeight;
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

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      <GalaxyScene
        scrollProgress={scrollProgress}
        onProjectSelect={handleProjectSelect}
      />

      <ContactButton />

      <SectionOverlay scrollProgress={scrollProgress} />
      <NavigationDots
        scrollProgress={scrollProgress}
        onNavigate={navigateToSection}
      />

      <div
        ref={containerRef}
        className='relative'
        style={{ height: '1500vh', pointerEvents: 'none' }}
      />

      <ScrollIndicator scrollProgress={scrollProgress} />

      <ProjectDialog project={selectedProject} onClose={handleCloseProject} />
    </>
  );
}
