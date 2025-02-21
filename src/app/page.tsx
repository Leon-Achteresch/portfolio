import { type FC } from "react";
import { Sparkles } from "@/components/sparks-section/sparks-section";
import { Projects } from "@/components/projects/projects";
import { Badge } from "@/components/ui/badge";
import { Tilt } from "@/components/ui/tilt";
import Image from "next/image";
import LogoImage from "@/assets/Images/logo.png";
import { AboutMe } from "@/components/about-me/about-me";

const SKILL_BADGES = [
  { label: "React", id: "react" },
  { label: "C#", id: "csharp" },
  { label: "JavaScript", id: "javascript" },
  { label: "TypeScript", id: "typescript" },
  { label: "CSS", id: "css" },
  { label: "Next.js", id: "nextjs" },
  { label: "Node.js", id: "nodejs" },
  { label: "MongoDB", id: "mongodb" },
  { label: "PostgreSQL", id: "postgresql" },
  { label: "MSSQL", id: "mssql" },
  { label: "OracleSQL", id: "oraclesql" },
  { label: "Git", id: "git" },
  { label: "Java", id: "java" },
] as const;

const SkillBadge: FC<{ label: string }> = ({ label }) => (
  <Badge
    className="inline-block border bg-primary-dark 
    p-1 px-3 text-sm border-[#163474]"
  >
    {label}
  </Badge>
);

const HeroTitle: FC = () => {
  return (
    <div className="relative flex flex-col items-center gap-6 mt-8">
      <div className="relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     h-72 w-72 rounded-full bg-gradient-to-tr from-pink-500/60 
                     via-purple-500/60 to-blue-500/60 blur-[32px]"
        />
        <div className="relative">
          <Tilt isRevese>
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-tr 
                       from-pink-500/80 via-purple-500/80 to-blue-500/80 
                       blur-md p-[2px]"
            />
            <div className="relative rounded-2xl bg-background/90 p-1">
              <Image
                src={LogoImage}
                alt="Leon Achteresch"
                width={250}
                height={250}
                className="rounded-2xl object-cover"
                priority
              />
            </div>
          </Tilt>
        </div>
      </div>

      <div className="text-center z-10">
        <h1 className="text-5xl font-bold tracking-tight mb-2">
          Leon Achteresch
        </h1>
        <p className="bg-gradient-to-b from-foreground to-[#7b9cda] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          Software Entwickler
        </p>
      </div>
    </div>
  );
};

const SparklesBackground: FC = () => (
  <div
    className="relative -mt-32 h-80 w-screen overflow-hidden 
    [mask-image:radial-gradient(50%_50%,white,transparent)]"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] opacity-40" />
    <div
      className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[10%] 
      border-t border-[#163474] dark:bg-[#08132b]"
    />
    <Sparkles
      density={800}
      speed={1.2}
      size={1.2}
      direction="top"
      opacitySpeed={2}
      color="#32A7FF"
      className="absolute inset-x-0 bottom-0 h-full w-full"
    />
  </div>
);

const Home: FC = () => {
  return (
    <main className="min-h-screen text-gray-900">
      <section
        className="flex h-screen flex-col items-center justify-center overflow-hidden 
        bg-background text-foreground"
      >
        <article className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="flex justify-center space-x-2">
            {SKILL_BADGES.map((skill) => (
              <SkillBadge key={skill.id} label={skill.label} />
            ))}
          </div>
          <HeroTitle />
        </article>
        <SparklesBackground />
      </section>
      <Projects />
      <AboutMe />
    </main>
  );
};

export default Home;
