'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-[100] p-3 rounded-xl bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group"
      aria-label="Theme wechseln"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground group-hover:text-blue-500" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground group-hover:text-blue-400 top-3 left-3" />
    </motion.button>
  );
}
