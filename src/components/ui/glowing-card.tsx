'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MouseEvent } from 'react';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function GlowingCard({ children, className, containerClassName }: GlowingCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn('group relative', containerClassName)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div
        className={cn(
          'relative rounded-2xl border border-white/[0.08] bg-card p-6',
          'transition-all duration-300',
          'hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export function BentoCard({ children, className, colSpan = 1, rowSpan = 1 }: BentoCardProps) {
  const colSpanClass = colSpan === 2 ? 'md:col-span-2' : 'col-span-1';
  const rowSpanClass = rowSpan === 2 ? 'md:row-span-2' : 'row-span-1';

  return (
    <GlowingCard
      containerClassName={cn(colSpanClass, rowSpanClass)}
      className={cn('h-full', className)}
    >
      {children}
    </GlowingCard>
  );
}
