import About from '@/components/about/about';
import Hero from '@/components/hero/hero';
import Projects from '@/components/projects/projects';
import Skills from '@/components/skills/skills';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { ReactLenis } from 'lenis/react';
import { type FC } from 'react';

const Home: FC = () => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
      }}
    >
      <div className='smooth-scroll'>
        <main className='min-h-screen'>
          <ScrollProgress />
          <Hero />
          <Skills />
          <Projects />
          <About />
        </main>
      </div>
    </ReactLenis>
  );
};

export default Home;
