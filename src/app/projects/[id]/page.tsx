import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Github } from "lucide-react";
import CodeBlock from "@/components/ui/code-block";

export interface Project {
  id: number;
  title: string;
  content: string;
  description: string;
  image: string;
  status: "active" | "completed" | "on-hold";
  startDate: string;
  teamSize: number;
  duration: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  codeSnippet?: {
    code: string;
    language: string;
    title: string;
  };
}


async function fetchProject(id: number): Promise<Project | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),

  });

  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.project;
}

const statusColors = {
  active: "bg-green-500",
  completed: "bg-blue-500",
  "on-hold": "bg-yellow-500",
};

export default async function ProjectPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const project = await fetchProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-8 space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:justify-between">
          <div className="w-full sm:w-auto">
            <h1
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r 
              from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
            >
              {project.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              {project.description}
            </p>
          </div>
          <div className="flex flex-col xs:flex-row w-full sm:w-auto items-start xs:items-center gap-3 sm:gap-4">
            <Badge
              className={`${
                statusColors[project.status]
              } text-white capitalize px-4 py-1 w-full xs:w-auto text-center`}
            >
              {project.status}
            </Badge>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
                bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-blue-500/80 text-white 
                hover:opacity-90 transition-opacity w-full xs:w-auto text-sm"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10">
            <CardContent className="flex items-center gap-2 p-4 sm:pt-6">
              <Calendar className="h-4 w-4 text-pink-500 shrink-0" />
              <span className="text-sm">
                Started:{" "}
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10">
            <CardContent className="flex items-center gap-2 p-4 sm:pt-6">
              <Clock className="h-4 w-4 text-purple-500 shrink-0" />
              <span className="text-sm">
                Duration: {project.duration}
              </span>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 xs:col-span-2 md:col-span-1">
            <CardContent className="flex items-center gap-2 p-4 sm:pt-6">
              <Users className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="text-sm">
                Team Size: {project.teamSize}
              </span>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                className="px-2 sm:px-3 py-1 text-sm bg-gradient-to-r 
                  from-pink-500/80 via-purple-500/80 to-blue-500/80 text-white 
                  hover:opacity-90 transition-opacity"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {project.codeSnippet && (
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold">
              Code Example
            </h2>
            <div className="overflow-hidden">
              <CodeBlock
                code={project.codeSnippet.code}
                language={project.codeSnippet.language}
                title={project.codeSnippet.title}
                className="rounded-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
