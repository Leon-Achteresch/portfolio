import { type FC } from "react";
import { Projects } from "@/components/projects/projects";
import AboutMe from "@/components/about-me/about-me";
import HeroSection from "@/components/hero-section/hero-section";

const Home: FC = () => {
  return (
    <main className="min-h-screen text-gray-900">
      <HeroSection />
      <Projects />
      <AboutMe />
    </main>
  );
};

export default Home;
