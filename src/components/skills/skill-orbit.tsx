'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillOrbitProps {
  skills: string[];
  radius: number;
  duration: number;
  reverse?: boolean;
  className?: string;
}

export function SkillOrbit({ skills, radius, duration, reverse = false, className }: SkillOrbitProps) {
  return (
    <div className={cn('absolute inset-0 flex items-center justify-center', className)}>
      {skills.map((skill, index) => {
        const angle = (360 / skills.length) * index;
        return (
          <motion.div
            key={skill}
            className="absolute"
            style={{
              ['--orbit-radius' as string]: `${radius}px`,
              ['--orbit-duration' as string]: `${duration}s`,
            }}
            animate={{
              rotate: reverse ? [-angle, -angle - 360] : [angle, angle + 360],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div
              className="absolute"
              style={{
                transform: `translateX(${radius}px)`,
              }}
            >
              <motion.div
                animate={{
                  rotate: reverse ? [0, 360] : [0, -360],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm font-medium text-blue-300 whitespace-nowrap backdrop-blur-sm"
              >
                {skill}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
