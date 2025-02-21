import { SKILL_BADGES } from "@/declarations/skill-batches";
import SkillBadge from "../skill-badge/skill-badge";
import HeroTitle from "../hero-title/hero-title";
import SparklesBackground from "../sparkles-background/sparkles-background";

export default async function HeroSection() {
  return (
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
  );
}
