'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import MailImage from '@/assets/Images/mail.webp';
import PhoneImage from '@/assets/Images/phone.webp';
import GithubImage from '@/assets/Images/github.png';
import LogoImage from '@/assets/Images/logo.jpg';
import CVImage from '@/assets/Images/CV.jpg';

interface DockIconData {
  id: string;
  imgSrc: string | StaticImageData;
  label: string;
  href?: string;
  withoutBackground?: boolean;
}

const icons: DockIconData[] = [
  { id: 'phone', imgSrc: PhoneImage, label: 'Kontakt aufnehmen' },
  { id: 'mail', imgSrc: MailImage, href: 'mailto:leon.achteresch@gmail.com', label: 'E-Mail senden' },
  { id: 'github', imgSrc: GithubImage, href: 'https://github.com/Leon-Achteresch', label: 'GitHub-Profil', withoutBackground: true },
  { id: 'cv', imgSrc: CVImage, label: 'Lebenslauf anzeigen', href: '/CV.pdf' },
  { id: 'logo', imgSrc: LogoImage, label: 'Startseite', href: '#' },
];

function DockIcon({ icon, mouseX }: { icon: DockIconData; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [56, 72, 56]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={cn(
        'relative rounded-2xl overflow-hidden cursor-pointer',
        'bg-white/10 dark:bg-white/5 backdrop-blur-sm',
        'border border-white/20 dark:border-white/10',
        'shadow-lg shadow-black/10',
        'transition-shadow duration-300',
        'hover:shadow-xl hover:shadow-blue-500/10',
        'hover:border-blue-500/30'
      )}
    >
      <Image
        src={icon.imgSrc}
        alt={icon.label}
        fill
        className={cn(
          icon.withoutBackground ? 'object-contain p-3' : 'object-cover'
        )}
      />
    </motion.div>
  );

  if (icon.href) {
    return (
      <Link
        href={icon.href}
        target={icon.href.startsWith('http') || icon.href.startsWith('mailto') ? '_blank' : undefined}
        className="group relative"
        title={icon.label}
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-white/10 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          {icon.label}
        </div>
        {content}
      </Link>
    );
  }

  return (
    <div className="group relative" title={icon.label}>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-white/10 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        {icon.label}
      </div>
      {content}
    </div>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.pageX);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-end gap-3 px-4 py-3 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl"
      >
        {icons.map((icon) => (
          <DockIcon key={icon.id} icon={icon} mouseX={mouseX} />
        ))}
      </motion.div>
    </motion.div>
  );
}
