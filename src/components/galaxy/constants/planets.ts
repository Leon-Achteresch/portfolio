import { Planet } from '@/types/galaxy';

export const planets: Planet[] = [
  {
    id: 'hero',
    position: [0, 0, 0],
    planetColor: '#3b82f6',
    planetEmissive: '#1d4ed8',
    size: 3,
    hasRing: true,
  },
  {
    id: 'skills',
    position: [-25, 5, -40],
    planetColor: '#10b981',
    planetEmissive: '#059669',
    size: 4,
    hasRing: false,
  },
  {
    id: 'projects',
    position: [30, -8, -80],
    planetColor: '#8b5cf6',
    planetEmissive: '#7c3aed',
    size: 5,
    hasRing: true,
  },
  {
    id: 'about',
    position: [-15, 10, -130],
    planetColor: '#f59e0b',
    planetEmissive: '#d97706',
    size: 3.5,
    hasRing: false,
  },
];
