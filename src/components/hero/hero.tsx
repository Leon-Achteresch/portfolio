'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { MagneticButton, OutlineButton } from '@/components/ui/magnetic-button';
import LogoImage from '@/assets/Images/logo.jpg';
import { useRef } from 'react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Leon-Achteresch', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/leon-achteresch-b2a7472aa/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:leon.achteresch@gmail.com', label: 'E-Mail' },
];

const stats = [
  { value: '3+', label: 'Jahre Erfahrung' },
  { value: '10+', label: 'Projekte' },
  { value: '5+', label: 'Technologien' },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-6 py-20"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl blur-2xl opacity-50 animate-pulse-glow" />
            <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400">
              <div className="rounded-[20px] overflow-hidden bg-background p-1">
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-blue-400">Verfügbar für neue Projekte</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              Hallo, ich bin{' '}
              <span className="text-gradient">Leon Achteresch</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-2"
            >
              Full-Stack Software Entwickler
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-muted-foreground/80 max-w-xl mb-8"
            >
              Ich entwickle moderne, skalierbare Webanwendungen mit Fokus auf
              Benutzerfreundlichkeit und Performance. Spezialisiert auf React,
              Next.js und TypeScript.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <MagneticButton onClick={scrollToSkills}>
                Meine Skills entdecken
                <ArrowDown className="w-4 h-4" />
              </MagneticButton>

              <OutlineButton as="a" href="/CV.pdf" target="_blank">
                <Download className="w-4 h-4" />
                Lebenslauf
              </OutlineButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-blue-400 transition-colors" />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer p-2"
          onClick={scrollToSkills}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
