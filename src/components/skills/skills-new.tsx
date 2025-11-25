'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { GlowingCard } from '@/components/ui/glowing-card';
import { cn } from '@/lib/utils';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'C#', level: 80 },
      { name: 'Java', level: 75 },
      { name: 'Python', level: 70 },
      { name: 'REST APIs', level: 90 },
    ],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'database',
    title: 'Datenbanken',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'Supabase', level: 90 },
      { name: 'MSSQL', level: 80 },
      { name: 'Prisma', level: 85 },
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    icon: '🚀',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 75 },
      { name: 'Vercel', level: 90 },
      { name: 'CI/CD', level: 80 },
      { name: 'AWS', level: 65 },
    ],
    gradient: 'from-orange-500 to-red-500',
  },
];

const highlights = [
  { label: 'Hauptsprache', value: 'TypeScript' },
  { label: 'Framework', value: 'Next.js' },
  { label: 'Datenbank', value: 'PostgreSQL' },
  { label: 'Deployment', value: 'Vercel' },
];

function SkillBar({ name, level, gradient }: { name: string; level: number; gradient: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground/90">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn('h-full rounded-full bg-gradient-to-r', gradient)}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />

      <div className="relative container mx-auto max-w-7xl">
        <SectionHeader
          badge="Skills & Expertise"
          title="Meine"
          highlight="Technologien"
          description="Ein umfassender Überblick über meine technischen Fähigkeiten und die Tools, mit denen ich arbeite"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <GlowingCard className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      gradient={category.gradient}
                    />
                  ))}
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlowingCard className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  Tech Stack <span className="text-gradient">Highlights</span>
                </h3>
                <p className="text-muted-foreground">
                  Die Technologien, mit denen ich am liebsten arbeite
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20"
                  >
                    <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                    <div className="text-lg font-semibold text-blue-400">{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlowingCard>
        </motion.div>
      </div>
    </section>
  );
}
