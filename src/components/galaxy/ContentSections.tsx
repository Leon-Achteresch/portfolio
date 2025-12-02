'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Download, Github, Linkedin, Mail, ExternalLink, Code, Users, BookOpen, Sparkles, Briefcase, GraduationCap } from 'lucide-react';
import LogoImage from '@/assets/Images/logo.jpg';
import { useEffect, useState, type ReactNode } from 'react';
import { Project } from '@/types/project';

interface SectionWrapperProps {
  children: ReactNode;
  index: number;
}

function SectionWrapper({ children, index }: SectionWrapperProps) {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative"
      style={{ zIndex: 10 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto px-6 py-20"
      >
        {children}
      </motion.div>
    </section>
  );
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/Leon-Achteresch', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/leon-achteresch-b2a7472aa/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:leon.achteresch@gmail.com', label: 'E-Mail' },
];

function HeroSection() {
  return (
    <SectionWrapper index={0}>
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl blur-2xl opacity-50 animate-pulse" />
          <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400">
            <div className="rounded-[20px] overflow-hidden bg-[#030712] p-1">
              <Image
                src={LogoImage}
                alt="Leon Achteresch"
                width={280}
                height={280}
                className="rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-blue-400">Bereit für neue Abenteuer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            Hallo, ich bin{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Leon Achteresch
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 mb-2"
          >
            Full-Stack Software Entwickler
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-white/50 max-w-xl mb-8"
          >
            Ich entwickle moderne, skalierbare Webanwendungen mit Fokus auf
            Benutzerfreundlichkeit und Performance. Spezialisiert auf React,
            Next.js und TypeScript.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              Reise starten
              <ArrowDown className="w-4 h-4" />
            </motion.button>

            <motion.a
              href="/CV.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              Lebenslauf
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-4 justify-center lg:justify-start"
          >
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group backdrop-blur-sm"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-white/60 group-hover:text-blue-400 transition-colors" />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
      >
        {[
          { value: '3+', label: 'Jahre Erfahrung' },
          { value: '10+', label: 'Projekte' },
          { value: '5+', label: 'Technologien' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-white/50">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: ['Node.js', 'C#', 'Python', 'Delphi', 'Java'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'database',
    title: 'Datenbanken',
    skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'MSSQL', 'Prisma'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    skills: ['Git', 'Docker', 'Coolify', 'CI/CD', 'Kubernetes'],
    color: 'from-orange-500 to-red-500',
  },
];

function SkillsSection() {
  return (
    <SectionWrapper index={1}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-mono mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meine{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Technologien
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Ein umfassender Überblick über meine technischen Fähigkeiten
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
            >
              <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/20 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    }
    fetchProjects();
  }, []);

  return (
    <SectionWrapper index={2}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-mono mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meine{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projekte
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Eine Auswahl meiner besten Arbeiten und Projekte
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`/${project.image}`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm mb-4 line-clamp-2">
                  {project.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

const values = [
  { title: 'Clean Code', description: 'Wartbarer, lesbarer Code', icon: Code },
  { title: 'User Experience', description: 'Der Nutzer im Mittelpunkt', icon: Sparkles },
  { title: 'Continuous Learning', description: 'Stetige Weiterentwicklung', icon: BookOpen },
  { title: 'Teamwork', description: 'Zusammenarbeit für beste Ergebnisse', icon: Users },
];

const timeline = [
  {
    year: '2022',
    title: 'Ausbildung Fachinformatiker',
    subtitle: 'Anwendungsentwicklung',
    icon: GraduationCap,
    current: false,
  },
  {
    year: '2025',
    title: 'Softwareentwickler',
    subtitle: 'Full-Stack Development',
    icon: Briefcase,
    current: true,
  },
];

function AboutSection() {
  return (
    <SectionWrapper index={3}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-mono mb-4">
            Über mich
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mein{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Werdegang
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <h3 className="text-xl font-bold mb-6 text-amber-400">Karriere</h3>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className={`p-2 rounded-lg ${item.current ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-white/50'}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {item.year}
                    </span>
                    {item.current && (
                      <span className="flex items-center gap-1.5 text-xs text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Aktuell
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-amber-400/70">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-amber-500/20 transition-colors"
            >
              <div className="p-2 h-fit rounded-lg bg-amber-500/10">
                <value.icon className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{value.title}</h4>
                <p className="text-sm text-white/50">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center p-8 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold mb-3">
            Bereit für{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              neue Herausforderungen
            </span>
          </h3>
          <p className="text-white/50 mb-6 max-w-xl mx-auto">
            Lassen Sie uns gemeinsam innovative Lösungen entwickeln.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="mailto:leon.achteresch@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg shadow-amber-500/25 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Kontakt aufnehmen
            </motion.a>
            <Link
              href="/CV.pdf"
              target="_blank"
              className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Lebenslauf
            </Link>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export function ContentSections() {
  return (
    <div className="relative z-10">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
    </div>
  );
}
