'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GradientText } from './animated-text';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  badge,
  title,
  highlight,
  description,
  className,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        'mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
        >
          {badge}
        </motion.span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        {title}{' '}
        {highlight && <GradientText animate={false}>{highlight}</GradientText>}
      </h2>
      {description && (
        <p className={cn(
          'text-lg text-muted-foreground max-w-2xl',
          align === 'center' && 'mx-auto'
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
