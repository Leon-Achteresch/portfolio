'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Cloud, Code2, Database, Palette, Server, Wrench } from 'lucide-react';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: <Palette className='h-6 w-6' />,
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Framer Motion',
    ],
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: <Server className='h-6 w-6' />,
    skills: [
      'Node.js',
      'C#',
      'Java',
      'Python',
      'REST APIs',
      'GraphQL',
      'Express.js',
    ],
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 'database',
    title: 'Datenbanken',
    icon: <Database className='h-6 w-6' />,
    skills: [
      'PostgreSQL',
      'MongoDB',
      'MSSQL',
      'OracleSQL',
      'Supabase',
      'Prisma',
    ],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: <Cloud className='h-6 w-6' />,
    skills: [
      'Vercel',
      'AWS',
      'Docker',
      'CI/CD',
      'Git',
      'GitHub Actions',
      'Vercel',
    ],
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 'tools',
    title: 'Tools & Methoden',
    icon: <Wrench className='h-6 w-6' />,
    skills: ['Jira', 'Agile', 'Scrum', 'Git', 'VS Code', 'Postman', 'Figma'],
    color: 'from-yellow-500/20 to-amber-500/20',
  },
];

export default function Skills() {
  return (
    <section id='skills' className='min-h-screen py-20 px-4 bg-background'>
      <div className='container mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-5xl font-bold mb-4 text-foreground'>
            Meine Skills
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Ein umfassender Überblick über meine technischen Fähigkeiten und
            Expertise
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`p-6 h-full bg-gradient-to-br ${category.color} border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg`}
              >
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                    {category.icon}
                  </div>
                  <h3 className='text-2xl font-bold text-foreground'>
                    {category.title}
                  </h3>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {category.skills.map(skill => (
                    <Badge
                      key={skill}
                      className='bg-primary/10 text-foreground border-primary/20 hover:bg-primary/20 transition-colors'
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-16 text-center'
        >
          <Card className='p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/20'>
            <Code2 className='h-12 w-12 mx-auto mb-4 text-primary' />
            <h3 className='text-2xl font-bold mb-2 text-foreground'>
              Kontinuierliche Weiterbildung
            </h3>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Ich investiere kontinuierlich in meine Weiterbildung und halte
              mich über die neuesten Technologien und Best Practices auf dem
              Laufenden. Meine Leidenschaft für Code treibt mich an, immer
              besser zu werden.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
