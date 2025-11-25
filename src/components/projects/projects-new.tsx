'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { Project } from '@/types/project';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, ExternalLink, Github, Users, X } from 'lucide-react';
import { cn } from '@/lib/utils';

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const isLarge = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer',
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      )}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />

      <div className="relative h-full rounded-2xl border border-white/[0.08] bg-card overflow-hidden transition-all duration-300 group-hover:border-transparent">
        <div className={cn('relative overflow-hidden', isLarge ? 'h-64 md:h-80' : 'h-48')}>
          <Image
            src={`/${project.image}`}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                project.status === 'active'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : project.status === 'completed'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              )}
            >
              {project.status === 'active' ? 'Aktiv' : project.status === 'completed' ? 'Abgeschlossen' : 'Pausiert'}
            </span>
          </div>

          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.content}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, isLarge ? 5 : 3).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > (isLarge ? 5 : 3) && (
              <span className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-muted-foreground">
                +{project.techStack.length - (isLarge ? 5 : 3)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-4 md:inset-8 z-50 flex items-center justify-center"
      >
        <div className="relative w-full max-w-5xl max-h-full bg-card border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-48 md:h-72 flex-shrink-0">
            <Image
              src={`/${project.image}`}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Start</p>
                  <p className="font-medium">{project.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Dauer</p>
                  <p className="font-medium">{project.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Team</p>
                  <p className="font-medium">{project.teamSize} Person{project.teamSize > 1 ? 'en' : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <div className={cn(
                  'w-3 h-3 rounded-full',
                  project.status === 'active' ? 'bg-green-500' : project.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                )} />
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{project.status}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-shadow"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader
            badge="Portfolio"
            title="Meine"
            highlight="Projekte"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-2xl bg-card border border-white/[0.08] overflow-hidden',
                  i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                )}
              >
                <div className={cn('bg-white/5 animate-pulse', i === 0 ? 'h-64 md:h-80' : 'h-48')} />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-white/5 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-white/5 rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-white/5 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" className="relative py-24 px-6">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />

        <div className="relative container mx-auto max-w-7xl">
          <SectionHeader
            badge="Portfolio"
            title="Meine"
            highlight="Projekte"
            description="Eine Auswahl meiner besten Arbeiten und Projekte"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
