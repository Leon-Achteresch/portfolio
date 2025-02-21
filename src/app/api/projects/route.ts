import { Project } from "@/app/projects/[id]/page";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ENHANCED_PROJECT_DATA: Project[] = [
  {
    id: 1,
    title: "MatchDarts",
    content:
      "Eine PWA Web App, die es ermöglicht, mit einem Roboter und gegen Freunde Darts zu spielen.",
    description:
      "MatchDarts revolutioniert das klassische Dartspiel durch die Integration von Robotertechnologie und sozialen Gaming-Elementen. Die Progressive Web App ermöglicht es Spielern, sowohl gegen einen präzisen Dart-Roboter als auch gegen Freunde anzutreten.",
    image: "MatchDarts.png",
    status: "active",
    startDate: "2023-09-15",
    teamSize: 3,
    duration: "6 months",
    techStack: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Socket.io",
      "Node.js",
      "PostgreSQL",
      "PWA",
    ],
    githubUrl: "https://github.com/example/matchdarts",
    liveUrl: "https://matchdarts.example.com",
    features: [
      "Echtzeit-Spielverfolgung",
      "Roboter-Integration",
      "Multiplayer-Modus",
      "Statistik-Dashboard",
      "PWA-Installation",
      "Offline-Unterstützung",
    ],
    codeSnippet: {
      code: `interface ProjectConfig {
  name: string;
  version: string;
  features: string[];
}

export class ProjectBuilder {
  private config: ProjectConfig;

  constructor(name: string) {
    this.config = {
      name,
      version: '1.0.0',
      features: []
    };
  }

  addFeature(feature: string) {
    this.config.features.push(feature);
    return this;
  }

  build(): ProjectConfig {
    return this.config;
  }
}

// Usage
const phoenix = new ProjectBuilder('Phoenix')
  .addFeature('Authentication')
  .addFeature('Real-time Updates')
  .addFeature('Analytics')
  .build();`,
      language: "typescript",
      title: "Project Configuration Builder",
    },
  },
  {
    id: 2,
    title: "MatchKamp",
    content:
      "Fußball-Fanatasy-Manager, bei dem man sein eigenes Bundelsiga-Team erstellen und auf Spiele tippen kann.",
    description:
      "MatchKamp ist eine umfassende Fantasy-Fußball-Plattform, die sich auf die Bundesliga spezialisiert. Benutzer können ihre Traumteams zusammenstellen, an Tippspielrunden teilnehmen und sich mit anderen Fußballfans messen.",
    image:
      "https://res.cloudinary.com/eldoraui/image/upload/v1734107781/Screenshot_2024-12-13_at_10.06.08_PM_molet1.png",
    status: "completed",
    startDate: "2023-11-01",
    teamSize: 4,
    duration: "4 months",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Prisma",
      "tRPC",
      "TailwindCSS",
      "NextAuth",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/example/matchkamp",
    liveUrl: "https://matchkamp.example.com",
    features: [
      "Team-Management",
      "Live-Scoring",
      "Tippspiel-System",
      "Echtzeit-Updates",
      "Spieler-Statistiken",
      "Liga-Übersicht",
    ],
  },
  {
    id: 3,
    title: "Portfolio",
    content:
      "Mein Portfolio, dass die meisten Projekte und meine Erfahrungen darstellt.",
    description:
      "Ein modernes, responsives Portfolio, das meine Projekte, Fähigkeiten und beruflichen Erfahrungen präsentiert. Die Seite wurde mit Fokus auf Performance, Zugänglichkeit und benutzerfreundliches Design entwickelt.",
    image: "https://i.ibb.co/DDRSsL5f/Portfolio.png",
    status: "completed",
    startDate: "2024-01-10",
    teamSize: 1,
    duration: "2 months",
    techStack: [
      "React",
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "MDX",
      "Vercel",
    ],
    githubUrl: "https://github.com/example/portfolio",
    liveUrl: "https://portfolio.example.com",
    features: [
      "Responsive Design",
      "Dark Mode",
      "Projekt-Showcase",
      "Blog-Integration",
      "Kontaktformular",
      "Animationen",
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    // Simuliere eine Delay von 500ms, um die Ladesituation realistisch darzustellen.
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        projects: ENHANCED_PROJECT_DATA,
        total: ENHANCED_PROJECT_DATA.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/projects failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    const project = ENHANCED_PROJECT_DATA.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("POST /api/projects failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch project details" },
      { status: 500 }
    );
  }
}
