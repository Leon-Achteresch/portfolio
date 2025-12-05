'use client';

import { Project } from '@/types/project';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { DataStream } from './DataStream';
import { ProjectHologram } from './ProjectHologram';

interface ProjectHologramsProps {
  planetPosition: [number, number, number];
  planetSize: number;
  onProjectSelect?: (project: Project) => void;
}

export function ProjectHolograms({
  planetPosition,
  planetSize,
  onProjectSelect,
}: ProjectHologramsProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    }
    fetchProjects();
  }, []);

  const displayedProjects = projects.slice(0, 6);
  const radius = planetSize * 3 + 6;

  return (
    <group>
      {displayedProjects.map((project, index) => (
        <ProjectHologram
          key={project.id}
          project={project}
          angle={(index / displayedProjects.length) * Math.PI * 2}
          radius={radius}
          planetPosition={planetPosition}
          index={index}
          onSelect={() => onProjectSelect?.(project)}
          totalProjects={displayedProjects.length}
        />
      ))}

      <DataStream planetPosition={planetPosition} planetSize={planetSize} />

      <mesh position={planetPosition} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.5, radius + 0.3, 128]} />
        <meshBasicMaterial
          color='#8b5cf6'
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={planetPosition} rotation={[Math.PI / 2.2, 0.15, 0]}>
        <ringGeometry args={[radius + 4, radius + 4.5, 128]} />
        <meshBasicMaterial
          color='#a855f7'
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
