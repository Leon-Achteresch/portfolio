'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { GlowingCard } from '@/components/ui/glowing-card';
import { MagneticButton } from '@/components/ui/magnetic-button';
import Link from 'next/link';
import { Briefcase, GraduationCap, Mail, Download, Code, Users, BookOpen, Sparkles, type LucideIcon } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  current: boolean;
}

const timeline: TimelineItem[] = [
  {
    year: '2022',
    title: 'Ausbildung Fachinformatiker',
    subtitle: 'Anwendungsentwicklung',
    description: 'Fundierte Ausbildung in Softwareentwicklung mit Fokus auf moderne Webtechnologien und agile Methoden',
    icon: GraduationCap,
    current: false,
  },
  {
    year: '2025',
    title: 'Softwareentwickler',
    subtitle: 'Full-Stack Development',
    description: 'Entwicklung skalierbarer Webanwendungen mit React, Next.js und modernen Backend-Technologien',
    icon: Briefcase,
    current: true,
  },
];

interface Value {
  title: string;
  description: string;
  icon: LucideIcon;
}

const values: Value[] = [
  {
    title: 'Clean Code',
    description: 'Wartbarer, lesbarer Code ist die Grundlage jedes erfolgreichen Projekts',
    icon: Code,
  },
  {
    title: 'User Experience',
    description: 'Der Nutzer steht immer im Mittelpunkt meiner Entwicklungsarbeit',
    icon: Sparkles,
  },
  {
    title: 'Continuous Learning',
    description: 'Technologie entwickelt sich ständig weiter - ich auch',
    icon: BookOpen,
  },
  {
    title: 'Teamwork',
    description: 'Die besten Ergebnisse entstehen durch Zusammenarbeit',
    icon: Users,
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />

      <div className="relative container mx-auto max-w-5xl">
        <SectionHeader
          badge="Über mich"
          title="Mein"
          highlight="Werdegang"
          description="Von der Ausbildung zum professionellen Entwickler"
        />

        <div className="space-y-8">
          <GlowingCard>
            <h3 className="text-xl font-bold mb-6">Karriere</h3>
            <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-transparent" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className={`absolute left-0 p-2 rounded-lg ${item.current ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-muted-foreground'}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.year}
                      </span>
                      {item.current && (
                        <span className="flex items-center gap-1.5 text-xs text-green-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Aktuell
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-blue-400 mb-2">{item.subtitle}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlowingCard>

          <GlowingCard>
            <h3 className="text-xl font-bold mb-6">Meine Werte</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/20 transition-colors"
                >
                  <div className="p-2 h-fit rounded-lg bg-blue-500/10">
                    <value.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlowingCard>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlowingCard className="text-center py-10">
              <h3 className="text-2xl font-bold mb-3">
                Bereit für <span className="text-gradient">neue Herausforderungen</span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Ich suche nach spannenden Projekten und Möglichkeiten, meine Fähigkeiten einzubringen.
                Lassen Sie uns gemeinsam innovative Lösungen entwickeln.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton as="a" href="mailto:leon.achteresch@gmail.com">
                  <Mail className="w-4 h-4" />
                  Kontakt aufnehmen
                </MagneticButton>
                <Link
                  href="/CV.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Lebenslauf ansehen
                </Link>
              </div>
            </GlowingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
