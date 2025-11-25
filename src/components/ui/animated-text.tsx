'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      className={cn('inline-block', className)}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + delay * 10}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({ children, className, animate = true }: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent',
        animate && 'bg-[length:200%_auto] animate-shimmer',
        className
      )}
    >
      {children}
    </span>
  );
}

interface TypewriterProps {
  words: string[];
  className?: string;
}

export function Typewriter({ words, className }: TypewriterProps) {
  return (
    <motion.div className={cn('inline-flex items-center', className)}>
      <motion.span
        key={words[0]}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gradient"
      >
        {words[0]}
      </motion.span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="ml-1 inline-block h-[1em] w-[3px] bg-blue-500"
      />
    </motion.div>
  );
}
