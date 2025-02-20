import { type FC } from "react";
import { Sparkles } from "@/components/sparks-section/sparks-section";
import { Projects } from "@/components/projects/projects";
import { Badge } from "@/components/ui/badge";
import { Tilt } from "@/components/ui/tilt";

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

const HeroTitle: FC = () => (
  <h1
    className="bg-gradient-to-b from-foreground to-[#7b9cda] bg-clip-text 
    text-6xl font-semibold leading-snug tracking-tighter text-transparent"
  >
    Leon Achteresch
    <br />
    
    Software Entwickler
  </h1>
);

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
    </main>
  );
};

export default Home;
