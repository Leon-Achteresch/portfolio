import { type FC } from "react";
import Projects from "@/components/projects/projects";
import AboutMe from "@/components/about-me/about-me";
import HeroSection from "@/components/hero-section/hero-section";
import Skills from "@/components/skills/skills";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ReactLenis } from "lenis/react";

const Home: FC = () => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,

      }}
    >
      <div className="smooth-scroll">
        <main className="min-h-screen text-gray-900">
          <ScrollProgress />
          <HeroSection />
          <Skills />
          <Projects />
          <AboutMe />
        </main>
      </div>
    </ReactLenis>
  );
};

export default Home;
