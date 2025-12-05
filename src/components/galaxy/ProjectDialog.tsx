'use client';

import { Project } from '@/types/project';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          onClick={onClose}
        >
          <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-purple-950/98 to-violet-950/98 backdrop-blur-xl border border-purple-500/40 shadow-2xl shadow-purple-500/30'
            onClick={e => e.stopPropagation()}
            style={{ pointerEvents: 'auto' }}
          >
            <div className='relative'>
              <img
                src={`/${project.image}`}
                alt={project.title}
                className='w-full h-56 object-cover rounded-t-2xl'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/50 to-transparent' />

              <button
                onClick={onClose}
                className='absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 hover:scale-110 transition-all cursor-pointer'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>

              <div className='absolute bottom-4 left-6 right-6'>
                <h2 className='text-3xl font-bold text-white mb-2'>
                  {project.title}
                </h2>
                <p className='text-purple-200/80 text-base'>
                  {project.description}
                </p>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='p-4 rounded-xl bg-white/5 border border-white/10 text-center'>
                  <div className='text-purple-400 text-sm mb-1'>Status</div>
                  <div
                    className={`font-semibold ${
                      project.status === 'active'
                        ? 'text-green-400'
                        : project.status === 'completed'
                        ? 'text-blue-400'
                        : 'text-yellow-400'
                    }`}
                  >
                    {project.status === 'active'
                      ? 'Aktiv'
                      : project.status === 'completed'
                      ? 'Fertig'
                      : 'Pausiert'}
                  </div>
                </div>
                <div className='p-4 rounded-xl bg-white/5 border border-white/10 text-center'>
                  <div className='text-purple-400 text-sm mb-1'>Team</div>
                  <div className='font-semibold text-white'>
                    {project.teamSize} Person{project.teamSize > 1 ? 'en' : ''}
                  </div>
                </div>
                <div className='p-4 rounded-xl bg-white/5 border border-white/10 text-center'>
                  <div className='text-purple-400 text-sm mb-1'>Dauer</div>
                  <div className='font-semibold text-white'>
                    {project.duration}
                  </div>
                </div>
              </div>

              <div>
                <h3 className='text-white font-semibold mb-3'>Beschreibung</h3>
                <p className='text-purple-200/80 leading-relaxed'>
                  {project.content}
                </p>
              </div>

              <div>
                <h3 className='text-white font-semibold mb-3'>Tech Stack</h3>
                <div className='flex flex-wrap gap-2'>
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className='px-4 py-1.5 text-sm rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='text-white font-semibold mb-3'>Features</h3>
                <ul className='space-y-2'>
                  {project.features.map(feature => (
                    <li
                      key={feature}
                      className='flex items-start gap-3 text-purple-200/80'
                    >
                      <span className='w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='flex gap-4 pt-2'>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                    </svg>
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium text-center hover:from-purple-500 hover:to-violet-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
