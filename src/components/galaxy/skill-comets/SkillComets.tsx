'use client';

import { useMemo } from 'react';
import { skills } from '../constants';
import { SkillComet } from './SkillComet';
import { SkillOrbitRings } from './SkillOrbitRings';

interface SkillCometsProps {
  planetPosition: [number, number, number];
  planetSize: number;
}

export function SkillComets({ planetPosition, planetSize }: SkillCometsProps) {
  const orbitConfigs = useMemo(() => {
    return skills.map((skill, index) => {
      const layer = Math.floor(index / 5);
      const baseRadius = planetSize * 2 + layer * 3;

      return {
        skill,
        orbitRadius: baseRadius + Math.random() * 2,
        orbitSpeed: 0.15 + Math.random() * 0.1,
        orbitOffset: (index / skills.length) * Math.PI * 2,
        orbitTilt: (Math.random() - 0.5) * 0.8,
      };
    });
  }, [planetSize]);

  return (
    <group>
      {orbitConfigs.map(config => (
        <SkillComet
          key={config.skill.id}
          skill={config.skill}
          orbitRadius={config.orbitRadius}
          orbitSpeed={config.orbitSpeed}
          orbitOffset={config.orbitOffset}
          orbitTilt={config.orbitTilt}
          planetPosition={planetPosition}
        />
      ))}

      <SkillOrbitRings
        planetPosition={planetPosition}
        planetSize={planetSize}
      />
    </group>
  );
}
