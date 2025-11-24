'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Project } from '@/types/project';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Code2,
  ExternalLink,
  Github,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!project) return null;

  const statusColors = {
    active: 'bg-green-500',
    completed: 'bg-blue-500',
    'on-hold': 'bg-yellow-500',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50'
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='fixed inset-4 md:inset-8 z-50 flex items-center justify-center max-h-[90vh]'
          >
            <Card className='bg-background border-2 border-primary/20 shadow-2xl max-w-6xl w-full max-h-full flex flex-col overflow-hidden'>
              <div className='relative flex-shrink-0'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={onClose}
                  className='absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90'
                >
                  <X className='h-5 w-5' />
                </Button>

                <div className='relative h-48 md:h-64 w-full overflow-hidden'>
                  <Image
                    src={`/${project.image}`}
                    alt={project.title}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent' />
                  <div className='absolute bottom-4 left-4 right-16'>
                    <div className='flex items-center gap-3 mb-2'>
                      <h2 className='text-2xl md:text-3xl font-bold text-foreground'>
                        {project.title}
                      </h2>
                      <div
                        className={`h-3 w-3 rounded-full ${
                          statusColors[project.status]
                        }`}
                      />
                    </div>
                    <p className='text-muted-foreground text-sm md:text-base line-clamp-2'>
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className='overflow-y-auto flex-1 p-6 md:p-8 space-y-6'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5 text-primary' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Start</p>
                      <p className='font-semibold'>{project.startDate}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-5 w-5 text-primary' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Dauer</p>
                      <p className='font-semibold'>{project.duration}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='h-5 w-5 text-primary' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Team</p>
                      <p className='font-semibold'>
                        {project.teamSize} Person
                        {project.teamSize > 1 ? 'en' : ''}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Code2 className='h-5 w-5 text-primary' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Status</p>
                      <p className='font-semibold capitalize'>
                        {project.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='text-xl font-bold mb-3 text-foreground'>
                    Tech Stack
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {project.techStack.map(tech => (
                      <Badge
                        key={tech}
                        className='bg-primary/10 text-foreground border-primary/20'
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='text-xl font-bold mb-3 text-foreground'>
                    Features
                  </h3>
                  <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    {project.features.map(feature => (
                      <li
                        key={feature}
                        className='flex items-center gap-2 text-muted-foreground'
                      >
                        <div className='h-1.5 w-1.5 rounded-full bg-primary' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='flex flex-wrap gap-4 pt-4'>
                  {project.githubUrl && (
                    <Button asChild variant='outline' className='gap-2'>
                      <a
                        href={project.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Github className='h-4 w-4' />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button asChild className='gap-2'>
                      <a
                        href={project.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='h-4 w-4' />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  if (loading) {
    return (
      <section className='min-h-screen py-20 px-4 bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4' />
          <p className='text-muted-foreground'>Projekte werden geladen...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className='min-h-screen py-20 px-4 bg-background'>
        <div className='container mx-auto max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <h2 className='text-5xl font-bold mb-4 text-foreground'>
              Meine Projekte
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Klicken Sie auf ein Projekt, um mehr Details zu erfahren
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className='cursor-pointer'
                onClick={() => handleProjectClick(project)}
              >
                <Card className='h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 group'>
                  <div className='relative h-48 w-full overflow-hidden'>
                    <Image
                      src={`/${project.image}`}
                      alt={project.title}
                      fill
                      className='object-cover transition-transform duration-300 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    <div className='absolute top-4 right-4'>
                      <div
                        className={`h-3 w-3 rounded-full ${
                          project.status === 'active'
                            ? 'bg-green-500'
                            : project.status === 'completed'
                            ? 'bg-blue-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className='p-6'>
                    <h3 className='text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors'>
                      {project.title}
                    </h3>
                    <p className='text-muted-foreground mb-4 line-clamp-2'>
                      {project.content}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {project.techStack.slice(0, 3).map(tech => (
                        <Badge
                          key={tech}
                          className='bg-primary/10 text-foreground border-primary/20 text-xs'
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge className='bg-muted text-muted-foreground text-xs'>
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
