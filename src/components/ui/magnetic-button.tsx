'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, MouseEvent, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
}

export function MagneticButton({
  children,
  className,
  onClick,
  as = 'button',
  href,
  target,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Component
        href={as === 'a' ? href : undefined}
        target={as === 'a' ? target : undefined}
        onClick={onClick}
        style={{ x: xSpring, y: ySpring }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'px-6 py-3 rounded-xl font-medium',
          'bg-gradient-to-r from-blue-600 to-blue-500',
          'text-white shadow-lg shadow-blue-500/25',
          'transition-shadow duration-300',
          'hover:shadow-xl hover:shadow-blue-500/30',
          className
        )}
      >
        {children}
      </Component>
    </motion.div>
  );
}

interface OutlineButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
}

export function OutlineButton({
  children,
  className,
  onClick,
  as = 'button',
  href,
  target,
}: OutlineButtonProps) {
  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      href={as === 'a' ? href : undefined}
      target={as === 'a' ? target : undefined}
      onClick={onClick}
      whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2',
        'px-6 py-3 rounded-xl font-medium',
        'border border-white/10 bg-white/5',
        'text-foreground backdrop-blur-sm',
        'transition-all duration-300',
        'hover:bg-white/10',
        className
      )}
    >
      {children}
    </Component>
  );
}
